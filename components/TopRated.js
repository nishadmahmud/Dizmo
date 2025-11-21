"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { ArrowRight, Star } from "lucide-react";

const topRatedProducts = [
    { id: 301, name: "iPhone 15 Pro Max", price: 145000, originalPrice: 160000, discount: 10, category: "phones", rating: 4.9 },
    { id: 302, name: "MacBook Pro M3", price: 235000, originalPrice: 250000, discount: 6, category: "laptops", rating: 4.8 },
    { id: 303, name: "Sony WH-1000XM5", price: 32000, originalPrice: 38000, discount: 15, category: "audio", rating: 4.9 },
    { id: 304, name: "Apple Watch Ultra 2", price: 85000, originalPrice: 95000, discount: 10, category: "watches", rating: 4.7 },
];

export default function TopRated() {
    return (
        <section className="py-12 bg-background">
            <div className="container">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-500/10 p-3 rounded-full">
                            <Star className="h-6 w-6 text-yellow-600 fill-yellow-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-foreground">Top Rated</h2>
                            <p className="text-muted-foreground">Customer favorites with best reviews</p>
                        </div>
                    </div>
                    <Link
                        href="/products?sort=rating"
                        className="flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                    >
                        View All
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {topRatedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
