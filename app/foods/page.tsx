"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const supabase = createClient();

type Food = {
    id: number;
    name: string;
    quantity: string;
    expiry: string;
    category: string;
    created_at?: string;
};

export default function Food () {
    const [editingFood, setEditingFood] = useState<Food | null>(null);
    const [foods, setFoods] = useState<Food[]>([]);
    
    //編集ボタン
    const handleEdit = (food: Food ) => {
        setEditingFood({ ...food });
        console.log("編集開始");
    };

    //戻るボタン
    const handleBack = () => {
        setEditingFood(null);
    }

    // 削除ボタン
    const handleDelete = async (id: number) => {
        const { error } = await supabase
            .from("Foods")
            .delete()
            .eq("id", id);

        if (error) {
            console.log(error);
        } else {
            setFoods(foods.filter((food) => food.id !== id));
        }
    };

    // 編集保存ボタン
    const handleSave = async () => {
        
        const { error } = await supabase
            .from("Foods")
            .update({
            name: editingFood?.name,
            quantity: editingFood?.quantity,
            expiry: editingFood?.expiry,
            category: editingFood?.category,
            })
            .eq("id", editingFood?.id);

        if (error) {
            console.log(error);
        } else {
            setEditingFood(null);

        const { data } = await supabase
            .from("Foods")
            .select("*")
            .order("expiry", { ascending: true });

            setFoods(data as Food[]);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingFood({
            ...editingFood!,
            name: e.target.value,
        });
    };

    
    // 残日数計算
    const getRemainingDays = (expiry日: string) => {
        const today = new Date();
        const expire = new Date(expiry日);
        const diffDays = Math.ceil((expire.getTime() - today.getTime()) / (1000*60*60*24));
        if (diffDays <= 0) return `expiry切れ (${expiry日})`;
        return `残${diffDays}日 (${expiry日})`;
    };

    useEffect(() => {
        const getFoods = async () => {
            const { data, error } = await supabase
            .from("Foods")
            .select("*")
            .order("expiry", { ascending: true });

            if (error) {
            console.log(error);
            } else {
            setFoods(data as Food[]);
            }
        };

        getFoods();
    }, []);


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

                    <div className="flex items-center space-x-4">
                        <select 
                        className="border-2 rounded-md p-2 focus:outline-none ">
                            <option>冷蔵庫</option>
                            <option>冷凍庫</option>
                            <option>野菜室</option>
                            <option>パントリー</option>
                        </select>
                        <Link 
                        href="/newfoods"
                        className="bg-blue-200 px-4 py-2 rounded-md hover:bg-blue-400" >
                            食材追加
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {editingFood === null ? (
                    <div>
                        <table 
                        className="w-full border-2 border-gray-400 table-fixed mb-10">
                            <thead className="border-b-2">
                                <tr>
                                    <th className="border-r px-4 py-2">name</th>
                                    <th className="border-r px-4 py-2">quantity</th>
                                    <th className="border-r px-4 py-2">expiry</th>
                                    <th className="border-r px-4 py-2">category</th>
                                    {/* <th className="px-4 py-2">操作</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {foods.map((food) => (
                                <tr key={food.id}>
                                    <td className="border-r px-4 py-2">{food.name}</td>
                                    <td className="border-r px-4 py-2">{food.quantity}</td>
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
                                    <th className="border-r px-4 py-2">quantity</th>
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
                                            value={editingFood?.quantity}
                                            onChange={(e)=>
                                            setEditingFood({
                                            ...editingFood!,
                                            quantity:e.target.value
                                            })
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
                                            onChange={(e) =>
                                                setEditingFood({
                                                    ...editingFood!,
                                                    expiry: e.target.value,
                                                })
                                            }
                                            className="border rounded px-2 py-1"
                                        />
                                    </td>
                                    <td className="border-r px-4 py-2">
                                        <select
                                            value={editingFood?.category}
                                            onChange={(e)=>
                                            setEditingFood({
                                            ...editingFood!,
                                            category:e.target.value
                                            })
                                            }
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
                                            onClick={handleSave}
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
            </main>
            <footer className="bg-gray-100 border-t mt-10"> 
                <div className="max-w-[1200px] mx-auto py-4 text-center text-sm text-gray-500">© 2026 Food Stock App</div>
            </footer>
        </div>
    )
}