"use client";

import { useState,useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Food = {
    id: number;
    name: string;
    expiry: string;
};

export function useExpiryFoods() {
    const [foods,setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState(true);
    
    const formatExpiryNotice = (expiry: string): { text: string; colorClass: string } => {
        const today = new Date();
        const expiryDate = new Date(expiry);

        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let text = "";
        let colorClass = "text-black";

        if (diffDays < 0) {
            text = "期限切れ";
            colorClass = "text-red-600";
        } else if (diffDays === 0) {
            text = "今日まで";
            colorClass = "text-red-500";
        } else if (diffDays <= 3) {
            text = `あと${diffDays}日で期限切れ`;
            colorClass = "text-orange-500";
        } else {
            text = `あと${diffDays}日で期限切れ`;
        }

        return { text, colorClass };
    };
    
    
    
    useEffect(() => {
        async function fetchFoods() {
            const {data: { user }} = await supabase.auth.getUser();

            if (!user) return;

            const threeDaysLater = new Date(Date.now() + 3 * 86400000);

            const { data, error } = await supabase
            .from("Foods") 
            .select("*")
            .eq("user_id", user.id)
            .lte("expiry", threeDaysLater.toISOString())
            .order("expiry", { ascending: true });

            if (error) {
                console.error(error);
            } else if (data) {
                setFoods(data as Food[]);
            }
            setLoading(false);
            }
            fetchFoods();
    }, []);
    
    return {
        foods,
        loading,
        formatExpiryNotice,
    };
};
