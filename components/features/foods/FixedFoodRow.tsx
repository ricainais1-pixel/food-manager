"use client";

import { FixedRow } from "./hooks/types/newfood";
import Button from "@/components/common/Button";

type Props = {
    fixedRow: FixedRow;
    setFixedRow: React.Dispatch<React.SetStateAction<FixedRow>>;
    registerFixedRow: () => void;
    deleteFixedRow: () => void;
}

export default function FixedFoodRow({ fixedRow, setFixedRow, registerFixedRow, deleteFixedRow }: Props) {
    if (!fixedRow.isVisible) return null;

    return(
        <tr>
            <td className="border-r px-4 py-2">
                <input
                    type="text"
                    placeholder="食材名"
                    className="w-full border rounded px-2 py-1 focus:outline-none"
                    value={fixedRow.name}
                    onChange={(e) => setFixedRow({ ...fixedRow, name: e.target.value })}
                />
            </td>
            <td className="border-r px-4 py-2">
                <select
                    className="w-full border rounded px-2 py-1 focus:outline-none"
                    value={fixedRow.count}
                    onChange={(e) => setFixedRow({ ...fixedRow, count: e.target.value })}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </td>
            <td className="border-r px-4 py-2">
                <input
                    type="date"
                    className="w-full border rounded px-2 py-1 focus:outline-none"
                    value={fixedRow.expiry}
                    onChange={(e) => setFixedRow({ ...fixedRow, expiry: e.target.value })}
                />
            </td>
            <td className="border-r px-4 py-2">
                <select
                    className="w-full border rounded px-2 py-1 focus:outline-none"
                    value={fixedRow.category}
                    onChange={(e) => setFixedRow({ ...fixedRow, category: e.target.value })}
                >
                    <option value="冷蔵庫">冷蔵庫</option>
                    <option value="冷凍庫">冷凍庫</option>
                    <option value="野菜室">野菜室</option>
                    <option value="パントリー">パントリー</option>
                </select>
            </td>
            <td className="px-2 py-2 text-center">
                <Button
                    className="text-center bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400"
                    onClick={deleteFixedRow}
                >
                    削除
                </Button>
            </td>
        </tr>
    )
};