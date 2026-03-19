'use server'

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

export const SupabaseListener = async () => {
    const cookieStore = await cookies();
    
    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {return cookieStore.getAll()},
                setAll() {}
            },
        },
    );

    const {data: { session },} = await supabase.auth.getSession();

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

    return { session, profile };
}
