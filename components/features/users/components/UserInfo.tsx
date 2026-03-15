"use client";

import Link from "next/link";
import { useUserInfo } from "../hooks/useUserInfo";
import Button from "@/components/common/Button";

export default function UserInfo() {
    const { userInfo } = useUserInfo();

    return(
        <div className="min-h-screen flex flex-col">
            <div>
                <h2 className="text-2xl font-bold mb-10">👤ユーザー情報</h2>
                <div className="flex flex-col items-center">
                    <ul className="space-y-8 text-lg w-full max-w-md">
                        <li className="flex border-b pb-2 gap-x-4">
                            <h3 className="w-40 font-bold text-gray-600">氏名</h3>
                            <p>{userInfo?.name ?? "読み込み中..."}</p>
                        </li>
                        <li className="flex border-b pb-2 gap-x-4">
                            <h3 className="w-40 font-bold text-gray-600">メールアドレス</h3>
                            <p>{userInfo?.email ?? "読み込み中..."}</p>
                        </li>
                        <li className="flex border-b pb-2 gap-x-4">
                            <h3 className="w-40 font-bold text-gray-600">パスワード</h3>
                            <p>••••••••</p>
                        </li>
                    </ul>
                    <div className="mt-6">
                        <Link href="/users/edit">
                            <Button 
                            className=" bg-blue-200 px-8 py-3  mt-8 hover:bg-blue-400">
                                編集
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};