'use client'

// ユーザー情報の変更
import { useState,useCallback,useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import {useForm,SubmitHandler} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'
import type { Database } from "@/lib/database.types"
import useStore from "@/store";
type Schema = z.infer<typeof schema>

// 入力データの検証ツールを定義
const schema = z.object({
    name: z.string().min(2,{message:'2文字以上入力する必要があります。'}),
    introduce: z.string(),
    email: z.string().email("メールアドレスが正しくありません"),
    password: z.string().min(8,"パスワードは8文字以上").optional(),
})

// プロフィール
const Profile = () => {
    const router = useRouter()
    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const [loading,setLoading] = useState(false)
    const [avatar,setAvatar] = useState<File | null>(null)
    const [message,setMessage] = useState('')
    const [fileMessage,setFileMessage] = useState('')
    const {user} =useStore()

    const {
        register,
        handleSubmit,
        formState:{errors},
    }=useForm<Schema>({

        defaultValues:{
        name: user.name ?? '',
        introduce: user.introduce ?? '',
        email: user.email ?? '',
        password: '',
        },

        resolver:zodResolver(schema),
    })


    const onSubmit:SubmitHandler<Schema> = async (data) =>{
        try{
            setLoading(true)

            const { data:userData } = await supabase.auth.getUser()

            if(!userData.user) return

            // プロフィール更新
            await supabase
            .from("profiles")
            .update({
                name:data.name,
                introduce:data.introduce
            })
            .eq("id",userData.user.id)

            // メール更新
            await supabase.auth.updateUser({
            email:data.email
            })

            // パスワード更新
            if(data.password){
            await supabase.auth.updateUser({
                password:data.password
            })
            }

            setMessage("プロフィールを更新しました")

        }catch(error){
            setMessage("エラーが発生しました")
        }finally{
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="text-center font-bold text-xl mb-10">プロフィール</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* 名前 */}
                <div className="mb-5">
                    <div className="text-sm mb-1 font-bold">名前</div>
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
                <div className="mb-5">
                    <div className="text-sm mb-1 font-bold">メールアドレス</div>

                    <input
                        type="email"
                        {...register("email")}
                        placeholder="メールアドレス"
                        className="border rounded px-2 py-1 w-full h-10"
                    />

                    <div className="my-3 text-center text-sm text-red-500">
                        {errors.email?.message}
                    </div>
                </div>

                {/* パスワード */}
                <div className="mb-5">
                    <div className="text-sm mb-1 font-bold">パスワード</div>

                    <input
                        type="password"
                        {...register("password")}
                        placeholder="新しいパスワード"
                        className="border rounded px-2 py-1 w-full h-10"
                    />

                    <div className="my-3 text-center text-sm text-red-500">
                        {errors.password?.message}
                    </div>
                </div>

                <button
                    className="bg-lime-400 hover:bg-lime-500 px-6 py-2 rounded"
                    disabled={loading}
                    >
                    保存
                </button>
            </form>
            {message && (<div className="text-center mt-4 text-green-600">{message}</div>
)}
        </div>
    )

}

export default Profile