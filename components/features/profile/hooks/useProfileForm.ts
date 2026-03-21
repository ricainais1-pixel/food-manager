'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Database } from '@/lib/database.types'
import { ProfileForm } from '../types/profileType'
import { profileSchema } from '../schema/profileSchema'
import { useRouter } from 'next/navigation'
import useStore from '@/store'

export const useProfileForm = () => {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { user } = useStore()

  const form = useForm<ProfileForm>({
    defaultValues: {
      name: user.name ?? '',
      introduce: user.introduce ?? '',
      email: user.email ?? '',
      password: '',
    },
    resolver: zodResolver(profileSchema),
  })

  const onSubmit: SubmitHandler<ProfileForm> = async (data) => {
    try {
      setLoading(true)

      const { data: userData } = await supabase.auth.getUser()

      if (!userData.user) return

      await supabase
        .from('profiles')
        .update({
          name: data.name,
          introduce: data.introduce,
        })
        .eq('id', userData.user.id)

      await supabase.auth.updateUser({
        email: data.email,
      })

      if (data.password) {
        await supabase.auth.updateUser({
          password: data.password,
        })
      }
      alert('プロフィールを更新しました')
    } catch {
      alert('エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.back()
  }

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('name,introduce,email')
        .eq('id', user.id)
        .single()

      if (error) return console.error(error)

      form.reset({
        name: data.name ?? '',
        introduce: data.introduce ?? '',
        email: data.email ?? '',
        password: '',
      })
    }
    fetchUser()
  }, [])

  return { form, onSubmit, loading, message, handleBack }
}
