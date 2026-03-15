"use client";

import { NewFood } from "./hooks/types/newfood";
import Button from "@/components/common/Button";

type Props = {
    food: NewFood;
    updateFood: (id: number, field: string, value: string | number) => Promise<void>;
    deleteFood: (id: number) => Promise<void>;
};

export default function FoodRow({ food, updateFood, deleteFood }: Props) {
    return(
        <tr>
            <td className="border-r px-4 py-2">
                <input
                    type="text"
                    value={food.name}
                    placeholder="食材名"
                    className="w-full border rounded px-2 py-1 focus:outline-none"
                    onChange={(e) => updateFood(food.id, "name", e.target.value)}
                    />
            </td>
            <td className="border-r px-4 py-2">
                <select 
                className="w-full border rounded px-2 py-1 focus:outline-none"
                value={food.count ?? 1}
                onChange={(e) => updateFood(food.id, "count", e.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </td>
            <td className="border-r px-4 py-2">
                <input
                    type="date"
                    className="w-full border rounded px-2 py-1 focus:outline-none"
                    value={food.expiry ?? new Date().toISOString().split("T")[0]}
                    onChange={(e) => updateFood(food.id, "expiry", e.target.value)}
                />
            </td>
            <td className="border-r px-4 py-2">
                <select 
                className="w-full border rounded px-2 py-1 focus:outline-none"
                value={food.category ?? "冷蔵庫"}
                onChange={(e) => updateFood(food.id, "category", e.target.value)}>
                    <option value="冷蔵庫">冷蔵庫</option>
                    <option value="冷凍庫">冷凍庫</option>
                    <option value="野菜室">野菜室</option>
                    <option value="パントリー">パントリー</option>
                </select>
            </td>
            <td className="px-2 py-2 text-center">
                <Button
                    className=" bg-gray-300 px-2 py-1 hover:bg-gray-400"
                    onClick={()=>deleteFood(food.id)}
                >
                    削除
                </Button>
            </td>
        </tr>
    )
};