"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { getProductImage } from "@/utils/imageHelper";

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
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
                        featured: true,
                        rating: parseFloat(item.review_summary?.average_rating) || 0,
                        reviews: item.review_summary?.total_reviews || 0
                    }));
                    setProducts(mappedProducts.slice(0, 12)); // Limit to 12 items
                }
            } catch (error) {
                console.error("Error fetching featured products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    if (loading) {
        return (
            <section className="py-12 bg-background">
                <div className="container">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="h-8 w-48 bg-secondary/50 rounded animate-pulse mb-2" />
                            <div className="h-4 w-64 bg-secondary/50 rounded animate-pulse" />
                        </div>
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
        <section className="py-12 bg-background">
            <div className="container">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Featured Products</h2>
                        <p className="text-sm md:text-base text-muted-foreground">Hand-picked products just for you</p>
                    </div>
                    <Link
                        href="/products"
                        className="hidden md:flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
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

                {/* Mobile View All Button */}
                <div className="mt-6 flex justify-center md:hidden">
                    <Link
                        href="/products"
                        className="px-6 py-2 rounded-full border border-primary text-primary font-medium text-sm hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                    >
                        View All Products <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
