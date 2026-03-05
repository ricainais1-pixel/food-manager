"use client";

import Link from "next/link";

export default function NewFoodPage () {
    return(
        <div>
            <header 
                className="flex justify-between items-center p-4 bg-lime-500">
                <h1 className="text-4xl font-bold  text-gray-200">食材ストック管理</h1>
                <nav>
                    <ul 
                    className="flex text-lg font-bold space-x-4 text-gray-200">
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

            <main className="max-w-[1000px] mx-auto mt-20 mb-10">
                <div >
                    <h2 className="text-2xl font-bold mb-4">📋食材登録</h2>
                    <table className="w-full border-2 border-gray-400 table-fixed">
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
                            <tr>
                                <td className="border-r px-4 py-2">
                                    <input 
                                    type="text" 
                                    placeholder="食材名"
                                    className="w-full border rounded px-2 py-1 focus:outline-none"/>
                                </td>
                                <td className="border-r px-4 py-2">
                                    <select className="w-full border rounded px-2 py-1 focus:outline-none">
                                        <option value="1" selected>1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </td>
                                <td className="border-r px-4 py-2">
                                    <select className="w-full border rounded px-2 py-1 focus:outline-none">
                                        <option value="1日">1日</option>
                                        <option value="3日">3日</option>
                                        <option value="7日" selected>7日</option>
                                        <option value="2週間">2週間</option>
                                        <option value="1か月">1か月</option>
                                        <option value="3か月">3か月</option>
                                        <option value="6か月">6か月</option>
                                        <option value="詳細設定">詳細設定</option>
                                    </select>
                                </td>
                                <td className="border-r px-4 py-2">
                                    <select className="w-full border rounded px-2 py-1 focus:outline-none">
                                        <option value="冷蔵庫" selected>冷蔵庫</option>
                                        <option value="冷凍庫">冷凍庫</option>
                                        <option value="野菜室">野菜室</option>
                                        <option value="パントリー">パントリー</option>
                                    </select>
                                </td>
                                <td className="px-2 py-2 text-center">
                                    <button
                                    className="text-center bg-gray-300 px-2 py-1 rounded-md">削除</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <button 
                    className="text-center px-2 py-1 rounded-md bg-red-200 px-8 py-3 w-32 text-lg"
                    >+ 追加</button>
                    <button 
                    className="text-center px-2 py-1 rounded-md ml-20 bg-blue-200 px-8 py-3 w-32 text-lg"
                    >登録</button>
                </div>
            </main>
            <footer className="bg-lime-500 h-10 flex items-center justify-center"> ©2026 食材管理アプリ</footer>
        </div>
    )
}