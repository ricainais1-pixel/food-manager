"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Item } from "../types/types";

const supabase = createClient();

export default function useShopping() {
    const [draftItems, setDraftItems] = useState<Item[]>([]);
    const [items,setItems] = useState <Item[]> ([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [originalItem, setOriginalItem] = useState<Item | null>(null);


    // supabaseからデーターを取得する
    useEffect(() => {
    const fetchItems = async () => {
        const { data, error } = await supabase
            .from("shopping_list")
            .select("*");

        if (error) {
            console.log(error);
            return;
        }

        setItems(data ?? []);
    };

    fetchItems();

    }, []);

    // 追加ボタン
    const handleAdd = () => {
        const newItem = {
            id: Date.now(),
            name: "",
            count: 1,
            category: ""
        };
        setDraftItems([...draftItems, newItem]);    
    };

    // 保存ボタン
    const handleSave = async (draft: Item) => {

        if (!draft.name.trim()) {
            alert("食材名を入力してください");
            return;
        }

        const { error } = await supabase
            .from("shopping_list")
            .insert({
                name: draft.name,
                count: draft.count,
                category: draft.category || null
            });

        if (error) {
            console.log(error);
            alert("保存失敗");
            return;
        }

        const { data } = await supabase
            .from("shopping_list")
            .select("*");

        setItems(data ?? []);
        setDraftItems(draftItems.filter(item => item.id !== draft.id));
    };

    // 追加フォームで名前入力
    const handleDraftNameChange = (id: number, value: string) => {
        setDraftItems(
            draftItems.map((item) =>
            item.id === id ? { ...item, name: value } : item
            )
        );
    };

    // 個数変更
    const handleDraftCountChange = (id: number, value: number) => {
        setDraftItems(
            draftItems.map((item) =>
            item.id === id ? { ...item, count: value } : item
            )
        );
    };

    // カテゴリ変更
    const handleDraftCategoryChange = (id: number, value: string) => {
        setDraftItems(
            draftItems.map((item) =>
            item.id === id ? { ...item, category: value } : item
            )
        );
    };

    // 保存済みの削除ボタン
    const handleDelete = async (id: number) => {
        const { error } = await supabase
            .from("shopping_list")
            .delete()
            .eq("id", id);

        if (error) {
            console.log(error);
            return;
    }

    setItems(items.filter((item) => item.id !== id));
};

    // 追加フォームの削除ボタン
    const handleDraftDelete = (id: number) => {
        setDraftItems(
            draftItems.filter((item) => item.id !== id)
        );
    };

    // 個数を変更する（編集用）
    const handleCountChange = (id: number, value: number) => {
        setItems(items.map(i =>
            i.id === id
                ? { ...i, count: value }
                : i
        ));
    };

    // 編集ボタン
    const handleUpdate = async (item: Item) => {
        const { error } = await supabase
            .from("shopping_list")
            .update({
                name: item.name,
                count: item.count,
                category: item.category
            })
            .eq("id", item.id);

        if (error) {
            console.log(error);
            return;
        }

        setEditingId(null);
    };

    // カテゴリーを変更する
    const handleCategoryChange = (id: number, value: string) => {
        setItems(items.map(i =>
            i.id === id
                ? { ...i, category: value }
                : i
        ));
    };

    // 個数を変更する（一般用）
    const handleEditCountChange = (id: number, value: number) => {
        setItems(items.map(i =>
            i.id === id
                ? { ...i, count: value }
                : i
        ));
    };

    // 食材名変更
    const handleNameChange = (id: number, value: string) => {
        setItems(items.map(i =>
            i.id === id
                ? { ...i, name: value }
                : i
        ));
    };

    // 戻るボタン
    const handleCancel = () => {
        if (!originalItem) return;

        setItems(prev =>
            prev.map(i =>
                i.id === originalItem.id ? originalItem : i
            )
        );

        setEditingId(null);
        setOriginalItem(null);
    };


    return {
    items,
    draftItems,
    editingId,
    originalItem,
    setEditingId,
    setOriginalItem,
    handleAdd,
    handleSave,
    handleDraftNameChange,
    handleDraftCountChange,
    handleDraftCategoryChange,
    handleDraftDelete,
    handleCountChange,    handleNameChange,    handleCategoryChange,
    handleEditCountChange,
    handleUpdate,
    handleDelete,
    handleCancel,
    };
};