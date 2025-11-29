"use client";

import ProductCard from "@/components/ProductCard";
import { Timer } from "lucide-react";
import { useState, useEffect } from "react";

// Dummy Data
const flashSaleProducts = [
    { id: 1, name: "iPhone 15 Pro Max", price: 145000, originalPrice: 160000, discount: 10 },
    { id: 2, name: "Samsung S24 Ultra", price: 135000, originalPrice: 150000, discount: 10 },
    { id: 3, name: "MacBook Air M2", price: 115000, originalPrice: 130000, discount: 12 },
    { id: 4, name: "Sony WH-1000XM5", price: 32000, originalPrice: 38000, discount: 15 },
    { id: 5, name: "Apple Watch Ultra 2", price: 85000, originalPrice: 95000, discount: 10 },
    { id: 33, name: "JBL Flip 6", price: 12000, originalPrice: 15000, discount: 20 },
    { id: 34, name: "Anker Soundcore", price: 8000, originalPrice: 10000, discount: 20 },
    { id: 41, name: "iPhone 12", price: 45000, originalPrice: 60000, discount: 25 },
];

export default function FlashSalePage() {
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main className="min-h-screen flex flex-col bg-background">

            {/* Flash Sale Header */}
            <div className="bg-primary text-white py-12">
                <div className="container flex flex-col items-center text-center gap-4">
                    <div className="bg-accent/20 p-4 rounded-full">
                        <Timer className="h-12 w-12 text-accent" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold">Flash Sale</h1>
                    <p className="text-lg text-white/80">Hurry! Deals end soon.</p>

                    <div className="flex items-center gap-4 text-2xl md:text-4xl font-bold font-mono mt-4">
                        <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                            {String(timeLeft.hours).padStart(2, '0')}
                            <span className="text-sm block font-sans font-normal text-white/60">Hours</span>
                        </div>
                        <span>:</span>
                        <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                            {String(timeLeft.minutes).padStart(2, '0')}
                            <span className="text-sm block font-sans font-normal text-white/60">Mins</span>
                        </div>
                        <span>:</span>
                        <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                            {String(timeLeft.seconds).padStart(2, '0')}
                            <span className="text-sm block font-sans font-normal text-white/60">Secs</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {flashSaleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

        </main>
    );
}
