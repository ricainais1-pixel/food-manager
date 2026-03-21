'use client'

import { useEffect, useState } from 'react'
import { Database } from '@/lib/database.types'
import { createBrowserClient } from '@supabase/ssr'

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const supabase = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error) return console.error(error)
      if (!user) return

      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('name,email')
        .eq('id', user.id)
        .single()

      if (profileError) return console.error(profileError)

      setUserInfo({
        name: data.name ?? '',
        email: data.email ?? '',
      })
    }
    fetchUser()
  }, [])

  return { userInfo }
}
