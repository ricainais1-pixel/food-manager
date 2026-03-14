import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";
import Profile from '@/components/features/profile/components/Profile';
import type { Database } from "@/lib/database.types";

const ProfilePage = async () => {
  const supabase = createServerClient<Database>({ cookies }); // ← 1引数でOK

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) redirect('/auth/login');

    return <Profile />;
};

export default ProfilePage;