import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

export async function proxy(request: NextRequest) {
  const { response, session } = await updateSession(request)

  if (!session) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/home/:path*',
    '/foods/:path*',
    '/newfoods/:path*',
    '/shopping/:path*',
    '/users/:path*',
    '/settings/:path*',
  ],
}