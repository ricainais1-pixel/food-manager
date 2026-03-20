"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Item,FoodInsert } from "../types/types";
import { useRouter } from "next/navigation";



const supabase = createClient();

export default function useStockFromShopping() {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [items, setItems] = useState<Item[]>([]);

    const handleSelectChange = (id: number, checked: boolean) => {
        setSelectedItems(prev =>
            checked ? [...prev, id] : prev.filter(i => i !== id)
        );
    };

    const handleExpiryChange = (id: number, value: string) => {
        setItems(prevItems =>
        prevItems.map(item =>
            item.id === id ? { ...item, expiry: value } : item
        )
        );
    };

    const handleCategoryChange = (id: number, value: string) => {
        setItems(prevItems =>
        prevItems.map(item =>
            item.id === id ? { ...item, category: value } : item
        )
        );
    };

    const addSelectedToStock = async () => {
        const selectedItemsData = items.filter(item => selectedItems.includes(item.id));
        if (selectedItemsData.length === 0) {
            alert("追加するアイテムを選んでください");
            return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user.id;
        if (!userId) {
            alert("ユーザー情報が取得できません");
            return;
        }

        const noExpiryItem = selectedItemsData.find(item => !item.expiry);
        if (noExpiryItem) {
            alert(`${noExpiryItem.name} の期限を入力してください`);
            return;
        }

        const itemsToInsert: FoodInsert[] = selectedItemsData.map(item => ({
            name: item.name,
            count: item.count,
            expiry: item.expiry,
            category: item.category ?? "冷蔵庫",
            user_id: userId,
        }));

        const { error } = await supabase
            .from("Foods")
            .insert(itemsToInsert);

        if (error) {
            console.error("在庫追加エラー:", error);
            alert("在庫追加に失敗しました");
            return;
        }

        const { error: deleteError } = await supabase
            .from("shopping_list")
            .delete()
            .in("id", selectedItems);

        if (deleteError) {
            console.error("購入リスト削除エラー:", deleteError);
            alert("購入リストの削除に失敗しました");
            return;
        }

        setItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]);

        alert(`${selectedItemsData.length}件の食材を在庫に追加し、購入リストから削除しました`);
    };

    const router = useRouter();
    const goBackToShoppingList = () => {
        router.push("/shopping"); 
    };

    useEffect(() => {
        const fetchItems = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                console.error("ユーザー情報がありません");
                return;
            }

            const { data, error } = await supabase
                .from("shopping_list")
                .select("*")
                .eq("user_id", user.id);
                
            if (error) {
                console.error("取得エラー:", error);
                return;
            }

            setItems(data ?? []);
        };

        fetchItems();
    }, []);

    return {
        items,
        selectedItems,
        handleSelectChange,
        handleExpiryChange,
        handleCategoryChange,
        addSelectedToStock,
        goBackToShoppingList,
    }
};










