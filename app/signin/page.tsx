"use client";
import Link from "next/link";

export default function Signin () {
    const handleLoginClick = () => {
        // ログイン処理をここに実装
        console.log("ログインボタンがクリックされました");
    }
    return(
        <div>
            <header className="flex justify-between items-center p-4">
                <h1 className="text-3xl font-bold ">食材ストック管理</h1>
                <nav>
                    <ul className="flex text-lg font-bold ">
                        <li className="mr-3">
                            <Link href="/home">ホーム</Link>
                        </li>
                        <li className="mr-3">
                            <Link href="/foods">食材一覧</Link>
                        </li>
                        <li className="mr-3">
                            <Link href="/newfoods">食材登録</Link>
                        </li>
                        <li className="mr-3">
                            <Link href="/shopping">購入リスト</Link>
                        </li>
                        <li className="mr-3">
                            <Link href="/users">ユーザー設定</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className=" w-full p-10 min-h-screen">
                <div className="flex flex-col justify-center items-center mt-35">
                    <input 
                    type="text" 
                    placeholder="ID入力" 
                    className="w-52 border-1 rounded cursor-none h-10 mb-3"
                    />
                    <input 
                    type="text" 
                    placeholder="パスワード入力" 
                    className="w-52 border-1 rounded cursor-none h-10"
                    />
                    <button
                    className="p-2 mt-4 w-32 rounded-md bg-lime-300 font-bold"
                    onClick={handleLoginClick}
                    >ログイン</button>
                </div>
            </main>
        </div>
    )
}