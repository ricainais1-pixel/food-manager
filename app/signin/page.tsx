"use client";
import Link from "next/link";

export default function Signin () {
    const handleLoginClick = () => {
        // ログイン処理をここに実装
        console.log("ログインボタンがクリックされました");
    }
    return(
        <div className="min-h-screen flex flex-col">
            <header 
            className="flex justify-between items-center p-4 bg-lime-500">
                <h1 className="text-4xl font-bold  text-gray-200">食材ストック管理</h1>
                <nav>
                    <ul className="flex text-lg font-bold ">
                        <li className="mr-3">
                            <button
                            className="text-center bg-gray-200 text-lg rounded-md px-4 py-2 hover:bg-lime-200">
                                <Link href="/register">新規登録</Link>
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="max-w-[1400px] mx-auto mt-40 mb-10 px-6 flex-1">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center">ログイン画面</h2>
                    <ul className="max-w-md mx-auto space-y-6">
                        <li>
                            <h3 className="mb-2 font-semibold text-xl">ID</h3>
                            <input 
                            type="text" 
                            placeholder="ID入力" 
                            className="border rounded px-4 py-2 w-full h-12 text-lg focus:outline-none focus:ring-0"
                            />
                        </li>
                        <li>
                            <h3 className="mb-2 font-semibold text-xl">パスワード</h3>
                            <input 
                            type="text" 
                            placeholder="パスワード入力" 
                            className="border rounded px-4 py-2 w-full h-12 text-lg focus:outline-none focus:ring-0"
                            />
                        </li>
                    </ul>
                        
                    <div className="flex justify-center mt-8">
                        <button
                        onClick={handleLoginClick}
                        className="text-center rounded-md bg-red-200 px-8 py-3 w-32 text-lg hover:bg-red-400">
                            ログイン
                        </button>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-100 border-t mt-10"> 
                <div className="max-w-[1200px] mx-auto py-4 text-center text-sm text-gray-500">© 2026 Food Stock App</div>
            </footer>
        </div>
    )
}