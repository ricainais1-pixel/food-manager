import './globals.css'
import { Inter } from 'next/font/google'
import { SupabaseListener } from '@/components/supabase-listener'
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/lib/database.types"
import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'おうちストック',
  description: 'おうちの食材管理アプリ',
}

//  レイアウト
export default async function RootLayout ({children,}: {children: React.ReactNode}) {
  const cookieStore = await cookies();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        )
      }
    }
  }
  );


  //  セッション情報の取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  //  プロフィールの取得
  let profile = null

  if (session) {
    const {data:currentProfile} = await supabase
      .from('profiles')
      .select('*')
      .eq('id',session.user.id)
      .single()

    profile = currentProfile

    //  メールアドレスを変更した場合、プロフィールを更新
    if (currentProfile && currentProfile.email !== session.user.email){
      //  メールアドレスを更新
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
        {/* ヘッダー */}
        <Header />

        {/* メインコンテンツ */}
        <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 pt-24 pb-10 ">
          {children}
        </main>

        {/* フッター */}
        <Footer />
      </body>
    </html>
  )
};