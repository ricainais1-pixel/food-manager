"use client";

import Link from "next/link";
import { useState,useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Food = {
    id: number;
    name: string;
    expiry: string;
};


export default function HomePage() {
    const [foods,setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchFoods() {
            const threeDaysLater = new Date(Date.now() + 3 * 86400000);

            const { data, error } = await supabase
            .from("Foods") 
            .select("*")
            .lte("expiry", threeDaysLater.toISOString());

            if (error) {
                console.error(error);
            } else if (data) {
                setFoods(data as Food[]);
            }
            setLoading(false);
            }
            fetchFoods();
    }, []);

    if (loading) return <div>読み込み中...</div>;

    
    return (
    <div className="min-h-screen flex flex-col">
            <section 
            className="m-10 relative w-full max-w-6xl mx-auto">
                
                <div
                className="absolute left-6 -top-4 bg-red-300 px-5 py-1 rounded-md shadow font-bold z-10">
                    <h2 className="text-2xl font-bold">期限通知一覧</h2>
                </div>
                <div
                className="border-2 rounded-xl p-6 pt-10 bg-white max-h-[300px] overflow-y-auto ">
                    <ul className="space-y-2 text-lg">
                        {foods.length === 0 ? (
                            <li>期限が近い食材はありません。</li>
                        ) : (
                            foods.map((food) => {
                                const expiryDate = new Date(food.expiry);
                                const today = new Date();
                                const diffDays = Math.ceil(
                                    (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                            );
                            return (
                                <li key={food.id}>
                                    {food.name} が {diffDays}日で期限切れになります。
                                </li>
                            );
                            })
                        )}
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
    </div>
);
}