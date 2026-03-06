"use client";
import Link from "next/link";

export default function Signin () {
    const handleLoginClick = () => {
        // ログイン処理をここに実装
        console.log("ログインボタンがクリックされました");
    }
    return(
        <div>
            <header 
            className="flex justify-between items-center p-4 bg-lime-500">
                <h1 className="text-4xl font-bold  text-gray-200">食材ストック管理</h1>
                <nav>
                    <ul className="flex text-lg font-bold ">
                        <li className="mr-3">
                            <button
                            className="text-center bg-gray-200 text-lg rounded-md px-4 py-2">
                                <Link href="/home">新規登録</Link>
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="max-w-[1000px] mx-auto mt-20 mb-10">
                <h2 className="text-2xl font-bold mb-4 text-center">ログイン画面</h2>
                <div className="flex flex-col justify-center items-center mt-35">
                    <div className="flex flex-col ">
                        <input 
                        type="text" 
                        placeholder="ID入力" 
                        className="w-52 border-1 rounded cursor-none h-10 border border-gray-400 mb-3 focus:outline-none"
                        />
                        <input 
                        type="text" 
                        placeholder="パスワード入力" 
                        className="w-52 border-1 rounded cursor-none h-10 border border-gray-400 mb-3 focus:outline-none"
                        />
                        </div>
                    <button
                    className="p-2 mt-4 w-32 rounded-md bg-orange-300 font-bold"
                    onClick={handleLoginClick}
                    >ログイン</button>
                </div>
            </main>
        <footer className="bg-lime-500 h-10 flex items-center justify-center"> ©2026 食材管理アプリ</footer>
        </div>
    )
}