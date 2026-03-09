'use client'

//ログアウト画面の実装 
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import type { Database } from "@/lib/database.types"

const Logout = () => {

    const router = useRouter()

    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded"
        >
        ログアウト
        </button>
    )
}

export default Logout