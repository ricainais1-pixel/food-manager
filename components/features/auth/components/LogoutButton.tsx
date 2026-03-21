'use client'

import { useLogout } from '../hooks/useLogout'

export default function LogoutButton() {
  const { logout } = useLogout()

  return (
    <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">
      ログアウト
    </button>
  )
}
