export default function NewFoodPage () {
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
                <h2>食材登録</h2>
                <table>
                    <tr>
                        <th>食材</th>
                        <th>個数</th>
                        <th>期限</th>
                        <th>カテゴリー</th>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" placeholder="食材名"/>
                        </td>
                        <td>
                            <select>
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </td>
                        <td>
                            <select>
                                <option value="1日">1日</option>
                                <option value="3日">3日</option>
                                <option value="7日" selected>7日</option>
                                <option value="2週間">2週間</option>
                                <option value="1か月">1か月</option>
                                <option value="3か月">3か月</option>
                                <option value="6か月">6か月</option>
                                <option value="詳細設定">詳細設定</option>
                            </select>
                        </td>
                        <td>
                            <select>
                                <option value="冷蔵庫" selected>冷蔵庫</option>
                                <option value="冷凍庫">冷凍庫</option>
                                <option value="野菜室">野菜室</option>
                                <option value="パントリー">パントリー</option>
                            </select>
                        </td>
                        <td>
                            <button>削除</button>
                        </td>
                    </tr>
                </table>
                <div>
                    <button>+ 追加</button>
                </div>
                <button>登録</button>
            </main>
        </div>
    )
}