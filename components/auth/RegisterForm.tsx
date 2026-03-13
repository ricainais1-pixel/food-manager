"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import Link from "next/link";
import { useRegister } from "../hooks/useRegister";

const schema = z.object({
    name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
    email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
    password: z.string().min(8, { message: "8文字以上入力する必要があります。" }),
});
type Schema = z.infer<typeof schema>;

export default function RegisterForm() {
    const { registerUser, loading, message } = useRegister();


    const { register, handleSubmit, formState: { errors }, reset } = useForm<Schema>({
        defaultValues: { name: "", email: "", password: "" },
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        const success = await registerUser(data);
        if (success) reset(); 
    };


    return (
        <div className="max-w-[1400px] mx-auto mt-20 mb-10 px-6 flex-1">
        <div className="text-2xl font-bold mb-8 text-center">サインアップ</div>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* 名前 */}
            <InputField
            type="text"
            id="name"
            placeholder="名前"
            register={register("name")}
            error={errors.name?.message}
            className="mb-3 font-semibold"
            />

            {/* メールアドレス */}
            <InputField
            type="email"
            id="email"
            placeholder="メールアドレス"
            register={register("email")}
            error={errors.email?.message}
            className="mb-3 font-semibold"
            />

            {/* パスワード */}
            <InputField
            type="password"
            id="password"
            placeholder="パスワード"
            register={register("password")}
            error={errors.password?.message}
            className="mb-3 font-semibold"
            />

            {/* サインアップボタン */}
            <div className="mb-5">
            <Button
                type="submit"
                loading={loading}
                className="text-center rounded-md bg-red-200 px-8 py-3 w-32 text-lg hover:bg-red-400"
            >
                サインアップ
            </Button>
            </div>
        </form>

        {message && <div className="mt-4 text-red-500">{message}</div>}

        <div className="mt-4">
            <Link href="/signin" className="text-gray-500 font-bold">
            ログインはこちら
            </Link>
        </div>
        </div>
    );
}