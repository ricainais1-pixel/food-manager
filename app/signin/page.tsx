import LoginForm from '@/components/features/auth/components/LoginForm'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Database } from '@/lib/database.types'

const SigninPage = async () => {
  const cookieStore = await cookies() // ReadonlyRequestCookies

  // Supabase が要求する形式に変換
  const cookieMethods = {
    getAll() {
      return cookieStore.getAll()
    },
    setAll() {},
  }

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookieMethods,
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/home')
  }

  return <LoginForm />
}

export default SigninPage
