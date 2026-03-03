export default function Shopping () {
    return(
        <div>
            <header className="flex">
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

            <main>
                <h2>購入リスト</h2>
                <div>
                    <ul>
                        <li>卵
                            <select>
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </li>
                            <button>削除</button>
                        <li>牛乳
                            <select>
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <button>削除</button>
                        </li>
                    </ul>
                    <div>
                        <input placeholder="食材名" />
                        <select>
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <button>追加</button>
                    </div>
                </div>
                <button>購入済み</button>
            </main>
        </div>
    )
}