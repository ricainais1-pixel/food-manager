"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Item,FoodInsert } from "../types/types";

const supabase = createClient();

export default function useStockFromShopping() {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [items, setItems] = useState<Item[]>([]);

    // 選択チェック
    const handleSelectChange = (id: number, checked: boolean) => {
        setSelectedItems(prev =>
            checked ? [...prev, id] : prev.filter(i => i !== id)
        );
    };

    // 期限変更
    const handleExpiryChange = (id: number, value: string) => {
        setItems(prevItems =>
        prevItems.map(item =>
            item.id === id ? { ...item, expiry: value } : item
        )
        );
    };

    // カテゴリー変更
    const handleCategoryChange = (id: number, value: string) => {
        setItems(prevItems =>
        prevItems.map(item =>
            item.id === id ? { ...item, category: value } : item
        )
        );
    };

    // 在庫に追加
    const addSelectedToStock = async () => {
        const selectedItemsData = items.filter(item => selectedItems.includes(item.id));
        if (selectedItemsData.length === 0) {
            alert("追加するアイテムを選んでください");
            return;
        }

        // ログイン中のユーザーID取得
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;
        if (!userId) {
            alert("ユーザー情報が取得できません");
            return;
        }

        const itemsToInsert: FoodInsert[] = selectedItemsData.map(item => ({
            name: item.name,
            count: item.count,
            expiry: item.expiry ?? null,
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

        // 購入リストから削除
        const { error: deleteError } = await supabase
            .from("shopping_list")
            .delete()
            .in("id", selectedItems);

        if (deleteError) {
            console.error("購入リスト削除エラー:", deleteError);
            alert("購入リストの削除に失敗しました");
            return;
        }

        // ローカルのリストから削除されたアイテムを除去
        setItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]);

        alert(`${selectedItemsData.length}件の食材を在庫に追加し、購入リストから削除しました`);
    };

    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase
                .from("shopping_list")
                .select("*");

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
    }
};










