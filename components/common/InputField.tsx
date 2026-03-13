"use client";

import { UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
    type?: string;
    placeholder?: string;
    id?: string;
    register: UseFormRegisterReturn; // react-hook-form の register を渡す
    error?: string;
    className?: string; // 追加
};

export default function InputField({
    type = "text",
    placeholder,
    id,
    register,
    error,
    className = "",
}: InputFieldProps) {
    return (
        <div className="mb-3">
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                {...register} 
                className={`border rounded px-4 py-2 w-full text-lg focus:outline-none focus:ring-0 ${className}`}
            />
            {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
        </div>
    );
}