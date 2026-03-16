import Link from "next/link";
import Image from "next/image";

export default function NavigationCards() {
    return(
        <section 
        className="flex flex-wrap gap-6 mt-16 w-full max-w-6xl mx-auto items-stretch">
            <Link href="/foods" className="flex-1 min-w-[250px] max-w-[300px]">
                <div className="border p-3 rounded-xl hover:-translate-y-1 hover:scale-105 transition duration-200">
                    <Image 
                        src="/images/refrigerator.jpg"
                        alt="食材一覧の画像"
                        width={100} 
                        height={100}
                        className="object-cover object-center"
                    />
                    <p
                    className="text-lg font-bold text-center">食材一覧</p>
                    {/* <p>今ある食材の一覧を確認します。</p> */}
                </div>
            </Link>
            <Link href="/newfoods" className="flex-1 min-w-[250px] max-w-[300px]">
                <div className="border p-3 rounded-xl hover:-translate-y-1 hover:scale-105 transition duration-200">
                    <Image
                        src="/images/food.jpg"
                        alt="食材登録の画像"
                        width={200} 
                        height={100}
                        className="object-cover object-center"
                    />
                    <p
                    className="text-lg font-bold text-center">食材登録</p>
                    {/* <p>新たに食材を登録します。</p> */}
                </div>
            </Link>
            <Link href="/shopping" className="flex-1 min-w-[250px] max-w-[300px]">
                <div className="border p-3 rounded-xl hover:-translate-y-1 hover:scale-105 transition duration-200">
                    <Image
                        src="/images/busket.jpg"
                        alt="購入リストの画像"
                        width={200} 
                        height={100}
                        className="object-cover object-center"
                    />
                    <p
                    className="text-lg font-bold text-center">購入リスト</p>
                    {/* <p>購入リストを確認します。</p> */}
                </div>
            </Link>
            <Link href="/users" className="flex-1 min-w-[250px] max-w-[300px]">
                <div className="border p-3 h-52 rounded-xl hover:-translate-y-1 hover:scale-105 transition duration-200">
                    <Image 
                        src="/images/user.jpg"
                        alt="ユーザー設定の画像"
                        width={100} 
                        height={100}  
                        className=" object-cover object-center rounded-md"
                    />
                    <p
                    className="text-lg font-bold text-center">ユーザー設定</p>
                    {/* <p>ユーザ情報を確認・編集します。</p> */}
                </div>
            </Link>
        </section>
    )
};