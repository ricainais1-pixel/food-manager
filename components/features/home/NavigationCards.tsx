import Link from "next/link";

export default function NavigationCards() {
    return(
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
    )
};