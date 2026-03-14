'use client'

import { useProfileForm } from "../hooks/useProfileForm"

// プロフィール
const Profile = () => {
    const { form, onSubmit, loading, message } = useProfileForm();

    const {register,handleSubmit,formState:{errors},}=form;

    
    return (
        <div>
            <div className="text-center font-bold text-xl mb-10">ユーザー情報編集画面</div>
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

                <div>
                    <button
                        className="bg-lime-400 hover:bg-lime-500 px-6 py-2 rounded"
                        disabled={loading}
                        >
                        保存
                    </button>
                    <button>戻る</button>
                </div>
            </form>
            {message && (<div className="text-center mt-4 text-green-600">{message}</div>
)}
        </div>
    )

}

export default Profile