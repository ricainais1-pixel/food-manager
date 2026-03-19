"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";


export const useLogin = () => {
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const login = async (email: string, password: string) => {
        setLoading(true);
        setMessage('');

        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setMessage('ログインに失敗しました: ' + error.message);
                return false;
            }
            return true;
            } catch (err) {
                setMessage('エラーが発生しました: ' + (err instanceof Error ? err.message : String(err)));
                return false;
            } finally {
                setLoading(false);
            }
    };


    return { login, loading, message };
};