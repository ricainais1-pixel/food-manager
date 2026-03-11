"use client";

import { useMemo, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import {useForm,SubmitHandler} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link"
import Loading from "../app/loading"
import * as z from 'zod'
import type { Database } from "@/lib/database.types"
type Schema = z.infer<typeof schema>

const schema = z.object({
    name:z.string().min(2,{message:'2文字以上入力する必要があります。'}),
    email:z.string().email({message:'メールアドレスの形式ではありません。'}),
    password:z.string().min(8,{message:'8文字以上入力する必要があります。'}),
})

// サインアップページ
const Register = () =>{
    const router = useRouter()

    const supabase = useMemo(() => {
        return createBrowserClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
    }, [])


    const [loading,setLoading] = useState(false)
    const [message,setMessage] =useState('')


    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    }=useForm({
        // 初期値
        defaultValues:{name:'',email:'',password:''},
        // 入力値の検証
        resolver:zodResolver(schema),
    })

    // 送信
    const onSubmit:SubmitHandler<Schema> = async (data)=>{
        setLoading(true)

        try {
            // サインアップ
            const {error :errorSignup} = await supabase.auth.signUp({
                email:data.email,
                password:data.password,
                options:{
                    emailRedirectTo: `${location.origin}/auth/callback`
                }
            })

            // エラーチェック
            if ( errorSignup ) {
                setMessage('エラーが発生しました。' + errorSignup.message)
                return
            }

            // プロフィールの名前を更新
            const {error:updateError} = await supabase
            .from('profiles')
            .update({name:data.name})
            .eq('email',data.email)

            if ( updateError ) {
                setMessage('エラーが発生しました。' + updateError.message)
                return
            }

            // 入力フォームクリア
            reset ()
            setMessage(
                '本登録用のURLを記載したメールを送信しました。メールをご確認の上、メール本文中のURLをクリックして本登録を行ってください。'
            )

        }catch (error) {
            setMessage('エラーが発生しました。' + error)
            return
        }finally {
            setLoading(false)
            router.refresh()
        }

    }
    

    return (
        <div className="max-w-[1400px] mx-auto mt-20 mb-10 px-6 flex-1">
            <div className="text-2xl font-bold mb-8 text-center">サインアップ</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* 名前 */}
                <div className="mb-3">
                    <input 
                        type="text" 
                        id="name"
                        placeholder="名前" 
                        {...register("name")}
                        className="mb-1 font-semibold"
                    />
                    <div className="my-3 text-center text-sm text-red-500">{errors.name?.message}</div>
                </div>

                {/* メールアドレス */}
                <div className="mb-3">
                    <input 
                        type="email" 
                        id="email"
                        placeholder="メールアドレス" 
                        className="mb-1 font-semibold"
                        {...register('email',{required:true})}
                    />
                    <div className="my-3 text-center text-sm text-red-500">{errors.email?.message}</div>
                </div>

                {/* パスワード */}
                <div className="mb-3">
                    <input 
                        type="password" 
                        id="password"
                        placeholder="パスワード" 
                        className="mb-1 font-semibold"
                        {...register('password',{required:true})}
                    />
                    <div className="my-3 text-center text-sm text-red-500">{errors.password?.message}</div>
                </div>

                {/* サインアップ */}
                <div className="mb-5">
                    {loading ? (
                        <Loading />
                    ) : (
                        <button
                        type="submit"
                        className="text-center rounded-md bg-red-200 px-8 py-3 w-32 text-lg hover:bg-red-400">
                            サインアップ
                        </button>
                    )}
                </div>
            </form>

            {message && <div className="mt-4 text-red-500">{message}</div>}

            <div className="mt-4">
                <Link href="/signin" className="text-gray-500 font-bold">
                    ログインはこちら
                </Link>
            </div>

        </div>
    )
}

export default Register


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