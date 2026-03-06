"use client";

import Link from "next/link";
//import { supabase } from "../../lib/supabase";
import { useState } from "react";

type Food = {
    id: number;
    食材名: string;
    個数: number;
    期限: string;
    カテゴリー: string;
};

export default function Food () {
    const [editingFood, setEditingFood] = useState<Food | null>(null);
    const foods : Food[] = [
        {
            id: 1,
            食材名: "卵",
            個数: 6,
            期限: "2026-03-20",
            カテゴリー: "冷蔵庫"
        },
        {
            id: 2,
            食材名: "牛乳",
            個数: 1,
            期限: "2026-03-31",
            カテゴリー: "冷蔵庫"
        }
    ];
    

    // const { data } =await supabase
    // .from("Foods")
    // .select("*");

    // console.log(data);

    // const foods = (data ?? []) as Food[];

    //編集ボタン
    const handleEdit = (food: Food ) => {
        setEditingFood(food) ;
        console.log("編集開始");
    };

    //戻るボタン
    const handleBack = () => {
        setEditingFood(null);
    }

    return(
        <div className="min-h-screen flex flex-col">
            <header 
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
            </header>

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
                        className="bg-blue-200 px-4 py-2 rounded-md" >
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
                                    <th className="border-r px-4 py-2">食材名</th>
                                    <th className="border-r px-4 py-2">個数</th>
                                    <th className="border-r px-4 py-2">期限</th>
                                    <th className="border-r px-4 py-2">カテゴリー</th>
                                    {/* <th className="px-4 py-2">操作</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {foods.map((food) => (
                                <tr key={food.id}>
                                    <td className="border-r px-4 py-2">{food.食材名}</td>
                                    <td className="border-r px-4 py-2">{food.個数}</td>
                                    <td className="border-r px-4 py-2">{food.期限}</td>
                                    <td className="border-r px-4 py-2">{food.カテゴリー}</td>
                                    <td className="px-4 py-2 space-x-2 ">
                                        <div className="flex justify-center gap-2">
                                            <button 
                                            onClick={() => handleEdit(food)}
                                            className="mr-4 bg-blue-200 px-2 py-1 rounded-md">
                                                編集</button>
                                            <button 
                                            className="text-center bg-gray-300 px-2 py-1 rounded-md">
                                                削除</button>
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
                                    <th className="border-r px-4 py-2">食材名</th>
                                    <th className="border-r px-4 py-2">個数</th>
                                    <th className="border-r px-4 py-2">期限</th>
                                    <th className="border-r px-4 py-2">カテゴリー</th>
                                    {/* <th className="px-4 py-2">操作</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-r px-4 py-2">
                                        <input 
                                        type="text"
                                        defaultValue={editingFood?.食材名}/>
                                    </td>
                                    <td className="border-r px-4 py-2">
                                        <select>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </td>
                                    <td className="border-r px-4 py-2">
                                        <select>
                                            <option value="1日">1日</option>
                                            <option value="3日">3日</option>
                                            <option value="7日">7日</option>
                                            <option value="2週間">2週間</option>
                                            <option value="1か月">1か月</option>
                                            <option value="3か月">3か月</option>
                                            <option value="6か月">6か月</option>
                                            <option value="詳細設定">詳細設定</option>
                                        </select>
                                    </td>
                                    <td className="border-r px-4 py-2">
                                        <select>
                                            <option value="冷蔵庫">冷蔵庫</option>
                                            <option value="冷凍庫">冷凍庫</option>
                                            <option value="野菜室">野菜室</option>
                                            <option value="パントリー">パントリー</option>
                                        </select>
                                    </td>
                                    <td className="border-r px-4 py-2">
                                        <div className="flex justify-center gap-2">
                                            <button
                                            className="mr-4 bg-blue-200 px-2 py-1 rounded-md">保存</button>
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