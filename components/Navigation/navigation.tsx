'use client'

import Link from "next/link"
import useStore from "@/store"
import { useEffect, useState } from "react"
import type { Session } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"
type ProfileType = Database['public']['Tables']['profiles']['Row']
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

const Navigation = ({
    session,
    profile
}: {
    session: Session | null
    profile: ProfileType | null
}) => {
    const { setUser } = useStore()
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }
    
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {

        setUser({
            id:session ? session.user.id:'',
            email: session?.user.email ?? '',
            name:session && profile ? profile.name:'',
            introduce:session && profile ? profile.introduce:'',
        })
},[session,setUser,profile])


    return (
        <header className="sticky top-0 bg-lime-300 border-b z-50">
            <div className="flex items-center justify-between px-8 py-5">
                <h1 className="text-xl md:text-3xl font-bold">
                    <Link href="/">食材ストック管理</Link>
                </h1>

                <nav className="hidden md:block">
                    {session ? (
                        <ul className="flex gap-6 text-lg font-medium">
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/home">ホーム</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/foods">食材一覧</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/newfoods">食材登録</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/shopping">購入リスト</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/users">ユーザー設定</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <button onClick={handleLogout}>ログアウト</button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="flex gap-6 text-lg font-medium">
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/signin">ログイン</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/register"
                                onClick={() => console.log('新規登録リンクがクリックされました')}>新規登録</Link>
                            </li>
                        </ul>
                    )}
                </nav>

                <button 
                    onClick={toggleMenu}
                    className="md:hidden text-2xl font-bold hover:text-lime-800"
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-lime-300 border-t px-8 py-4">
                    {session ? (
                        <ul className="flex flex-col gap-4 text-lg font-medium">
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/home" onClick={() => setIsOpen(false)}>ホーム</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/foods" onClick={() => setIsOpen(false)}>食材一覧</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/newfoods" onClick={() => setIsOpen(false)}>食材登録</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/shopping" onClick={() => setIsOpen(false)}>購入リスト</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/users" onClick={() => setIsOpen(false)}>ユーザー設定</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <button onClick={() => {
                                    handleLogout()
                                    setIsOpen(false)
                                }}>ログアウト</button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="flex flex-col gap-4 text-lg font-medium">
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/signin" onClick={() => setIsOpen(false)}>ログイン</Link>
                            </li>
                            <li className="hover:text-lime-800 cursor-pointer">
                                <Link href="/register"
                                onClick={() => {
                                    console.log('新規登録リンクがクリックされました')
                                    setIsOpen(false)
                                }}>新規登録</Link>
                            </li>
                        </ul>
                    )}
                </div>
            )}
        </header>
    )
}

export default Navigation