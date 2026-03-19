import Button from "@/components/common/Button";
import { FoodRowEditProps } from "./types/food";

export default function FoodRowEdit({ food, handlers }: FoodRowEditProps) {
    return (
        <tr>
            <td className="border-r px-4 py-2">
                <input 
                type="text"
                value={food.name}
                onChange={(e) => handlers.handleFieldChange("name", e.target.value)}
                />
            </td>
            <td className="border-r px-4 py-2 text-center">
                <select
                    value={food.count}
                    onChange={(e) => handlers.handleFieldChange("count", Number(e.target.value))}
                    className="w-full border rounded px-2 py-1 focus:outline-none"
                >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </td>
            <td className="border-r px-4 py-2 text-center">
                <input
                    type="date"
                    value={food.expiry}
                    onChange={(e) => handlers.handleFieldChange("expiry", e.target.value)
                    }
                    className="border rounded px-2 py-1"
                />
            </td>
            <td className="border-r px-4 py-2 text-center">
                <select
                    value={food.category}
                    onChange={(e) => handlers.handleFieldChange("category", e.target.value)}
                    className="w-full border rounded px-2 py-1 focus:outline-none"
                >
                    <option value="冷蔵庫">冷蔵庫</option>
                    <option value="冷凍庫">冷凍庫</option>
                    <option value="野菜室">野菜室</option>
                    <option value="パントリー">パントリー</option>
                </select>
            </td>
            <td className="border-r px-4 py-2">
                <div className="flex justify-center gap-2">
                    <Button
                    className="mr-4 bg-green-200 px-2 py-1 hover:bg-green-400"
                    onClick={() => handlers.handleSave(food)}
                    >
                        保存
                    </Button>
                    <Button 
                    onClick={handlers.handleBack}
                    className=" bg-gray-300 px-2 py-1 hover:bg-gray-400"
                    >
                        戻る
                    </Button>
                </div>
            </td>
        </tr>
    );
}
