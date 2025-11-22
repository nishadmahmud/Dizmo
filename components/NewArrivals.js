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
                    setProducts(mappedProducts.slice(0, 8)); // Limit to 8 items
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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
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
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-accent/10 p-3 rounded-full">
                            <Sparkles className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-foreground">New Arrivals</h2>
                            <p className="text-muted-foreground">Latest products in stock</p>
                        </div>
                    </div>
                    <Link
                        href="/products?sort=newest"
                        className="flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                    >
                        View All
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
