import Button from "@/components/common/Button";
import { FoodRowViewProps } from "./types/food";


export default function FoodRowView({ 
    food, 
    handlers, 
    getRemainingDays,
    checkedFoods,
    toggleCheck 
}: FoodRowViewProps) {
    return (
        <tr key={food.id} className={food.count <= 0 ? "bg-red-200" : ""}>
            <td className="border-r px-2 py-1 text-center">
                <input
                    type="checkbox"
                    checked={checkedFoods.includes(food.id)}
                    onChange={() => toggleCheck(food.id)}
                />
            </td>
            <td className="border-r px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base">{food.name}</td>
            <td className="border-r px-2 py-1 text-center text-xs sm:text-sm md:text-base">{food.count}</td>
            <td className="border-r px-2 py-1 text-center text-xs sm:text-sm md:text-base">{getRemainingDays(food.expiry)}</td>
            <td className="border-r px-2 py-1 text-center text-xs sm:text-sm md:text-base">{food.category}</td>
            <td className="border-r px-2 py-1">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                    <Button 
                    onClick={() => handlers.handleEdit(food)}
                    className="bg-blue-200 px-2 py-1 text-xs sm:text-sm md:text-base hover:bg-blue-400">
                        編集
                    </Button>
                    <Button 
                    className="bg-gray-300 px-2 py-1 text-xs sm:text-sm md:text-base hover:bg-gray-400"
                    onClick={() => handlers.handleDelete(food.id)}
                    >
                        削除
                    </Button>
                </div>
            </td>
        </tr>
    );
};

