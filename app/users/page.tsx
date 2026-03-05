"use client";

import Link from "next/link";

export default function User () {
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

            <main className="max-w-[1000px] mx-auto mt-20 mb-10 ml-10">
                <div className="max-w-[600px] mx-auto">
                    <h2 className="text-2xl font-bold mb-4">👤ユーザー情報</h2>
                    <ul className="space-y-4 text-xl mt-10">
                        <li className="flex space-x-4">
                            <span className="w-40 font-bold text-gray-600">ID</span>
                            <p>A123</p>
                        </li>
                        <li className="flex space-x-4">
                            <span className="w-40 font-bold text-gray-600">氏名</span>
                            <p>xx xx</p>
                        </li>
                        <li className="flex space-x-4">
                            <span className="w-40 font-bold text-gray-600">メールアドレス</span>
                            <p>yyyy@zzzz.com</p>
                        </li>
                        <li className="flex space-x-4">
                            <span className="w-40 font-bold text-gray-600">パスワード</span>
                            <p>••••••••</p>
                        </li>
                    </ul>
                    <div className="px-2 py-2 text-center">
                        <button 
                        className="text-center bg-blue-200 px-8 py-3 text-lg rounded-md mt-8">編集</button>
                    </div>
                </div>
            </main>
            <footer className="bg-lime-500 h-10 flex items-center justify-center"> ©2026 食材管理アプリ</footer>
        </div>
    )
}