"use client";

import useFoodState from "./useNewFoodState";
import { deleteFoodFromDB,updateFoodInDB,insertFoodsToDB } from "./useNewFoodAPI";
import { NewFood } from "./types/newfood";




export default function useFoodForm() {
    const { foods, fixedRow, setFixedRow, deleteFixedRow, handleAddFood, removeFoodLocally, setFoods } = useFoodState();

    // 削除ボタン
    const deleteFood = async (id: number) => {
        if (id < 0) {
        removeFoodLocally(id);
        return;
        }
        const error = await deleteFoodFromDB(id);
        if (error) console.log(error);
        else removeFoodLocally(id);
    };

    // selectを更新するとき
    const updateFood = async (id: number, field: string, value: string | number) => {
        const fieldMap: { [key: string]: string } = {
            name: 'name',
            count: 'count',
            expiry: 'expiry',
            category: 'category'
        };
        const dbField = fieldMap[field] || field;
        const dbValue = field === 'count'
            ? (typeof value === 'string' ? parseInt(value) || 1 : value)
            : value;

        if (id > 0) {
            const  error  = await updateFoodInDB(id, dbField, dbValue);
            if (error) {
                console.log(error);
                return;
            }
        }

        setFoods(
            foods.map((food) => (food.id === id ? { ...food, [field]: dbValue } : food))
        );
    };

    // 登録ボタンでまとめて保存
    const handleRegisterAll = async () => {
        const allFoods = [...foods];

        // 固定行が入力されていれば追加
        if (!fixedRow.name.trim() || !fixedRow.count || !fixedRow.expiry || !fixedRow.category) {
            alert("固定行の食材情報はすべて入力してください");
            return;
        }

        allFoods.push({
            id: -Date.now(),
            name: fixedRow.name,
            count: parseInt(fixedRow.count) || 1,
            expiry: fixedRow.expiry,
            category: fixedRow.category,
        });

        // 追加行のバリデーション
        const unsavedFoods = allFoods.filter((f: NewFood) => f.id < 0);
        for (const f of unsavedFoods) {
            if (!f.name.trim() || f.count === null || !f.expiry || !f.category) {
                alert("追加行の食材情報はすべて入力してください");
                return;
            }
        }

        if (unsavedFoods.length === 0) {
            alert("登録する行がありません");
            return;
        }

        try {
            // id は送らずに Supabase に挿入
            const foodsToInsert = unsavedFoods.map((food) => ({
                name: food.name,
                count: food.count,
                expiry: food.expiry,
                category: food.category
            }));
            const  error  = await insertFoodsToDB(foodsToInsert);
            if (error) {
                alert("登録に失敗しました: " + error.message);
                return;
            }

            // 登録後は画面表示用の foods をリセットして固定行もクリア
            setFoods([]);        // 追加行リセット
            setFixedRow({        // 固定行を非表示にする
                name: "",
                count: "1",
                expiry: new Date().toISOString().split("T")[0],
                category: "冷蔵庫",
                isVisible: false
            });
            alert("登録完了しました！");
        } catch (e) {
            console.error(e);
            alert("予期せぬエラーが発生しました");
        }
    };



    return{
        foods,
        fixedRow,
        setFixedRow,
        deleteFixedRow,
        handleAddFood,
        deleteFood,
        updateFood,
        handleRegisterAll}
};

