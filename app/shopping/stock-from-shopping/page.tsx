"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Item = {
    id: number;
    name: string;
    count: number;
    expiry?: string;
    category?: string;
};


export default function StockFromShopping() {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [items, setItems] = useState<Item[]>([]);

    const handleSelectChange = (id: number, checked: boolean) => {
        setSelectedItems(prev =>
            checked
            ? [...prev, id]      // チェックON → 配列に追加
            : prev.filter(i => i !== id) // チェックOFF → 配列から削除
        );
    };

    const addSelectedToStock = async (selectedItems: Item[]) => {
        if (selectedItems.length === 0) {
            alert("追加するアイテムを選んでください");
            return;
    }

    // Supabase の在庫テーブルにまとめて挿入
    const { data, error } = await supabase
        .from("foods") // 在庫テーブル名
        .insert(
        selectedItems.map(item => ({
            name: item.name,
            count: item.count,
            expiry: item.expiry ?? null,
            category: item.category ?? "冷蔵庫"
        }))
    );

    if (error) {
        console.error("在庫追加エラー:", error);
        alert("在庫追加に失敗しました");
        return;
    }

        alert(`${data.length}件の食材を在庫に追加しました`);
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

            setItems(data ?? []); // data が null の場合は空配列
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
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-300 px-6 py-2 rounded hover:bg-blue-400"
                    onClick={() => addSelectedToStock(items.filter(i => selectedItems.includes(i.id)))}
                >
                    在庫に追加
                </button>
            </div>
        </div>
    );
}