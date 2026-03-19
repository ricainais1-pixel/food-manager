'use client'

import Button from "@/components/common/Button";
import { useProfileForm } from "../hooks/useProfileForm"

const Profile = () => {
    const { form, onSubmit, loading,handleBack } = useProfileForm();

    const {register,handleSubmit,formState:{errors},}=form;

    
    return (
        <div className="min-h-screen flex flex-col">
            <div>
                <h2 className="text-2xl font-bold mb-10 text-left">👤ユーザー情報編集画面</h2>
                <form 
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-lg mx-auto">
                    <div className="mb-5">
                        <h3 className="text-lg mb-1 font-bold">名前</h3>
                        <input 
                            type="text" 
                            id="name"
                            placeholder="名前" 
                            {...register("name")}
                            className="border rounded px-2 py-1 w-full h-10 focus:outline-none focus:ring-0"
                        />
                        <div className="my-3 text-center text-sm text-red-500">{errors.name?.message}</div>
                    </div>

                <div className="mb-5">
                    <h3 className="text-lg mb-1 font-bold">メールアドレス</h3>

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

                <div className="mb-5">
                    <div className="flex items-center mb-1">
                        <h3 className="text-lg mb-1 font-bold">パスワード</h3>
                        <p className="color-red ml-6">※8文字以上の英数字を入力</p>
                    </div>

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

                </form>
                <div className="flex justify-center space-x-14 mt-4 gap-4 sm:gap-6 md:gap-8">
                    <Button
                        className=" bg-lime-300 px-8 py-3  hover:bg-lime-500"
                        disabled={loading}
                        onClick={handleSubmit(onSubmit)}
                    >
                        保存
                    </Button>
                    <Button
                        className=" bg-gray-300 px-8 py-3  hover:bg-gray-500"
                        onClick={handleBack}
                    >
                        戻る
                    </Button>
                </div>
            </div>
        </div>
    )

}

export default Profile