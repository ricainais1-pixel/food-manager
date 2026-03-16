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
        const expiryDate = new Date(expiry);

        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { text: "期限切れ", colorClass: "text-red-600" };
        if (diffDays === 0) return { text: "今日まで", colorClass: "text-red-500" };
        if (diffDays <= 3) return { text: `あと${diffDays}日で期限切れ`, colorClass: "text-orange-500" };
        return { text: `あと${diffDays}日で期限切れ`, colorClass: "text-black" };
    };
    
    // 期限切れ食品を削除する関数
    const removeExpiredFood = (id: number) => {
        setExpiredFoods(prev => prev.filter(item => item.food.id !== id));
    };
    
    useEffect(() => {
    async function fetchFoods() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

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
                const notice = formatExpiryNotice(food.expiry);
                const item: ExpiryNotice = { food, ...notice };

                const expiryDate = new Date(food.expiry);
                expiryDate.setHours(0, 0, 0, 0);

                // 期限切れだけど3日以内なら expiredFoods に表示
                if (expiryDate < today && expiryDate >= threeDaysAgo) {
                    expired.push(item);
                } 
                // 期限切れ前で3日以内なら soonFoods に表示
                else if (expiryDate >= today && expiryDate <= threeDaysLater) {
                    soon.push(item);
                }
                // それ以外は何もしない（expired3日以上は自動的に除外）
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
