"use client";

import { useState } from "react";
import type { Database } from "@/lib/database.types";
import { createBrowserClient } from "@supabase/ssr";

type RegisterData = {
    name: string;
    email: string;
    password: string;
};

export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    
    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const registerUser = async (data: RegisterData) => {
        setLoading(true);
        setMessage("");

        try {
        // サインアップ
        const { error: errorSignup } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: { emailRedirectTo: `${location.origin}/auth/callback` },
        });

        if (errorSignup) {
            setMessage("エラーが発生しました。" + errorSignup.message);
            return;
    }

        // プロフィール更新
        const { error: updateError } = await supabase
            .from("profiles")
            .update({ name: data.name })
            .eq("email", data.email);

        if (updateError) {
            setMessage("エラーが発生しました。" + updateError.message);
            return false;
        }

        setMessage(
            "本登録用のURLを記載したメールを送信しました。メールをご確認の上、本文中のURLをクリックして本登録を行ってください。"
        );
        } catch (error) {
            setMessage("エラーが発生しました。" + error);
            return false;
        } finally {
            setLoading(false);
        }
    };
    return { registerUser, loading, message };
};