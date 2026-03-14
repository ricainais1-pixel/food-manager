"use client";

import { Item } from "./types/types";
import Button from "@/components/common/Button";

type Props = {
    items: Item[];
    selectedItems: number[];
    handleSelectChange: (id: number, checked: boolean) => void;
    handleExpiryChange: (id: number, value: string) => void;
    handleCategoryChange: (id: number, value: string) => void;
    addSelectedToStock: () => void;
};

export default function StockFromShoppingTable({
    items,
    selectedItems,
    handleSelectChange,
    handleExpiryChange,
    handleCategoryChange,
    addSelectedToStock,
}: Props) {
    return(
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
                <Button
                    className="bg-blue-300 px-6 py-2 rounded hover:bg-blue-400"
                    onClick={addSelectedToStock}
                >
                    在庫へ追加
                </Button>
            </div>
        </div>
    )
};