"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Zap, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function OffersPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // Simple Countdown Timer Logic
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 12 });

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

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="container py-12">
                {/* Header */}
                <div className="text-center mb-10">

                    <h1 className="text-4xl font-bold text-primary mb-4">Limited Time Deals</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Grab the best deals on top gadgets before they're gone!
                    </p>
                </div>

                {/* Countdown Timer */}
                <div className="bg-gradient-to-r from-primary to-accent text-white rounded-xl p-6 mb-12 text-center shadow-lg">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Clock className="h-5 w-5" />
                        <span className="font-semibold">Offer Ends In</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-3xl font-bold">
                        <div className="flex flex-col">
                            <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="text-xs font-normal opacity-80">Hours</span>
                        </div>
                        <span>:</span>
                        <div className="flex flex-col">
                            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="text-xs font-normal opacity-80">Minutes</span>
                        </div>
                        <span>:</span>
                        <div className="flex flex-col">
                            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                            <span className="text-xs font-normal opacity-80">Seconds</span>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] bg-secondary/50 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
