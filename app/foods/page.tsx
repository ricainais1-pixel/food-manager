"use client";

import Link from "next/link";
import useFoods from "@/components/features/foods/hooks/useFoods";
import FoodsTable from "@/components/features/foods/FoodsTable";

export default function FoodsPage () {
    const {
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
        handleFieldChange,
        checkedFoods,
        toggleCheck, 
        addSelectedToShoppingList
    } = useFoods();
    


    return(
        <div className="min-h-screen flex flex-col">
            <div className="flex justify-between items-center mb-10">
                
            <h2 className="text-2xl font-bold">🥬食材一覧</h2>
        
            <div className="flex items-center space-x-6">
                <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border-2 rounded-md p-2 focus:outline-none ">
                    <option value="すべて">すべて</option>
                    <option value="冷蔵庫">冷蔵庫</option>
                    <option value="冷凍庫">冷凍庫</option>
                    <option value="野菜室">野菜室</option>
                    <option value="パントリー">パントリー</option>
                </select>
                <Link 
                href="/newfoods"
                className="bg-blue-200 px-4 py-2 rounded-md hover:bg-blue-400" >
                    ＋
                </Link>

                <button
                onClick={addSelectedToShoppingList
                }>🛒</button>
                </div>
            </div>
            <FoodsTable
                foods={foods}
                    editingFood={editingFood}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    getRemainingDays={getRemainingDays}
                    handlers={{
                        handleEdit,
                        handleBack,
                        handleDelete,
                        handleSave,
                        handleNameChange,
                        updateFoodCount,
                        handleFieldChange,
                    }}
                    checkedFoods={checkedFoods}
                    toggleCheck={toggleCheck}
            />
        </div>
    )
}