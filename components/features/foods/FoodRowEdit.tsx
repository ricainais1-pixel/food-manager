import Button from "@/components/common/Button";
import { FoodRowEditProps } from "./hooks/types/food";

export default function FoodRowEdit({
    food,
    handleFieldChange,
    handleSave,
    handleBack
}: FoodRowEditProps) {
    return (
        <tr>
            <td className="border-r px-4 py-2">
                <input 
                type="text"
                value={food.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                />
            </td>
            <td className="border-r px-4 py-2">
                <select
                    value={food.count}
                    onChange={(e) => handleFieldChange("count", Number(e.target.value))
                    }
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
                    value={food.expiry}
                    onChange={(e) => handleFieldChange("expiry", e.target.value)
                    }
                    className="border rounded px-2 py-1"
                />
            </td>
            <td className="border-r px-4 py-2">
                <select
                    value={food.category}
                    onChange={(e) => handleFieldChange("expiry", e.target.value)}
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
                    className="mr-4 bg-blue-200 px-2 py-1 rounded-md"
                    onClick={() => handleSave(food)}
                    >
                        保存
                    </Button>
                    <Button 
                    onClick={handleBack}
                    className="text-center bg-gray-300 px-2 py-1 rounded-md
                    ">
                        戻る
                    </Button>
                </div>
            </td>
        </tr>
    );
}
