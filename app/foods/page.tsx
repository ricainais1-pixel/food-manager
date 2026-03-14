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
    } = useFoods();
    


    return(
        <div className="min-h-screen flex flex-col">
            {/* <header 
            className="sticky top-0 bg-lime-300 border-b z-50">
                <div
                className="flex items-center justify-between px-8 py-5">
                    <h1 className="text-xl md:text-3xl font-bold ">食材ストック管理</h1>
                    <nav className="hidden md:block">
                        <ul 
                        className="flex gap-6 text-lg font-medium">
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/home">ホーム</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/foods">食材一覧</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/newfoods">食材登録</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/shopping">購入リスト</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/users">ユーザー設定</Link>
                            </li>
                        </ul>
                    </nav>
                    <button className="md:hidden text-2xl font-bold">☰</button>
                </div>
            </header> */}

            <main className="max-w-[1400px] mx-auto mt-10 mb-10 px-6 flex-1">
                <div className="flex items-center justify-between mb-10 ">
                    <h2 className="text-2xl font-bold">🥬食材一覧</h2>

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
                    />
                    
                    <div className="flex items-center space-x-4">
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
                            食材追加
                        </Link>
                    </div>
                </div>

            </main>
            <footer className="bg-gray-100 border-t mt-10"> 
                <div className="max-w-[1200px] mx-auto py-4 text-center text-sm text-gray-500">© 2026 Food Stock App</div>
            </footer>
        </div>
    )
}