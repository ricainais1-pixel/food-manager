'use client'

import { useState } from 'react'
import type { Database } from '@/lib/database.types'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

type RegisterData = {
  name: string
  email: string
  password: string
}

export function useRegister() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const registerUser = async (data: RegisterData) => {
    setLoading(true)
    setMessage('')

    try {
      const { error: errorSignup } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      })

      if (errorSignup) {
        setMessage('エラーが発生しました。' + errorSignup.message)
        return
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ name: data.name })
        .eq('email', data.email)

      if (updateError) {
        setMessage('エラーが発生しました。' + updateError.message)
        return false
      }

      setMessage(
        '本登録用のURLを記載したメールを送信しました。メールをご確認の上、本文中のURLをクリックして本登録を行ってください。'
      )
    } catch (error) {
      setMessage('エラーが発生しました。' + error)
      return false
    } finally {
      setLoading(false)
      router.refresh()
    }
  }
  return { registerUser, loading, message }
}
