"use client";

import Button from "@/components/common/Button";
import { Item } from "./types/types";

type Props = {
    item: Item;
    editingId: number | null;
    originalItem: Item | null;
    handleNameChange: (id: number, value: string) => void;
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
                        className="w-full border rounded px-2 py-1"
                    />
                ) : (
                    item.name
                )}
            </td>
            <td
            className="border-r px-4 py-2">
                {editingId === item.id ? (
                    <select
                        value={item.count}
                        className="w-full border rounded px-2 py-1"
                        onChange={(e) => handleEditCountChange(item.id, Number(e.target.value))}
                    >
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
            <td className="px-2 py-2 text-center">
                <div className="flex justify-center gap-4">
                    {editingId === item.id ? (
                        <>
                            <Button
                                className="text-center bg-green-300 px-2 py-1 rounded-md hover:bg-green-400"
                                onClick={() => handleUpdate(item)}
                            >
                                保存
                            </Button>
                            <Button
                                className="text-center bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400"
                                onClick={() => handleCancel()}
                            >
                                戻る
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                className="bg-blue-300 px-2 py-1 rounded-md hover:bg-blue-400"
                                onClick={() => {
                                    setEditingId(item.id);
                                    setOriginalItem(item);
                                }}
                            >
                                編集
                            </Button>

                            <Button
                                className="bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400"
                                onClick={() => handleDelete(item.id)}
                            >
                                削除
                            </Button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    )
};
        