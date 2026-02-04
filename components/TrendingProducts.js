"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { ArrowRight, TrendingUp } from "lucide-react";
import { getProductImage } from "@/utils/imageHelper";

export default function TrendingProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BEST_SELLERS;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;

                const response = await fetch(`${baseUrl}${endpoint}/${storeId}`);
                const data = await response.json();

                if (data.success) {
                    // Handle both array and paginated response structures
                    const productsData = Array.isArray(data.data) ? data.data : (data.data?.data || []);

                    const mappedProducts = productsData.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: parseFloat(item.discounted_price || item.retails_price),
                        originalPrice: parseFloat(item.retails_price),
                        discount: parseFloat(item.discount || item.discount_rate) || 0,
                        image: getProductImage(item),
                        inStock: item.status === "In stock",
                        trending: true,
                        rating: parseFloat(item.review_summary?.average_rating) || 0,
                        reviews: item.review_summary?.total_reviews || 0
                    }));
                    setProducts(mappedProducts.slice(0, 12)); // Limit to 12 items
                }
            } catch (error) {
                console.error("Error fetching trending products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    if (loading) {
        return (
            <section className="py-12 bg-secondary/30">
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
        <section className="py-12 bg-secondary/30">
            <div className="container">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-500/10 p-3 rounded-full">
                            <TrendingUp className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-foreground">Trending Now</h2>
                            <p className="text-muted-foreground">Most popular products this week</p>
                        </div>
                    </div>
                    <Link
                        href="/products?sort=trending"
                        className="flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                    >
                        View All
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
