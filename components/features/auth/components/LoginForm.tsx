'use client'

import { useLogin } from '../hooks/useLogin'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../schema/loginSchema'
import { LoginFormData } from '../types/loginType'

import Link from 'next/link'
import Loading from '@/app/loading'
import ErrorMessage from '../../../common/ErrorMessage'
import InputField from '../../../common/InputField'
import Button from '../../../common/Button'

export default function LoginForm() {
  const router = useRouter()
  const { login, loading, message } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const success = await login(data.email, data.password)
    if (success) router.push('/home')
  }

  return (
    <div className="max-w-md mx-auto mt-10 mb-6 px-6 flex-1">
      <h2 className="text-2xl font-bold mb-6 text-center">ログイン</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputField
            id="email"
            type="email"
            placeholder="メールアドレス"
            register={register('email')}
            error={errors.email?.message}
          />
        </div>

        <div>
          <InputField
            id="password"
            type="password"
            placeholder="パスワード"
            register={register('password')}
            error={errors.password?.message}
          />
        </div>

        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <div className="mb-5 flex justify-center">
              <Button type="submit" className=" bg-blue-200 px-8 py-3 w-32 hover:bg-blue-500">
                ログイン
              </Button>
            </div>
          )}
        </div>
      </form>

      <ErrorMessage message={message} />

      <div className="mt-4 flex justify-center">
        <Link href="/register" className="text-gray-500 font-bold">
          新しいアカウントを作成
        </Link>
      </div>
    </div>
  )
}
