'use client'

//ログアウト画面の実装
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import type { Database } from "@/lib/database.types"

export const useLogout = () => {

    const router = useRouter()

    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const logout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return{ logout };
};