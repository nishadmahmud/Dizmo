"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Timer } from "lucide-react";
import ProductCard from "./ProductCard";

export default function FlashSale() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // Simple Countdown Timer Logic
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BEST_DEALS;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;

                const response = await fetch(`${baseUrl}${endpoint}/${storeId}`);
                const data = await response.json();

                if (data.success && data.data) {
                    const mappedProducts = data.data.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: parseFloat(item.discounted_price),
                        originalPrice: parseFloat(item.retails_price),
                        discount: parseFloat(item.discount) || 0,
                        image: item.image_path,
                        inStock: item.status === "In stock",
                        rating: parseFloat(item.review_summary?.average_rating) || 0,
                        reviews: item.review_summary?.total_reviews || 0
                    }));
                    setProducts(mappedProducts);
                }
            } catch (error) {
                console.error("Error fetching deals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();

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

    if (loading) {
        return (
            <section className="py-12 bg-background">
                <div className="container">
                    <div className="flex items-center justify-between mb-8">
                        <div className="h-8 w-48 bg-secondary/50 rounded animate-pulse" />
                        <div className="h-6 w-24 bg-secondary/50 rounded animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] bg-secondary/50 rounded-xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="py-12 bg-secondary/20">
            <div className="container">
                {/* Header with centered timer */}
                <div className="flex items-center justify-between mb-8">
                    {/* Flash Sale Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        Flash Sale
                    </h2>

                    {/* Countdown Timer - Centered */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="flex items-center gap-1 md:gap-2">
                            <div className="bg-[#103E34] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg min-w-[45px] md:min-w-[55px] text-center">
                                <div className="text-lg md:text-xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                                <div className="text-[9px] md:text-[10px] text-[#FCB042]">Hours</div>
                            </div>
                            <div className="bg-[#103E34] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg min-w-[45px] md:min-w-[55px] text-center">
                                <div className="text-lg md:text-xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                                <div className="text-[9px] md:text-[10px] text-[#FCB042]">Minutes</div>
                            </div>
                            <div className="bg-[#103E34] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg min-w-[45px] md:min-w-[55px] text-center">
                                <div className="text-lg md:text-xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                                <div className="text-[9px] md:text-[10px] text-[#FCB042]">Seconds</div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrow */}
                    <Link
                        href="/products"
                        className="hidden md:flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                    >
                        View All
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-6 flex justify-center md:hidden">
                    <Link
                        href="/flash-sale"
                        className="px-6 py-3 rounded-full bg-[#103E34] hover:bg-[#FCB042] text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-lg"
                    >
                        View All Deals <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
