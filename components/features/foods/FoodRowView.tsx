import Button from "@/components/common/Button";
import { FoodRowViewProps } from "./hooks/types/food";


export default function FoodRowView({ food, handlers, getRemainingDays }: FoodRowViewProps) {
    return (
        <tr key={food.id}>
            <td className="border-r px-4 py-2">{food.name}</td>
            <td className="border-r px-4 py-2 flex flex-col items-center justify-center gap-1">
                <span>{food.count}</span>
                <div className="flex flex-col">
                    <Button
                        onClick={() => handlers.updateFoodCount(food, food.count + 1)}
                        className="bg-green-200 px-2 py-1 rounded hover:bg-green-400"
                    >
                        ▲
                    </Button>
                    <Button
                        onClick={() => handlers.updateFoodCount(food, food.count - 1)}
                        className="bg-red-200 px-2 py-1 rounded hover:bg-red-400"
                    >
                        ▼
                    </Button>
                </div>
                </td>
            <td className="border-r px-4 py-2">{getRemainingDays(food.expiry)}</td>
            <td className="border-r px-4 py-2">{food.category}</td>
            <td className="px-4 py-2 space-x-2 ">
                <div className="flex justify-center gap-2">
                    <Button 
                    onClick={() => handlers.handleEdit(food)}
                    className="mr-4 bg-blue-200 px-2 py-1 rounded-md hover:bg-blue-400">
                        編集
                    </Button>
                    <Button 
                    className="text-center bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400"
                    onClick={() => handlers.handleDelete(food.id)}
                    >
                        削除
                    </Button>
                </div>
            </td>
        </tr>
    );
};
