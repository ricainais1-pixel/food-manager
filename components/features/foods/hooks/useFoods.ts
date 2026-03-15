"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Food } from "./types/food";

const supabase = createClient();


export default function useFoods() {
    const [editingFood, setEditingFood] = useState<Food | null>(null);
    const [foods, setFoods] = useState<Food[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("すべて");


    //編集ボタン
    const handleEdit = (food: Food ) => {
        setEditingFood({ ...food });
        console.log("編集開始");
    };

    //戻るボタン
    const handleBack = () => {
        setEditingFood(null);
    }

    // 削除ボタン
    const handleDelete = async (food: Food ) => {
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;

        if (!userId) {
            alert("ユーザーが取得できません");
            return;
        }

        const { error: insertError } = await supabase
            .from("shopping_list")
            .insert([{
                name: food.name,
                count: food.count, 
                category: food.category,
                user_id: userId,
            }]);

        if (insertError) {
            alert("購入リスト追加失敗");
            return;
        } 

        const { error: deleteError } = await supabase
            .from("Foods")
            .update({ status: "expired" })
            .eq("id", food.id);

        if (deleteError) {
            alert("在庫削除エラー");
            return;
        }
        else {
            setFoods(prev => prev.filter(f => f.id !== food.id));
        }
    };

    // 編集保存ボタン
    const handleSave = async () => {
        if (!editingFood) return;
        
        const { error } = await supabase
            .from("Foods")
            .update({
            name: editingFood?.name,
            count: editingFood?.count,
            expiry: editingFood?.expiry,
            category: editingFood?.category,
            })
            .eq("id", editingFood?.id);

        if (error) {
            console.log(error);
        } else {
            setEditingFood(null);

        const { data } = await supabase
            .from("Foods")
            .select("*")
            .eq("status", "active")
            .order("expiry", { ascending: true });

            setFoods(data ? data as Food[] : []);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingFood({
            ...editingFood!,
            name: e.target.value,
        });
    };

    
    // 残日数計算
    const getRemainingDays = (expiry日: string): string => {
        const today = new Date();
        const expiryDate = new Date(expiry日);
        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) return `あと${diffDays}日`;
        if (diffDays === 0) return "今日まで";
        return `期限切れ`;
    };

    // 在庫の個数変更 or 期限切れ処理
    const updateFoodCount = async (food: Food, newCount: number) => {
        const isExpired = new Date(food.expiry) < new Date();
        // 期限切れの時
        if (isExpired) {
            const { error } = await supabase
                .from("Foods")
                .update({ status: "expired" })
                .eq("id", food.id);

                if (error) {
                    alert("期限切れ更新エラー");
                    return;
                }

            setFoods(prev => prev.filter(f => f.id !== food.id));
            return;
        }
            
        // 個数が0になった時、購入リストへ
        if (newCount <= 0) {
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;

        if (!userId) {
            alert("ユーザーの取得できません");
            return;
        }
            const { error: insertError } = await supabase
                .from("shopping_list")
                .insert([{
                    name: food.name,
                    count: food.count,          
                    category: food.category,
                    user_id: userId,
                }]);

            if (insertError) {
                alert(`購入リスト追加失敗`);
                return;
            }

            const { error: deleteError } = await supabase
                .from("Foods")
                .update({ status: "expired" })
                .eq("id", food.id);

            if (deleteError) {
                alert(`在庫削除エラー`);
                return;
            }

            setFoods(prev => prev.filter(f => f.id !== food.id));
            return;
        } 
            // 通常の在庫更新
            const { error } = await supabase
                .from("Foods")
                .update({ count: newCount })
                .eq("id", food.id);

            if (error) {
                alert(`在庫更新エラー`);
            } else {
                setFoods(prev =>
                    prev.map(f => (f.id === food.id ? { ...f, count: newCount } : f))
                );
            }
    };

    useEffect(() => {
        const getFoods = async () => {
            const { data, error } = await supabase
            .from("Foods")
            .select("*")
            .eq("status", "active")
            .order("expiry", { ascending: true });

            if (error) {
            console.log(error);
            } else {
            setFoods(data ? data as Food[] : []);
            }
        };

        getFoods();
    }, []);

    const handleFieldChange = (field: keyof Food, value: string | number) => {
        if (!editingFood) return;
    setEditingFood({ ...editingFood, [field]: value });
    };

    return {
        foods,
        editingFood,
        handleEdit,
        handleBack,
        handleDelete,
        handleSave,
        handleNameChange,
        getRemainingDays,
        updateFoodCount,
        selectedCategory,
        setSelectedCategory,
        handleFieldChange
    }

};