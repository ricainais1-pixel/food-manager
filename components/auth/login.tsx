"use client";

// ログイン画面の実装
import { useLogin } from "../hooks/useLogin";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from "next/link";
import Loading from "@/app/loading";
import ErrorMessage from "../common/ErrorMessage";
import InputField from "../common/InputField";
import Button from "../common/Button";

// 入力データの検証ツールを定義
const schema = z.object({
    email: z.string().email({ message: 'メールアドレスの形式ではありません' }),
    password: z.string().min(6, { message: '6文字以上入力する必要があります' }),
})

type Schema = z.infer<typeof schema>;

// ログインページ
export default function Login() {
    const router = useRouter()
    const { login, loading, message } = useLogin();

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

    const onSubmit: SubmitHandler<Schema> = async (data) => {
    const success = await login(data.email, data.password); // useLoginフックを呼ぶ
    if (success) router.push('/home'); // 成功したらホームへ
    };


    return (
        <div className="max-w-[1400px] mx-auto mt-20 mb-10 px-6 flex-1">
            <div className="text-2xl font-bold mb-6 text-center">ログイン</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* メールアドレス */}
                <div>
                    <InputField
                        id="email"
                        type="email"
                        placeholder="メールアドレス"
                        register={register("email")}
                        error={errors.email?.message}
                    />
                    <ErrorMessage message={errors.email?.message} />
                </div>

                {/* パスワード */}
                <div>
                    <InputField
                        id="password"
                        type="password"
                        placeholder="パスワード"
                        register={register("password")}
                        error={errors.password?.message}
                    />
                    <ErrorMessage message={errors.password?.message} />
                </div>

                {/* ログインボタン */}
                <div className="mb-5">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="mb-5">
                            <Button
                                type="submit"
                                className="text-center rounded-md bg-sky-500 px-8 py-3 w-32 text-lg hover:bg-sky-200"
                            >
                                ログイン
                            </Button>
                        </div>
                    )}
                </div>
            </form>

            {/* エラーメッセージ */}
            <ErrorMessage message={message} />

            {/* サインアップページへのリンク */}
            <div className="mt-4">
                <Link href="/register" className="text-gray-500 font-bold">
                    新しいアカウントを作成
                </Link>
            </div>
        </div>
    )
}
