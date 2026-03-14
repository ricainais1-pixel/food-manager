"use client";

import Link from "next/link";
import { useUserInfo } from "../hooks/useUserInfo";
import Button from "@/components/common/Button";

export default function UserInfo() {
    const { userInfo } = useUserInfo();

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
                    <h2 className="text-2xl font-bold mb-10">👤ユーザー情報</h2>
                    <div className="max-w-[500px] ml-10 mb-10">
                        <ul className="space-y-5 text-lg">
                            <li className="flex border-b pb-2">
                                <span className="w-40 font-bold text-gray-600">氏名</span>
                                <p>{userInfo?.name ?? "読み込み中..."}</p>
                            </li>
                            <li className="flex border-b pb-2">
                                <span className="w-40 font-bold text-gray-600">メールアドレス</span>
                                <p>{userInfo?.email ?? "読み込み中..."}</p>
                            </li>
                            <li className="flex border-b pb-2">
                                <span className="w-40 font-bold text-gray-600">パスワード</span>
                                <p>••••••••</p>
                            </li>
                        </ul>
                        <div className="flex justify-center mt-4">
                            <Link href="/users/edit">
                                <Button 
                                className="text-center bg-blue-200 px-8 py-3 text-lg rounded-md mt-8 hover:bg-blue-400">
                                    編集
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="bg-gray-100 border-t mt-10"> 
                <div className="max-w-[1200px] mx-auto py-4 text-center text-sm text-gray-500">© 2026 Food Stock App</div>
            </footer>
        </div>
    )
};