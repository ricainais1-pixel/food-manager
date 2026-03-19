"use client";

import { useState,useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Food = {
    id: number;
    name: string;
    expiry: string;
};

export type ExpiryNotice = {
    food: Food;
    text: string;
    colorClass: string;
};

export function useExpiryFoods() {
    const [expiredFoods, setExpiredFoods] = useState<ExpiryNotice[]>([]);
    const [foods,setFoods] = useState<Food[]>([]);
    const [soonFoods, setSoonFoods] = useState<ExpiryNotice[]>([]);
    const [loading, setLoading] = useState(true);
    
    // 期限判定と色付け
    const formatExpiryNotice = (expiry: string): { text: string; colorClass: string } => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

        const expiryDate = new Date(expiry);
        const expiryUTC = Date.UTC(expiryDate.getFullYear(), expiryDate.getMonth(), expiryDate.getDate());

        const diffDays = Math.floor((expiryUTC - todayUTC) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { text: "期限切れ", colorClass: "text-red-600" };
        if (diffDays === 0) return { text: "今日まで", colorClass: "text-orange-500" };
        if (diffDays <= 3) return { text: `あと${diffDays}日で期限切れ`, colorClass: "text-orange-500" };
        return { text: `あと${diffDays}日で期限切れ`, colorClass: "text-black" };
    };
    
    // 期限切れ食品を削除する関数
    const removeExpiredFood = (id: number) => {
        setExpiredFoods(prev => prev.filter(item => item.food.id !== id));
    };
    
    useEffect(() => {
    async function fetchFoods() {
        const { data: { user } } = await supabase.auth.getUser();  //ユーザーを取得
        if (!user) return;

        // 食材データの取得
        const { data, error } = await supabase
            .from("Foods")
            .select("*")
            .eq("user_id", user.id)
            .order("expiry", { ascending: true });

        if (error) {
            console.error(error);
            return;
        }

        if (data) {
            const expired: ExpiryNotice[] = [];
            const soon: ExpiryNotice[] = [];

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const threeDaysAgo = new Date(today.getTime() - 3 * 86400000); // 今日から3日前
            const threeDaysLater = new Date(today.getTime() + 3 * 86400000); // 今日から3日後

            (data as Food[]).forEach(food => {
                const expiryDate = new Date(food.expiry);
                const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
                const expiryUTC = Date.UTC(expiryDate.getFullYear(), expiryDate.getMonth(), expiryDate.getDate());
                const diffDays = Math.floor((expiryUTC - todayUTC) / (1000 * 60 * 60 * 24));
                const item: ExpiryNotice = { food, ...formatExpiryNotice(food.expiry) };

                // 今日を含めて判定
                if (diffDays < 0 && diffDays >= -3) {
                    expired.push(item); // 期限切れ3日以内
                } else if (diffDays >= 0 && diffDays <= 3) {
                    soon.push(item); // 今日～3日以内
                }
            });

            setExpiredFoods(expired);
            setSoonFoods(soon);
        }

        setLoading(false);
    }

    fetchFoods();
}, []);
    
    return {
        expiredFoods,
        soonFoods,
        loading,
        removeExpiredFood,
        formatExpiryNotice,
    };
};
