"use client";

import Link from "next/link";

export default function homePage() {
    return (
    <div className="min-h-screen flex flex-col">
        <header 
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
        </header>

        <main className="max-w-[1400px] mx-auto mt-10 mb-10 px-6 flex-1">
            <section 
            className="m-20 relative w-full max-w-6xl mx-auto">
                <div
                className="absolute left-6 -top-4 bg-red-300 px-5 py-1 rounded-md shadow font-bold z-10">
                    <h2 className="text-2xl font-bold">期限通知一覧</h2>
                </div>
                <div
                className="border-2 rounded-xl p-6 pt-10 bg-white ">
                    <ul className="space-y-2 text-lg">
                        <li>食材Aが1日で期限切れになります。</li>
                        <li>食材Bが1日で期限切れになります。</li>
                        <li>食材Cが3日で期限切れになります。</li>
                    </ul>
                </div>
            </section>

            <section 
            className="flex flex-wrap gap-6 mt-16 w-full max-w-6xl mx-auto items-stretch">
                <Link href="/foods" className="flex-1 min-w-[250px] max-w-[300px]">
                    <div className="border p-3 rounded-xl hover:-translate-y-1 hover:scale-105 transition duration-200">
                        <img 
                        src="https://free-icons.net/wp-content/uploads/2020/02/pcsp005.png"
                        alt="食材一覧の画像"
                        className="w-full aspect-square object-cover rounded-md"
                        />
                        <h2
                        className="text-lg font-bold text-center">食材一覧</h2>
                        {/* <p>今ある食材の一覧を確認します。</p> */}
                    </div>
                </Link>
                <Link href="/newfoods" className="flex-1 min-w-[250px] max-w-[300px]">
                    <div className="border p-3 rounded-xl hover:-translate-y-1 hover:scale-105 transition duration-200">
                        <img
                        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhaKskURo7pK1NmBhyphenhyphenTMAiUqmwNLCQKZkMM-DrLQELA4Xf2e9YnBtu8K_buZvzpN2byLvYpYdUkWA62OtAI6iBt4uosOUWUIE9GPXWC2lNfejT9vM-N8qD5Hoq8RV2nPBwurnQv7Q8BzL9O/s800/food_box.png"
                        alt="食材登録の画像"
                        className="w-full aspect-square object-cover rounded-md"/>
                        <h2
                        className="text-lg font-bold text-center">食材登録</h2>
                        {/* <p>新たに食材を登録します。</p> */}
                    </div>
                </Link>
                <Link href="/shopping" className="flex-1 min-w-[250px] max-w-[300px]">
                    <div className="border p-3 rounded-xl hover:-translate-y-1 hover:scale-105 transition duration-200">
                        <img 
                        src="https://free-icons.net/wp-content/uploads/2020/01/shopping003.png"
                        alt="購入リストの画像"
                        className="w-full aspect-square object-cover rounded-md"/>
                        <h2
                        className="text-lg font-bold text-center">購入リスト</h2>
                        {/* <p>購入リストを確認します。</p> */}
                    </div>
                </Link>
                <Link href="/users" className="flex-1 min-w-[250px] max-w-[300px]">
                    <div className="border p-3 rounded-xl hover:-translate-y-1 hover:scale-105 transition duration-200">
                        <img 
                        src="https://free-icons.net/wp-content/uploads/2021/01/symbol047.png"
                        alt="ユーザー設定の画像"
                        className="w-full aspect-square object-cover rounded-md"/>
                        <h2
                        className="text-lg font-bold text-center">ユーザー設定</h2>
                        {/* <p>ユーザ情報を確認・編集します。</p> */}
                    </div>
                </Link>
            </section>
        </main>
        <footer className="bg-gray-100 border-t mt-10"> 
            <div className="max-w-[1200px] mx-auto py-4 text-center text-sm text-gray-500">© 2026 Food Stock App</div>
        </footer>
    </div>
);
}