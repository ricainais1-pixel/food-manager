import './globals.css'
import { Inter } from 'next/font/google'
import SupabaseListener from '../components/supabase-listener'
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import Navigation from '../components/Navigation/navigation'
import type { Database } from "@/lib/database.types"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Supabase Auth',
  description: 'Supabase Auth',
}

// レイアウト
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
        setAll() {}
      },
    },
  );

  // セッション情報の取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // プロフィールの取得
  let profile = null

  if (session) {
    const {data:currentProfile} = await supabase
      .from('profiles')
      .select('*')
      .eq('id',session.user.id)
      .single()

    profile = currentProfile

    // メールアドレスを変更した場合、プロフィールを更新
    if (currentProfile && currentProfile.email !== session.user.email){
      // メールアドレスを更新
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
      <body>
        <Navigation session={session} profile={profile} />
        {children}
      </body>
    </html>
  )
}