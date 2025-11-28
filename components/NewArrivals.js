"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";

export default function NewArrivals() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_NEW_ARRIVALS;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;

                const response = await fetch(`${baseUrl}${endpoint}/${storeId}`);
                const data = await response.json();

                if (data.success && data.data && data.data.data) {
                    const mappedProducts = data.data.data.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: parseFloat(item.retails_price), // New arrivals might not have discount
                        originalPrice: parseFloat(item.retails_price),
                        discount: 0,
                        image: item.image_path,
                        inStock: item.status === "In stock",
                        category: item.category_name || "New",
                        isNew: true,
                        rating: parseFloat(item.review_summary?.average_rating) || 0,
                        reviews: item.review_summary?.total_reviews || 0
                    }));
                    setProducts(mappedProducts.slice(0, 12)); // Limit to 12 items
                }
            } catch (error) {
                console.error("Error fetching new arrivals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewArrivals();
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
        <section className="py-8 px-4 bg-[#103E34] rounded-3xl mx-4 lg:mx-auto max-w-7xl my-8">
            <div className="container px-6">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Left Side - Text Content */}
                    <div className="lg:w-1/4 text-white space-y-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">New Arrival</h2>
                            <h3 className="text-lg md:text-xl font-semibold text-[#FCB042] mb-2">Discover the Latest Tech!</h3>
                            <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                                Explore our brand-new collection of cutting-edge gadgets. Fresh arrivals, premium quality, and the newest innovations—shop now and be the first to experience the future of tech!
                            </p>
                        </div>

                        <Link
                            href="/products?sort=newest"
                            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black hover:bg-[#FCB042] text-white transition-colors duration-300"
                        >
                            <ArrowRight className="h-6 w-6" />
                        </Link>
                    </div>

                    {/* Right Side - Horizontal Scrollable Products */}
                    <div className="lg:w-3/4 w-full overflow-hidden">
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                            {products.map((product) => (
                                <div key={product.id} className="min-w-[200px] md:min-w-[240px] snap-start">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
