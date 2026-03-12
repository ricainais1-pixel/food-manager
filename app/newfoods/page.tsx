"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Food from "../foods/page";

const supabase = createClient();


type Food = {
    id: number;
    name: string;
    quantity: string;
    expiry: string;
    category: string;
    created_at?: string;
};

export default function NewFoodPage () {

    const [foods,setFoods] = useState <Food[]> ([]);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expiry, setExpiry] = useState(new Date().toISOString().split("T")[0]);
    const [category, setCategory] = useState("");
    const [fixedRow, setFixedRow] = useState({
        name: "",
        quantity: "1",
        expiry: new Date().toISOString().split("T")[0],
        category: "冷蔵庫",
        isVisible: true
    });

    // 固定行リセット
    const deleteFixedRow = () => {
        setFixedRow({ ...fixedRow, isVisible: false });
    };

    // +追加ボタン
    const handleAddFood = () => {
        setFoods([
            ...foods,
            {
            id: -Date.now(), 
            name: "",
            quantity: "1",
            expiry: new Date().toISOString().split("T")[0],
            category: "冷蔵庫"
            }
        ]);
    };
    // 削除ボタン
    const deleteFood = async (id: number) => {
        if (id < 0) {
            setFoods(foods.filter((food) => food.id !== id));
            return;
        }
        const { error } = await supabase.from('Foods').delete().eq('id', id);
        if (error) console.log(error);
        else setFoods(foods.filter((food) => food.id !== id));
    };

    // selectを更新するとき
    const updateFood = async (id: number, field: string, value: string | number) => {
        if (id > 0) {
            const { error } = await supabase.from('Foods').update({ [field]: value }).eq('id', id);
            if (error) {
                console.log(error);
                return;
            }
        }

        setFoods(
            foods.map((food) => (food.id === id ? { ...food, [field]: value } : food))
        );
    };

    // supabaseの情報取得
    useEffect(() => {
        const fetchFoods = async () => {
            const { error } = await supabase.from('Foods').select('*');
            if (error) console.log(error);
            // 既存データは表示しないので setFoods(data) は呼ばない
        };
        fetchFoods();
    }, []);

    // 登録ボタンでまとめて保存
    const handleRegisterAll = async () => {
        try {
            const allFoods = [...foods];

            // 固定行が入力されていれば追加
            if (fixedRow.isVisible && fixedRow.name.trim() !== "") {
                allFoods.push({
                    id: -Date.now(),
                    name: fixedRow.name,
                    quantity: fixedRow.quantity || "1",
                    expiry: fixedRow.expiry || new Date().toISOString().split("T")[0],
                    category: fixedRow.category || "冷蔵庫",
                });
            }

            const unsavedFoods = allFoods.filter(f => f.id < 0);

            if (unsavedFoods.length === 0) {
                alert("登録する行がありません");
                return;
            }

            // id は送らずに Supabase に挿入
            const foodsToInsert = unsavedFoods.map(food => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { id, ...rest } = food;
                return rest;
            });

            const { error } = await supabase.from("Foods").insert(foodsToInsert);
            if (error) {
                alert("登録に失敗しました: " + error.message);
                return;
            }

            // 登録後は画面表示用の foods をリセットして固定行もクリア
            setFoods([]);        // 追加行リセット
                setFixedRow({        // 固定行を非表示にする
                name: "",
                quantity: "1",
                expiry: new Date().toISOString().split("T")[0],
                category: "冷蔵庫",
                isVisible: false
            });
            alert("登録完了しました！");
        } catch (e) {
            console.error(e);
            alert("予期せぬエラーが発生しました");
        }
    };

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
                <div>
                    <h2 className="text-2xl font-bold mb-20">📋食材登録</h2>
                    <table className="w-full border-2 border-gray-400 table-fixed mb-10">
                        <thead className="border-b-2">
                            <tr>
                                <th className="border-r px-4 py-2">食材</th>
                                <th className="border-r px-4 py-2">個数</th>
                                <th className="border-r px-4 py-2">期限</th>
                                <th className="border-r px-4 py-2">カテゴリー</th>
                                <th className="px-2 py-2 w-18"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {fixedRow.isVisible && (
                                <tr>
                                    <td className="border-r px-4 py-2">
                                        <input
                                        type="text"
                                        placeholder="食材名"
                                        className="w-full border rounded px-2 py-1 focus:outline-none"
                                        value={fixedRow.name}
                                        onChange={(e) => setFixedRow({ ...fixedRow, name: e.target.value })}
                                        />
                                    </td>
                                <td className="border-r px-4 py-2">
                                    <select
                                    className="w-full border rounded px-2 py-1 focus:outline-none"
                                    value={fixedRow.quantity}
                                    onChange={(e) => setFixedRow({ ...fixedRow, quantity: e.target.value })}
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
                                    className="w-full border rounded px-2 py-1 focus:outline-none"
                                    value={fixedRow.expiry}
                                    onChange={(e) => setFixedRow({ ...fixedRow, expiry: e.target.value })}
                                    />
                                </td>
                                <td className="border-r px-4 py-2">
                                    <select
                                    className="w-full border rounded px-2 py-1 focus:outline-none"
                                    value={fixedRow.category}
                                    onChange={(e) => setFixedRow({ ...fixedRow, category: e.target.value })}
                                    >
                                    <option value="冷蔵庫">冷蔵庫</option>
                                    <option value="冷凍庫">冷凍庫</option>
                                    <option value="野菜室">野菜室</option>
                                    <option value="パントリー">パントリー</option>
                                    </select>
                                </td>
                                <td className="px-2 py-2 text-center">
                                    <button
                                    className="text-center bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400"
                                    onClick={deleteFixedRow}
                                    >
                                    削除
                                    </button>
                                </td>
                                </tr>
                            )}
                            {foods.map((food)=>(
                                <tr key={food.id}>
                                    <td className="border-r px-4 py-2">
                                        <input
                                            type="text"
                                            value={food.name}
                                            placeholder="食材名"
                                            className="w-full border rounded px-2 py-1 focus:outline-none"
                                            onChange={(e) => updateFood(food.id, "name", e.target.value)}
                                            />
                                    </td>
                                    <td className="border-r px-4 py-2">
                                        <select 
                                        className="w-full border rounded px-2 py-1 focus:outline-none"
                                        value={food.quantity}
                                        onChange={(e) => updateFood(food.id, "quantity", e.target.value)}>
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
                                            className="w-full border rounded px-2 py-1 focus:outline-none"
                                            value={food.expiry}
                                            onChange={(e) => updateFood(food.id, "expiry", e.target.value)}
                                        />
                                    </td>
                                    <td className="border-r px-4 py-2">
                                        <select 
                                        className="w-full border rounded px-2 py-1 focus:outline-none"
                                        value={food.category}
                                        onChange={(e) => updateFood(food.id, "category", e.target.value)}>
                                            <option value="冷蔵庫">冷蔵庫</option>
                                            <option value="冷凍庫">冷凍庫</option>
                                            <option value="野菜室">野菜室</option>
                                            <option value="パントリー">パントリー</option>
                                        </select>
                                    </td>
                                    <td className="px-2 py-2 text-center">
                                        <button
                                        className="text-center bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400"
                                        onClick={()=>deleteFood(food.id)}
                                        >削除</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <button 
                    className="text-center rounded-md bg-red-200 px-8 py-3 w-32 text-lg hover:bg-red-400"
                    onClick={handleAddFood}
                    >+ 追加</button>
                    <button 
                    className="text-center rounded-md ml-20 bg-blue-200 px-8 py-3 w-32 text-lg hover:bg-blue-400"
                    onClick={handleRegisterAll}
                    >登録</button>
                </div>
            </main>
            <footer className="bg-gray-100 border-t mt-10"> 
                <div className="max-w-[1200px] mx-auto py-4 text-center text-sm text-gray-500">© 2026 Food Stock App</div>
            </footer>
        </div>
    )
}