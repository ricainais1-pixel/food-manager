"use client";
// ログイン画面の実装
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from "next/link";
import Loading from "../../loading";
import * as z from 'zod'

// 入力データの検証ツールを定義
const schema = z.object({
    email: z.string().email({ message: 'メールアドレスの形式ではありません' }),
    password: z.string().min(6, { message: '6文字以上入力する必要があります' }),
})

type Schema = z.infer<typeof schema>

// ログインページ
export default function Login() {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        // 初期値
        defaultValues: { email: '', password: '' },
        // 入力値の検証
        resolver: zodResolver(schema),
    })

    // 送信
    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)

        try {
            // supabaseのログイン
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password
            })
            // エラーチェック
            if (error) {
                setMessage('エラーが発生しました。' + error.message)
                return
            }

            // トップページに移動
            router.push('/home')
        } catch (error) {
            setMessage('エラーが発生しました。' + error)
            return
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-[1400px] mx-auto mt-20 mb-10 px-6 flex-1">
            <div className="text-2xl font-bold mb-6 text-center">ログイン</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* メールアドレス */}
                <div>
                    <input
                        type="email"
                        id="email"
                        placeholder="メールアドレス"
                        className="border rounded px-4 py-2 w-full h-12 text-lg focus:outline-none focus:ring-0"
                        {...register('email', { required: true })}
                    />
                    <div className="my-3 text-sm text-red-500">{errors.email?.message}</div>
                </div>

                {/* パスワード */}
                <div>
                    <input
                        type="password"
                        id="password"
                        placeholder="パスワード"
                        className="border rounded px-2 py-1 w-full h-10 focus:outline-none focus:ring-0"
                        {...register('password', { required: true })}
                    />
                    <div className="my-3 text-sm text-red-500">{errors.password?.message}</div>
                </div>

                {/* ログインボタン */}
                <div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <button
                            type="submit"
                            className="text-center rounded-md bg-sky-500 px-8 py-3 w-32 text-lg hover:bg-sky-200"
                        >
                            ログイン
                        </button>
                    )}
                </div>
            </form>

            {/* エラーメッセージ */}
            {message && <div className="mt-4 text-red-500">{message}</div>}

            {/* サインアップページへのリンク */}
            <div className="mt-4">
                <Link href="/register" className="text-gray-500 font-bold">新しいアカウントを作成</Link>
            </div>
        </div>
    )
}
