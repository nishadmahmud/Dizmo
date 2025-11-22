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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] bg-secondary/50 rounded-xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="py-12 bg-background">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8 gap-4">
                    <div className="flex items-center justify-between w-full md:w-auto gap-4">
                        <h2 className="text-xl md:text-2xl font-bold text-primary flex items-center gap-2">
                            <Timer className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                            Flash Sale
                        </h2>

                        {/* Countdown Display */}
                        <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-white bg-red-600 px-3 py-1 md:px-4 md:py-1 rounded-full">
                            <span>Ending in:</span>
                            <div className="flex gap-1">
                                <span className="w-5 md:w-6 text-center">{String(timeLeft.hours).padStart(2, '0')}</span>:
                                <span className="w-5 md:w-6 text-center">{String(timeLeft.minutes).padStart(2, '0')}</span>:
                                <span className="w-5 md:w-6 text-center">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            </div>
                        </div>
                    </div>

                    <Link href="/flash-sale" className="hidden md:flex text-primary hover:text-accent font-medium items-center gap-1 transition-colors">
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Product Grid / Scroll */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-6 flex justify-center md:hidden">
                    <Link
                        href="/flash-sale"
                        className="px-6 py-2 rounded-full border border-primary text-primary font-medium text-sm hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                    >
                        View All Deals <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
