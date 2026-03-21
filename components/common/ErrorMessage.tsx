'use client'

type ErrorMessageProps = {
  message?: string
  type?: 'error' | 'warning' | 'info'
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null

  return <div className="mt-2 text-sm text-red-500 text-center">{message}</div>
}
