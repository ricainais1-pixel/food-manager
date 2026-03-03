export default function Register () {
    return(
        <div>
            <header>
                <h1>食材ストック管理</h1>
                <nav>
                    <ul className="flex">
                        <li>ホーム</li>
                        <li>食材一覧</li>
                        <li>登録</li>
                        <li>購入リスト</li>
                        <li>ユーザー設定</li>
                    </ul>
                </nav>

            </header>
            <div>
                <h2>新規登録フォーム</h2>
                <ul>
                    <li>
                        <input type="text" placeholder="氏名" />
                    </li>
                    <li>
                        <input type="text" placeholder="メールアドレス" />
                    </li>
                    <li>
                        <input type="text" placeholder="ID" />
                        <p>半角英数字4文字以上</p>
                    </li>
                    <li>
                        <input type="text" placeholder="パスワード" />
                        <p>半角英数字8文字以上</p>
                    </li>
                    
                </ul>
                <button>登録</button>
            </div>
        </div>
    )
}