"use client";

import React from "react";
import Loading from "@/app/loading";

type ButtonProps = {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
};

export default function Button({
    children,
    type = "button",
    loading = false,
    className = "",
    onClick,
    disabled = false,
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading || disabled}
            className={`rounded-md px-4 py-2 text-lg text-center ${className}`}
        >
            {loading ? <Loading /> : children}
        </button>
    );
}