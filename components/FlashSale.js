"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Timer } from "lucide-react";
import ProductCard from "./ProductCard";

// Dummy Data
const flashSaleProducts = [
    { id: 1, name: "iPhone 15 Pro Max - 256GB", price: 145000, originalPrice: 160000, discount: 10 },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 135000, originalPrice: 150000, discount: 10 },
    { id: 3, name: "MacBook Air M2", price: 115000, originalPrice: 130000, discount: 12 },
    { id: 4, name: "Sony WH-1000XM5", price: 32000, originalPrice: 38000, discount: 15 },
    { id: 5, name: "Apple Watch Ultra 2", price: 85000, originalPrice: 95000, discount: 10 },
];

export default function FlashSale() {
    // Simple Countdown Timer Logic
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev; // Timer finished
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-12 bg-background">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                            <Timer className="h-6 w-6 text-accent" />
                            Flash Sale
                        </h2>

                        {/* Countdown Display */}
                        <div className="flex items-center gap-2 text-sm font-bold text-white bg-red-600 px-4 py-1 rounded-full">
                            <span>Ending in:</span>
                            <div className="flex gap-1">
                                <span className="w-6 text-center">{String(timeLeft.hours).padStart(2, '0')}</span>:
                                <span className="w-6 text-center">{String(timeLeft.minutes).padStart(2, '0')}</span>:
                                <span className="w-6 text-center">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            </div>
                        </div>
                    </div>

                    <Link href="/flash-sale" className="text-primary hover:text-accent font-medium flex items-center gap-1 transition-colors">
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Product Grid / Scroll */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {flashSaleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
