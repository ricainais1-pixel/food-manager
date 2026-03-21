"use client";

import { FixedRow } from "./hooks/types/newfood";
import Button from "@/components/common/Button";

type Props = {
    fixedRow: FixedRow;
    setFixedRow: (updatedRow: FixedRow) => void;
    registerFixedRow: () => void;
    deleteFixedRow: () => void;
    updateFixedRow: (id: number, field: string, value: string | number) => void;
}

export default function FixedFoodRow({ fixedRow, setFixedRow,deleteFixedRow,updateFixedRow }: Props) {
    if (!fixedRow.isVisible) return null;

    return(
        <tr>
            <td className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base">
                <input
                    type="text"
                    placeholder="食材名"
                    className="w-full border rounded px-1 py-1 text-xs sm:text-sm md:text-base"
                    value={fixedRow.name}
                    onChange={(e) => updateFixedRow(fixedRow.id, "name", e.target.value)}
                />
            </td>
            <td className="border-r px-2 py-1 text-center text-xs sm:text-sm md:text-base">
                <select
                    className="w-full border rounded px-1 py-1 text-xs sm:text-sm md:text-base focus:outline-none"
                    value={fixedRow.count}
                    onChange={(e) => updateFixedRow(fixedRow.id, "count", Number(e.target.value))}
                >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </td>
            <td className="border-r px-2 py-1 text-center text-xs sm:text-sm md:text-base">
                <input
                    type="date"
                    className="w-full border rounded px-1 py-1 text-xs sm:text-sm md:text-base"
                    value={fixedRow.expiry}
                    onChange={(e) => updateFixedRow(fixedRow.id, "expiry", e.target.value)}
                />
            </td>
            <td className="border-r px-2 py-1 text-center text-xs sm:text-sm md:text-base">
                <select
                    className="w-full border rounded px-1 py-1 text-xs sm:text-sm md:text-base focus:outline-none"
                    value={fixedRow.category}
                    onChange={(e) => updateFixedRow(fixedRow.id, "category", e.target.value)}
                >
                    <option value="冷蔵庫">冷蔵庫</option>
                    <option value="冷凍庫">冷凍庫</option>
                    <option value="野菜室">野菜室</option>
                    <option value="パントリー">パントリー</option>
                </select>
            </td>
            <td className="px-2 py-2 text-center">
                <Button
                    className=" bg-gray-300 px-2 py-1 text-xs sm:text-sm md:text-base hover:bg-gray-400"
                    onClick={deleteFixedRow}
                >
                    削除
                </Button>
            </td>
        </tr>
    )
};