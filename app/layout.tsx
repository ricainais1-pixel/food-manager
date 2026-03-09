import './globals.css'
import { Inter } from 'next/font/google'
import SupabaseListener from './components/supabase-listener'

const inter = Inter({ subsets: ['latin'] })

  export const metadata = {
  title: 'Supabase Auth',
  description: 'Supabase Auth',
}

// レイアウト
export default function RootLayout ({children,}: {children: React.ReactNode}) {
  return (
    <html lang="ja">
      <body>
        <SupabaseListener />
        {children}
      </body>
    </html>
  )
}