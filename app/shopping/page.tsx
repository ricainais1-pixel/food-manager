"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

const supabase = createClient();

type Item = {
    id: number;
    name: string;
    count: number;
    user_id?: string;
};

export default function Shopping () {
    const [draftItems, setDraftItems] = useState<Item[]>([]);
    const [items,setItems] = useState <Item[]> ([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [originalItem, setOriginalItem] = useState<Item | null>(null);

    // 追加ボタン
    const handleAdd = () => {
        const newItem = {
            id: Date.now(),
            name: "",
            count: 1
        };
        setDraftItems([...draftItems, newItem]);    
    };

    // 保存ボタン
    const handleSave = async (draft: Item) => {

        if (!draft.name.trim()) {
            alert("食材名を入力してください");
            return;
        }

        const { error } = await supabase
            .from("shopping_list")
            .insert({
                name: draft.name,
                count: draft.count
            });

        if (error) {
            console.log(error);
            alert("保存失敗");
            return;
        }

        const { data } = await supabase
            .from("shopping_list")
            .select("*");

        setItems(data ?? []);
        setDraftItems(draftItems.filter(item => item.id !== draft.id));
    };

    // 追加フォームで名前入力
    const handleDraftNameChange = (id: number, value: string) => {
        setDraftItems(
            draftItems.map((item) =>
            item.id === id ? { ...item, name: value } : item
            )
        );
    };

    // 個数変更
    const handleDraftCountChange = (id: number, value: number) => {
        setDraftItems(
            draftItems.map((item) =>
            item.id === id ? { ...item, count: value } : item
            )
        );
    };

    // 保存済みの削除ボタン
    const handleDelete = async (id: number) => {
        const { error } = await supabase
            .from("shopping_list")
            .delete()
            .eq("id", id);

        if (error) {
            console.log(error);
            return;
    }

    setItems(items.filter((item) => item.id !== id));
};

    // 追加フォームの削除ボタン
    const handleDraftDelete = (id: number) => {
        setDraftItems(
            draftItems.filter((item) => item.id !== id)
        );
    };

    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase
                .from("shopping_list")
                .select("*");

            if (error) {
                console.log(error);
                return;
            }

            setItems(data ?? []);
        };

        fetchItems();

    }, []);

    const handleCountChange = (id: number, value: number) => {
        setItems(items.map(i =>
            i.id === id
                ? { ...i, count: value }
                : i
        ));
    };

    // 編集ボタン
    const handleUpdate = async (item: Item) => {
        const { error } = await supabase
            .from("shopping_list")
            .update({
                name: item.name,
                count: item.count
            })
            .eq("id", item.id);

        if (error) {
            console.log(error);
            return;
        }

        setEditingId(null);
    };

    const handleNameChange = (id: number, value: string) => {
        setItems(items.map(i =>
            i.id === id
                ? { ...i, name: value }
                : i
        ));
    };

    const handleEditCountChange = (id: number, value: number) => {
        setItems(items.map(i =>
            i.id === id
                ? { ...i, count: value }
                : i
        ));
    };

    // 戻るボタン
    const handleCancel = () => {
        if (!originalItem) return;

        setItems(prev =>
            prev.map(i =>
                i.id === originalItem.id ? originalItem : i
            )
        );

        setEditingId(null);
        setOriginalItem(null);
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
                    <h2 className="text-2xl font-bold mb-10">📝購入リスト</h2>
                    <table className="w-full border-2 border-gray-400 table-fixed mb-10">
                        <thead className="border-b-2">
                            <tr>
                                <th className="border-r px-4 py-2">食材</th>
                                <th className="border-r px-4 py-2">個数</th>
                                <th className="border-r px-4 py-2"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item)=>(
                                <tr key={item.id}>
                                    <td
                                    className="border-r px-4 py-2">
                                        {editingId === item.id ? (
                                            <input
                                                value={item.name}
                                                onChange={(e) => handleNameChange(item.id, e.target.value)}
                                                className="w-full border rounded px-2 py-1"
                                            />
                                        ) : (
                                            item.name
                                        )}
                                    </td>
                                    <td
                                    className="border-r px-4 py-2">
                                        {editingId === item.id ? (
                                            <select
                                                value={item.count}
                                                className="w-full border rounded px-2 py-1"
                                                onChange={(e) => handleEditCountChange(item.id, Number(e.target.value))}
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </select>
                                        ) : (
                                            item.count
                                        )}
                                    </td>
                                    <td className="px-2 py-2 text-center">
                                        <div className="flex justify-center gap-4">
                                            {editingId === item.id ? (
                                                <>
                                                    <button
                                                        className="text-center bg-green-300 px-2 py-1 rounded-md hover:bg-green-400"
                                                        onClick={() => handleUpdate(item)}
                                                    >
                                                        保存
                                                    </button>
                                                    <button
                                                        className="text-center bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400"
                                                        onClick={() => handleCancel()}
                                                    >
                                                        戻る
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="bg-blue-300 px-2 py-1 rounded-md hover:bg-blue-400"
                                                        onClick={() => {
                                                            setEditingId(item.id);
                                                            setOriginalItem(item);
                                                        }}
                                                    >
                                                        編集
                                                    </button>

                                                    <button
                                                        className="bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        削除
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            
                            {draftItems.map((draft) => (
                                <tr key={draft.id}>
                                    <td className="border-r px-4 py-2">
                                        <input 
                                        placeholder="食材名" 
                                        value={draft.name}
                                        onChange={(e) =>
                                            handleDraftNameChange(draft.id, e.target.value)}
                                        className="w-full border rounded px-2 py-1"/>
                                    </td>
                                    <td className="border-r px-4 py-2">
                                        <select
                                        className="w-full border rounded px-2 py-1 focus:outline-none"
                                        value={draft.count}
                                        onChange={(e) =>
                                            handleDraftCountChange(draft.id, Number(e.target.value))
                                        }>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </td>
                                    <td className="px-2 py-2 text-center">
                                        <div className="flex justify-center gap-4">
                                            <button
                                            className="text-center bg-red-200 px-2 py-1 rounded-md hover:bg-red-400"
                                            onClick={()=>handleSave(draft)}>
                                                保存
                                            </button>
                                            <button
                                            className="text-center bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400"
                                            onClick={()=>handleDraftDelete(draft.id)}>
                                                削除
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4">
                        <button 
                        className="text-center rounded-md bg-red-200 px-8 py-3 w-32 text-lg hover:bg-red-400"
                        onClick={handleAdd}
                        >+ 追加</button>
                        <Link href="./shopping/stock-from-shopping" >
                            <button 
                            className="text-center rounded-md ml-20 bg-blue-200 px-8 py-3 text-lg whitespace-nowrap hover:bg-blue-400"
                            >在庫へ追加
                            </button>
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