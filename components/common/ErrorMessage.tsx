"use client";

type ErrorMessageProps = {
    message?: string;
    type?: "error" | "warning" | "info";
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null; // メッセージがなければ何も表示しない

    return (
        <div className="mt-2 text-sm text-red-500 text-center">
            {message}
        </div>
    );
}