"use client";

import Link from "next/link";

export default function homePage() {
    return (
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
        <section className="border-2 mb-10">
            <h2 className="text-2xl font-bold">期限通知一覧</h2>
            <ul >
                <li>食材Aが1日で期限切れになります。</li>
                <li>食材Bが1日で期限切れになります。</li>
                <li>食材Cが3日で期限切れになります。</li>
            </ul>
        </section>

        <section className="flex border-2 ">
            <Link href="/foods">
                <div className="border-2 p-4 m-4">
                    <div>画像挿入予定</div>
                    <h2>食材一覧</h2>
                    <p>今ある食材の一覧を確認できます。</p>
                </div>
            </Link>
            <Link href="/newfoods">
                <div className="border-2 p-4 m-4">
                    <div>画像挿入予定</div>
                    <h2>登録</h2>
                    <p>新たに食材を登録します。</p>
                </div>
            </Link>
            <Link href="/shopping">
                <div className="border-2 p-4 m-4">
                    <div>画像挿入予定</div>
                    <h2>購入リスト</h2>
                    <p>購入リストを確認します。</p>
                </div>
            </Link>
            <Link href="/users">
                <div className="border-2 p-4 m-4">
                    <div>画像挿入予定</div>
                    <h2>ユーザー設定</h2>
                    <p>ユーザ情報を確認・編集できます。</p>
                </div>
            </Link>
        </section>
    </main>
    <footer className="bg-gray-200 p-4 text-center"> ©2026 食材管理アプリ</footer>
    </div>
);
}