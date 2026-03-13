"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();

type Item = {
    id: number;
    name: string;
    count: number;
    expiry?: string;
    category?: string;
};

type FoodInsert = {
    name: string;
    count: number;
    expiry?: string | null;
    category: string;
    user_id: string;
};


export default function StockFromShopping() {
    const router = useRouter();

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

    return (
        <div className="max-w-[800px] mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">購入リストから在庫へ追加</h2>

            <table className="w-full border-2 border-gray-400 table-fixed">
                <thead>
                    <tr>
                        <th className="border-r px-4 py-2">選択</th>
                        <th className="border-r px-4 py-2">食材名</th>
                        <th className="border-r px-4 py-2">個数</th>
                        <th className="border-r px-4 py-2">期限</th>
                        <th className="border-r px-4 py-2">カテゴリー</th>
                    </tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td className="border-r px-4 py-2 text-center">
                            <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={e => handleSelectChange(item.id, e.target.checked)}
                            />
                        </td>
                        <td className="border-r px-4 py-2">{item.name}</td>
                        <td className="border-r px-4 py-2">{item.count}</td>
                        <td className="border-r px-4 py-2">
                            <input
                                type="date"
                                value={item.expiry || ""}
                                onChange={e => handleExpiryChange(item.id, e.target.value)}
                            />
                        </td>
                        <td className="border-r px-4 py-2">
                            <select
                                value={item.category || "冷蔵庫"}
                                onChange={e => handleCategoryChange(item.id, e.target.value)}
                            >
                                <option value="冷蔵庫">冷蔵庫</option>
                                <option value="冷凍庫">冷凍庫</option>
                                <option value="野菜室">野菜室</option>
                                <option value="パントリー">パントリー</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-300 px-6 py-2 rounded hover:bg-blue-400"
                    onClick={addSelectedToStock}
                >
                    在庫へ追加
                </button>
            </div>
        </div>
    );
}