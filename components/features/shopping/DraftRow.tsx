"use client";

import Button from "@/components/common/Button";
import { Item } from "./types/types";

type Props = {
    draft: Item;
    handleDraftNameChange: (id: number, value: string) => void;
    handleDraftCountChange: (id: number, value: number) => void;
    handleDraftCategoryChange: (id: number, value: string) => void;
    handleSave: (draft: Item) => void;
    handleDraftDelete: (id: number) => void;
};

export default function DraftRow({
    draft,
    handleDraftNameChange,
    handleDraftCountChange,
    handleDraftCategoryChange,
    handleSave,
    handleDraftDelete,
}: Props) {
    return (
        <tr>
            <td className="border-r px-4 py-2">
                <input 
                placeholder="食材名" 
                value={draft.name}
                onChange={(e) =>
                    handleDraftNameChange(draft.id, e.target.value)}
                className="w-full border rounded px-2 py-1 focus:outline-none"/>
            </td>
            <td className="border-r px-4 py-2">
                <select
                className="w-full border rounded px-2 py-1 focus:outline-none"
                value={draft.count}
                onChange={(e) =>
                    handleDraftCountChange(draft.id, Number(e.target.value))
                }>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </td>
            <td className="border-r px-4 py-2">
                <select
                    value={draft.category || ""}
                    onChange={(e) =>handleDraftCategoryChange(draft.id, e.target.value)}
                    className="w-full border rounded px-2 py-1 focus:outline-none"
                >
                    <option value="冷蔵庫">冷蔵庫</option>
                    <option value="冷凍庫">冷凍庫</option>
                    <option value="野菜室">野菜室</option>
                    <option value="パントリー">パントリー</option>
                </select>
            </td>
            <td>
                <div className="flex justify-center gap-4">
                    <Button
                    className="text-center bg-red-200 px-2 py-1 rounded-md hover:bg-red-400"
                    onClick={()=>handleSave(draft)}>
                        保存
                    </Button>
                    <Button
                    className="text-center bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400"
                    onClick={()=>handleDraftDelete(draft.id)}>
                        削除
                    </Button>
                </div>
            </td>
        </tr>
    )
};
