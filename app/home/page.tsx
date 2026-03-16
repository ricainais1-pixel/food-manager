"use client";

import { useExpiryFoods } from "@/components/features/home/hooks/useExpiryFoods";
import ExpiryNoticeCard from "@/components/features/home/ExpiryNoticeCard";
import NavigationCards from "@/components/features/home/NavigationCards";



export default function HomePage() {
    const { foods, loading, formatExpiryNotice } =useExpiryFoods();

    if (loading) {
    return (
        <div className="p-10 text-center text-xl">
            読み込み中...
        </div>
        );
    }

    
    return (
    <div className="min-h-screen flex flex-col">
        <ExpiryNoticeCard
            foods={foods}
            formatExpiryNotice={formatExpiryNotice}
        />

        <NavigationCards />

    </div>
);
}