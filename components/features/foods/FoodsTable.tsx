"use client";

import { Food } from "./hooks/types/food";
import FoodRowView from "./FoodRowView";
import FoodRowEdit from "./FoodRowEdit";

type FoodHandlers = {
    handleEdit: (food: Food) => void;
    handleDelete: (id: number) => void;
    handleSave: (food: Food) => void;
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    updateFoodCount: (food: Food, newCount: number) => void;
    handleFieldChange: (field: keyof Food, value: string | number) => void;
    handleBack: () => void;
};

type Props = {
    foods: Food[];
    editingFood: Food | null;
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    handlers: FoodHandlers;
    getRemainingDays: (expiry: string) => string;
};

export default function FoodsTable({
    foods,
    editingFood,
    selectedCategory,
    setSelectedCategory,
    handlers,
    getRemainingDays,
}: Props) {
    const filteredFoods = foods.filter(
        (food) => selectedCategory === "すべて" || food.category === selectedCategory
    );

    return (
        <div className="overflow-x-auto">
            {editingFood === null ? (
                <div>
                    <table 
                    className="w-full border-2 border-gray-400 table-fixed mb-10">
                        <thead className="border-b-2">
                            <tr>
                                <th className="border-r px-4 py-2">食材名</th>
                                <th className="border-r px-4 py-2">個数</th>
                                <th className="border-r px-4 py-2">期限</th>
                                <th className="border-r px-4 py-2">カテゴリー</th>
                                <th className="px-4 py-2">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFoods.map((food) => (
                                <FoodRowView
                                    key={food.id}
                                    food={food}
                                    handlers={{
                                        handleEdit: handlers.handleEdit,
                                        handleDelete: handlers.handleDelete,
                                        updateFoodCount: handlers.updateFoodCount,
                                        }}
                                    getRemainingDays={getRemainingDays}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <table 
                    className="mt-6 w-full border-2 border-gray-400 table-fixed mb-10">
                        <thead className="border-b-2">
                            <tr>
                                <th className="border-r px-4 py-2">名前</th>
                                <th className="border-r px-4 py-2">個数</th>
                                <th className="border-r px-4 py-2">期限</th>
                                <th className="border-r px-4 py-2">カテゴリー</th>
                                <th className="px-4 py-2">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {editingFood && (
                                <FoodRowEdit
                                    food={editingFood}
                                    handlers={{
                                        handleSave: handlers.handleSave,
                                        handleNameChange: handlers.handleNameChange,
                                        handleFieldChange: handlers.handleFieldChange,
                                        handleBack: handlers.handleBack,
                                    }}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
};