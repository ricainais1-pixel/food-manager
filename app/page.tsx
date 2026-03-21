import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "../lib/database.types"
import { redirect } from "next/navigation"

export default async function Page() {

   const cookieStore = await cookies()

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
   } = await supabase.auth.getSession()

   if (!session) {
      redirect("/signin")
   }

   return (
      <div>
         {session ? <div>ログイン済み</div> : <div>未ログイン</div>}
      </div>
   )
}