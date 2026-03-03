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
        <div>
            <header className="flex justify-between items-center p-4">
                <h1 className="text-4xl font-bold ">食材ストック管理</h1>
                <nav>
                    <ul className="flex text-lg font-bold ">
                        <li>
                            <Link href="/home">ホーム</Link>
                        </li>
                        <li>
                            <Link href="/foods">食材一覧</Link>
                        </li>
                        <li>
                            <Link href="/newfoods">食材登録</Link>
                        </li>
                        <li>
                            <Link href="/shopping">購入リスト</Link>
                        </li>
                        <li>
                            <Link href="/users">ユーザー設定</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className=" w-full p-10 min-h-screen">
                <div className="flex">
                    <h2 className="text-2xl font-bold">食材一覧</h2>

                    <select className="flex ml-6 border-1 rounded-md p-2">
                        <option>冷蔵庫</option>
                        <option>冷凍庫</option>
                        <option>野菜室</option>
                        <option>パントリー</option>
                    </select>
                </div>

                <div className="flex">
                    <Link href="/newfoods"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md" >食材追加</Link>
                </div>

                {editingFood === null ? (
                <table className="mt-6 text-lg border-2 w-full">
                    <thead>
                        <tr>
                            <th>食材名</th>
                            <th>個数</th>
                            <th>期限</th>
                            <th>カテゴリー</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map((food) => (
                        <tr key={food.id}>
                            <td>{food.食材名}</td>
                            <td>{food.個数}</td>
                            <td>{food.期限}</td>
                            <td>{food.カテゴリー}</td>
                            <td>
                                <button
                                onClick={()=>handleEdit(food)}>編集</button>
                                <button>削除</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                ) : (
                    <div>
                        <table className="mt-6 text-lg border-2 w-full">
                            <thead>
                                <tr>
                                    <th>食材名</th>
                                    <th>個数</th>
                                    <th>期限</th>
                                    <th>カテゴリー</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text"/>
                                    </td>
                                    <td>
                                        <select>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </td>
                                    <td>
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
                                    <td>
                                        <select>
                                            <option value="冷蔵庫">冷蔵庫</option>
                                            <option value="冷凍庫">冷凍庫</option>
                                            <option value="野菜室">野菜室</option>
                                            <option value="パントリー">パントリー</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button>保存</button>
                                        <button onClick={handleBack}>戻る</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    )
}