export default function User () {
    return(
        <div>
            <header 
            className="flex justify-between items-center p-4">
                <h1 
                className="text-2xl font-bold ">食材ストック管理</h1>
                <nav>
                    <ul className="flex text-lg font-bold ">
                        <li>ホーム</li>
                        <li>食材一覧</li>
                        <li>登録</li>
                        <li>購入リスト</li>
                        <li>ユーザー設定</li>
                    </ul>
                </nav>
            </header>

            <main className=" w-full mx-auto p-10 min-h-screen">
                <h2>ユーザー情報</h2>
                <ul>
                    <li>ID</li>
                    <li>氏名</li>
                    <li>メールアドレス</li>
                    <li>パスワード</li>
                </ul>
                <button>ユーザー情報編集</button>
            </main>
        </div>
    )
}