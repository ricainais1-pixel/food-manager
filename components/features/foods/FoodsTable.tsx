"use client";

import { Food } from "./hooks/types/food";

type Props = {
    foods: Food[];
    editingFood: Food | null;
    handleEdit: (food: Food) => void;
    handleBack: () => void;
    handleDelete: (id: number) => void;
    handleSave: (food: Food) => void;
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getRemainingDays: (expiry: string) => string; 
    updateFoodCount: (food: Food, newCount: number) => void;
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    handleFieldChange: (field: keyof Food, value: string | number) => void;
};

export default function FoodsTable({
    foods,
    editingFood,
    handleEdit,
    handleBack,
    handleDelete,
    handleSave,
    handleNameChange,
    getRemainingDays,
    updateFoodCount,
    selectedCategory,
    setSelectedCategory,
    handleFieldChange
}: Props) {
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
                                {/* <th className="px-4 py-2">操作</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {foods.filter((food) =>
                                selectedCategory === "すべて"? true: food.category === selectedCategory)
                                .map((food) => (
                            <tr key={food.id}>
                                <td className="border-r px-4 py-2">{food.name}</td>
                                <td className="border-r px-4 py-2 flex flex-col items-center justify-center gap-1">
                                    <span>{food.count}</span>
                                    <div className="flex flex-col">
                                        <button
                                            onClick={() => updateFoodCount(food, food.count + 1)}
                                            className="bg-green-200 px-2 py-1 rounded hover:bg-green-400"
                                        >
                                            ▲
                                        </button>
                                        <button
                                            onClick={() => updateFoodCount(food, food.count - 1)}
                                            className="bg-red-200 px-2 py-1 rounded hover:bg-red-400"
                                        >
                                            ▼
                                        </button>
                                    </div>
                                    </td>
                                <td className="border-r px-4 py-2">{getRemainingDays(food.expiry)}</td>
                                <td className="border-r px-4 py-2">{food.category}</td>
                                <td className="px-4 py-2 space-x-2 ">
                                    <div className="flex justify-center gap-2">
                                        <button 
                                        onClick={() => handleEdit(food)}
                                        className="mr-4 bg-blue-200 px-2 py-1 rounded-md hover:bg-blue-400">
                                            編集</button>
                                        <button 
                                        className="text-center bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400"
                                        onClick={() => handleDelete(food.id)}
                                        >
                                            削除
                                        </button>
                                    </div>
                                </td>
                            </tr>
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
                                <th className="border-r px-4 py-2">name</th>
                                <th className="border-r px-4 py-2">count</th>
                                <th className="border-r px-4 py-2">expiry</th>
                                <th className="border-r px-4 py-2">category</th>
                                {/* <th className="px-4 py-2">操作</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-r px-4 py-2">
                                    <input 
                                    type="text"
                                    value={editingFood?.name ?? ""}
                                    onChange={handleNameChange}
                                    />
                                </td>
                                <td className="border-r px-4 py-2">
                                    <select
                                        value={editingFood?.count}
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
                                        value={editingFood?.expiry ?? ""}
                                        onChange={(e) => handleFieldChange("expiry", e.target.value)
                                        }
                                        className="border rounded px-2 py-1"
                                    />
                                </td>
                                <td className="border-r px-4 py-2">
                                    <select
                                        value={editingFood?.category}
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
                                        <button
                                        className="mr-4 bg-blue-200 px-2 py-1 rounded-md"
                                        onClick={() => editingFood && handleSave(editingFood)}
                                        >
                                            保存
                                        </button>
                                        <button 
                                        onClick={handleBack}
                                        className="text-center bg-gray-300 px-2 py-1 rounded-md">戻る</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
};