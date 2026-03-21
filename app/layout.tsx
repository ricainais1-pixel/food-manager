import './globals.css'
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/lib/database.types"
import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'

export const metadata = {
  title: 'おうちストック',
  description: 'おうちの食材管理アプリ',
}

export default async function RootLayout ({children,}: {children: React.ReactNode}) {
  const cookieStore = await cookies();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
            return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
              )
            } catch {}
        }
        }
      }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let profile = null

  if (session) {
    const {data:currentProfile} = await supabase
      .from('profiles')
      .select('*')
      .eq('id',session.user.id)
      .single()

    profile = currentProfile

    if (currentProfile && currentProfile.email !== session.user.email){
      const {data:updateProfile} = await supabase
        .from('profiles')
        .update({email:session.user.email})
        .match({id:session.user.id})
        .select('*')
        .single()

      profile = updateProfile
    }
  }

  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col bg-white text-gray-800 font-sans bg-gray-50">

        <Header />

        <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 pt-24 pb-10 ">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
};