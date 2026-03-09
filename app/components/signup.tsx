'use client'

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import {useForm,SubmitHandler} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link"
import Loading from "../loading"
import * as z from 'zod'
import type { Database } from "@/lib/database.types"
type Schema = z.infer<typeof schema>

const schema = z.object({
    name:z.string().min(2,{message:'2文字以上入力する必要があります。'}),
    email:z.string().email({message:'メールアドレスの形式ではありません。'}),
    password:z.string().min(8,{message:'8文字以上入力する必要があります。'}),
})

// サインアップページ
const Signup = () =>{
    const router = useRouter()
    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
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
        <div className="max-w-[400px] mx-auto">
            <div className=" text-center font-bold text-xl mb-10">サインアップ</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* 名前 */}
                <div className="mb-3">
                    <input 
                        type="text" 
                        id="name"
                        placeholder="名前" 
                        {...register("name")}
                        className="border rounded px-2 py-1 w-full h-10 focus:outline-none focus:ring-0"
                    />
                    <div className="my-3 text-center text-sm text-red-500">{errors.name?.message}</div>
                </div>

                {/* メールアドレス */}
                <div className="mb-3">
                    <input 
                        type="email" 
                        id="email"
                        placeholder="メールアドレス" 
                        className="border rounded px-2 py-1 w-full h-10 focus:outline-none focus:ring-0"
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
                        className="border rounded px-2 py-1 w-full h-10 focus:outline-none focus:ring-0"
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
                        className="text-center rounded-md bg-sky-500 px-8 py-3 w-32 text-lg hover:bg-sky-200">
                            サインアップ
                        </button>
                    )}
                </div>
            </form>

            {message && <div className="mt-4 text-red-500">{message}</div>}

            <div className="mt-4">
                <Link href="/signup" className="text-gray-500 font-bold">
                    ログインはこちら
                </Link>
            </div>

        </div>
    )
}

export default Signup