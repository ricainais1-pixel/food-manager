"use client";

import Button from "@/components/common/Button";
import { Item } from "./types/types";

type Props = {
    item: Item;
    editingId: number | null;
    originalItem: Item | null;
    handleNameChange: (id: number, value: string) => void;
    handleCategoryChange: (id: number, value: string) => void;
    handleEditCountChange: (id: number, value: number) => void;
    handleUpdate: (item: Item) => void;
    handleDelete: (id: number) => void;
    handleCancel: () => void;
    setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
    setOriginalItem: React.Dispatch<React.SetStateAction<Item | null>>;
};

export default function ShoppingRow({
    item,
    editingId,
    handleNameChange,
    handleCategoryChange,
    handleEditCountChange,
    handleUpdate,
    handleDelete,
    handleCancel,
    setEditingId,
    setOriginalItem
}: Props) {

    return (
        <tr>
            <td
            className="border-r px-4 py-2">
                {editingId === item.id ? (
                    <input
                        value={item.name}
                        onChange={(e) => handleNameChange(item.id, e.target.value)}
                        className="w-full border rounded px-2 py-1 focus:outline-none"
                    />
                ) : (
                    item.name
                )}
            </td>
            <td className="border-r px-4 py-2">
                {editingId === item.id ? (
                    <select
                        value={item.count}
                        className="w-full border rounded px-2 py-1 focus:outline-none"
                        onChange={(e) => handleEditCountChange(item.id, Number(e.target.value))}
                    >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                ) : (
                    item.count
                )}
            </td>
            <td
            className="border-r px-4 py-2">
                {editingId === item.id ? (

                <select
                    value={item.category || ""}
                    onChange={(e) => handleCategoryChange(item.id, e.target.value)}
                    className="w-full border rounded px-2 py-1 focus:outline-none"
                >
                    <option value="冷蔵庫">冷蔵庫</option>
                    <option value="冷凍庫">冷凍庫</option>
                    <option value="野菜室">野菜室</option>
                    <option value="パントリー">パントリー</option>
                </select>
                ) : (
                    item.category || ""
                )}
            </td>
            <td>
                <div className="flex justify-center gap-4">
                    {editingId === item.id ? (
                        <div className="flex flex-wrap justify-center mt-4 gap-4 sm:gap-6 md:gap-8">
                            <Button
                                className="bg-lime-300 px-2 py-1 text-xs sm:text-sm md:text-base hover:bg-lime-500"
                                onClick={() => handleUpdate(item)}
                            >
                                保存
                            </Button>
                            <Button
                                className="bg-gray-300 px-2 py-1 text-xs sm:text-sm md:text-base hover:bg-gray-400"
                                onClick={() => handleCancel()}
                            >
                                戻る
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-center mt-4 gap-4 sm:gap-6 md:gap-8">
                            <Button
                                className="bg-blue-200 px-2 py-1 text-xs sm:text-sm md:text-base hover:bg-blue-400"
                                onClick={() => {
                                    setEditingId(item.id);
                                    setOriginalItem(item);
                                }}
                            >
                                編集
                            </Button>

                            <Button
                                className="bg-gray-300 px-2 py-1 text-xs sm:text-sm md:text-base hover:bg-gray-400"
                                onClick={() => handleDelete(item.id)}
                            >
                                削除
                            </Button>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    )
};
        