import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import Profile from '@/components/features/profile/components/Profile';
import type { Database } from "@/lib/database.types";

const ProfilePage = async () => {
    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) redirect('/users');

    return <Profile />;
};

export default ProfilePage;