"use client";

import RegisterForm from "@/components/features/auth/components/RegisterForm";


// サインアップページ
export default function RegisterPage() {
    return (
        <div className="max-w-[1400px] mx-auto mt-20 mb-10 px-6 flex-1">
        {/* <h1 className="text-2xl font-bold mb-8 text-center">サインアップ</h1> */}
        <RegisterForm />
        </div>
    );
}


// export default function Register () {
//     return(
//         <div className="min-h-screen flex flex-col">
//             {/* <header 
//             className="flex justify-between items-center p-4 bg-lime-500">
//                 <h1 className="text-4xl font-bold  text-gray-200">食材ストック管理</h1>
//                 <nav>
//                     <ul className="flex text-lg font-bold ">
//                         <li className="mr-3">
//                             <button
//                             className="text-center bg-gray-200 text-lg rounded-md px-4 py-2 hover:bg-lime-200 ">
//                                 <Link href="/signin">ログイン画面</Link>
//                             </button>
//                         </li>
//                     </ul>
//                 </nav>
//             </header> */}

//             <div>
//                 <main className="max-w-[1400px] mx-auto mt-20 mb-10 px-6 flex-1">
//                     <h1 className="text-2xl font-bold mb-8 text-center">新規登録</h1>
//                     <form className="max-w-md mx-auto space-y-6">
//                         <div>
//                             <h3 className="mb-1 font-semibold">氏名</h3>
//                             <input 
//                             type="text" 
//                             placeholder="氏名" 
//                             className="border rounded px-2 py-1 w-full h-10 focus:outline-none focus:ring-0"/>
//                         </div>
//                         <div>
//                             <h3 className="mb-1 font-semibold">メールアドレス</h3>
//                             <input 
//                             type="text" 
//                             placeholder="メールアドレス" 
//                             className="border rounded px-2 py-1 w-full h-10 focus:outline-none focus:ring-0"/>
//                         </div>
//                         <div>
//                             <h3 className="mb-1 font-semibold">パスワード</h3>
//                             <input 
//                             type="text" 
//                             placeholder="パスワード" 
//                             className="border rounded px-2 py-1 w-full h-10 focus:outline-none focus:ring-0"/>
//                             <p>(半角英数字8文字以上)</p>
//                         </div>
                        
//                     </form>
//                     <div className="flex justify-center mt-8">
//                         <button
//                         className="text-center rounded-md bg-red-200 px-8 py-3 w-32 text-lg hover:bg-red-400">
//                             登録
//                         </button>
//                     </div>
//                 </main>
//             </div>
//             <footer className="bg-gray-100 border-t mt-10"> 
//                 <div className="max-w-[1200px] mx-auto py-4 text-center text-sm text-gray-500">© 2026 Food Stock App</div>
//             </footer>
//         </div>
//     )
// }