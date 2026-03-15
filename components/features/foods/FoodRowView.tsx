import Button from "@/components/common/Button";
import { FoodRowViewProps } from "./hooks/types/food";


export default function FoodRowView({ food, handlers, getRemainingDays }: FoodRowViewProps) {
    return (
        <tr key={food.id}>
            <td className="border-r px-4 py-2">{food.name}</td>
            <td className="border-r px-4 py-2 text-center">{food.count}</td>
            <td className="border-r px-4 py-2 text-center">{getRemainingDays(food.expiry)}</td>
            <td className="border-r px-4 py-2 text-center">{food.category}</td>
            <td className="px-4 py-2 space-x-2 ">
                <div className="flex justify-center gap-2">
                    <Button 
                    onClick={() => handlers.handleEdit(food)}
                    className="mr-4 bg-blue-200 px-2 py-1 hover:bg-blue-400">
                        編集
                    </Button>
                    <Button 
                    className=" bg-gray-300 px-2 py-1 hover:bg-gray-400"
                    onClick={() => handlers.handleDelete(food)}
                    >
                        削除
                    </Button>
                </div>
            </td>
        </tr>
    );
};

