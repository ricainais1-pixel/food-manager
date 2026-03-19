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
    goBackToShoppingList: () => void;
};

export default function StockFromShoppingTable({
    items,
    selectedItems,
    handleSelectChange,
    handleExpiryChange,
    handleCategoryChange,
    addSelectedToStock,
    goBackToShoppingList
}: Props) {
    return(
        <div className="min-h-screen flex flex-col">
            <h2 className="text-2xl font-bold mb-10">購入リストから在庫へ追加</h2>

            <div className="overflow-x-auto">
                <table className="table-fixed w-full border-2 border-gray-400 mb-10">
                    <thead className="border-b-2">
                        <tr>
                            <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-8"></th>
                            <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-32">食材名</th>
                            <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-14">個数</th>
                            <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-24">期限</th>
                            <th className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base w-20">カテゴリー</th>
                        </tr>
                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td className="border-r px-2 py-1 text-center">
                                <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={e => handleSelectChange(item.id, e.target.checked)}
                                />
                            </td>
                            <td className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base">{item.name}</td>
                            <td className="border-r px-2 py-1 text-center text-xs sm:text-sm md:text-base">{item.count}</td>
                            <td className="border-r px-2 py-1 text-center text-xs sm:text-sm md:text-base">
                                <input
                                    type="date"
                                    value={item.expiry || ""}
                                    onChange={e => handleExpiryChange(item.id, e.target.value)}
                                    className="w-full border rounded px-1 py-1 text-xs sm:text-sm md:text-base"
                                />
                            </td>
                            <td className="border-r px-2 py-1 text-center text-xs sm:text-sm md:text-base">
                                <select
                                    value={item.category || "冷蔵庫"}
                                    onChange={e => handleCategoryChange(item.id, e.target.value)}
                                    className="w-full border rounded px-1 py-1 text-xs sm:text-sm md:text-base focus:outline-none"
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
            </div>

            <div className="flex flex-wrap justify-center mt-4 gap-4 sm:gap-6 md:gap-8">
                <Button
                    className="bg-gray-300 px-8 py-3 text-xs sm:text-sm md:text-base hover:bg-gray-400"
                    onClick={goBackToShoppingList}
                >
                    戻る
                </Button>
                <Button
                    className="bg-blue-200 px-6 py-3 w-full sm:w-32 md:w-36 hover:bg-blue-400 max-w-xs"
                    onClick={addSelectedToStock}
                >
                    在庫へ追加
                </Button>
            </div>
        </div>
    )
};