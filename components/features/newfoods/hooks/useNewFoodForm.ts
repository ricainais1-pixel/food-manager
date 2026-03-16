"use client";

import useFoodState from "./useNewFoodState";
import { deleteFoodFromDB,updateFoodInDB,insertFoodsToDB } from "./useNewFoodAPI";
import { NewFood } from "./types/newfood";
import { createClient } from "@/lib/supabase/client";


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
        const supabase = createClient();

        const {data: { user }} = await supabase.auth.getUser();
        if (!user) {
            alert("ログインしてください");
            return;
        }

        const allFoods = [...foods];

        // 固定行が入力されていれば追加
        if (fixedRow.name.trim()) {
            allFoods.push({
                id: -Date.now(),
                name: fixedRow.name,
                count: fixedRow.count,
                expiry: fixedRow.expiry,
                category: fixedRow.category,
            });
        }

        // 有効な行のみフィルタ（name, expiry, categoryが入力されているもの）
        const unsavedFoods = allFoods.filter((f: NewFood) => f.id < 0 && f.name.trim() && f.expiry && f.category);

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
                category: food.category,
                user_id: user?.id
            }));
            const  error  = await insertFoodsToDB(foodsToInsert);
            if (error) {
                alert("登録に失敗しました: " + error.message);
                return;
            }

            // 登録後は画面表示用の foods をリセットして固定行もリセット
            setFoods([]);  
            setFixedRow({        
                id: -1,
                name: "",
                count: 1,
                expiry: new Date().toISOString().split("T")[0],
                category: "冷蔵庫",
                isVisible: true
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

