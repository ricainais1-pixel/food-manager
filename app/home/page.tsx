"use client";

import Link from "next/link";

export default function homePage() {
    return (
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

        <main className=" min-h-screen ">
            <section 
            className="m-20 relative w-full max-w-6xl mx-auto">
                <div
                className="absolute left-6 -top-4 bg-red-300 px-5 py-1 rounded-md shadow font-bold z-10">
                    <h2 className="text-2xl font-bold">期限通知一覧</h2>
                </div>
                <div
                className="border-2 rounded-xl p-6 pt-10 bg-white ">
                    <ul className="space-y-2">
                        <li>食材Aが1日で期限切れになります。</li>
                        <li>食材Bが1日で期限切れになります。</li>
                        <li>食材Cが3日で期限切れになります。</li>
                    </ul>
                </div>
            </section>

            <section 
            className="flex flex-wrap gap-6 mt-16 w-full max-w-6xl mx-auto items-stretch">
                <Link href="/foods" className="flex-1 min-w-[250px] max-w-[300px]">
                    <div className="border-2 p-4 rounded-2xl flex flex-col w-full h-full">
                        <img 
                        src="https://free-icons.net/wp-content/uploads/2020/02/pcsp005.png"
                        alt="食材一覧の画像"
                        className="w-full h-full object-cover"
                        />
                        <h2
                        className="text-lg font-bold text-center">食材一覧</h2>
                        {/* <p>今ある食材の一覧を確認します。</p> */}
                    </div>
                </Link>
                <Link href="/newfoods" className="flex-1 min-w-[250px] max-w-[300px]">
                    <div className="border-2 p-4 rounded-2xl flex flex-col w-full h-full">
                        <img
                        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhaKskURo7pK1NmBhyphenhyphenTMAiUqmwNLCQKZkMM-DrLQELA4Xf2e9YnBtu8K_buZvzpN2byLvYpYdUkWA62OtAI6iBt4uosOUWUIE9GPXWC2lNfejT9vM-N8qD5Hoq8RV2nPBwurnQv7Q8BzL9O/s800/food_box.png"
                        alt="食材登録の画像"
                        className="w-full h-full object-cover"/>
                        <h2
                        className="text-lg font-bold text-center">食材登録</h2>
                        {/* <p>新たに食材を登録します。</p> */}
                    </div>
                </Link>
                <Link href="/shopping" className="flex-1 min-w-[250px] max-w-[300px]">
                    <div className="border-2 p-4 rounded-2xl flex flex-col w-full h-full">
                        <img 
                        src="https://free-icons.net/wp-content/uploads/2020/01/shopping003.png"
                        alt="購入リストの画像"
                        className="w-full h-full object-cover"/>
                        <h2
                        className="text-lg font-bold text-center">購入リスト</h2>
                        {/* <p>購入リストを確認します。</p> */}
                    </div>
                </Link>
                <Link href="/users" className="flex-1 min-w-[250px] max-w-[300px]">
                    <div className="border-2 p-4 rounded-2xl flex flex-col w-full h-full">
                        <img 
                        src="https://free-icons.net/wp-content/uploads/2021/01/symbol047.png"
                        alt="ユーザー設定の画像"
                        className="w-full h-full object-cover"/>
                        <h2
                        className="text-lg font-bold text-center">ユーザー設定</h2>
                        {/* <p>ユーザ情報を確認・編集します。</p> */}
                    </div>
                </Link>
            </section>
        </main>
        <footer className="bg-lime-500 h-10 flex items-center justify-center"> ©2026 食材管理アプリ</footer>
    </div>
);
}