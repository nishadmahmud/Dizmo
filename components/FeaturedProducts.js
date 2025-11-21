"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";

const featuredProducts = [
    { id: 1, name: "iPhone 15 Pro Max", price: 145000, originalPrice: 160000, discount: 10, category: "phones", featured: true },
    { id: 2, name: "MacBook Air M3", price: 115000, originalPrice: 130000, discount: 12, category: "laptops", featured: true },
    { id: 3, name: "Apple Watch Ultra 2", price: 85000, originalPrice: 95000, discount: 10, category: "watches", featured: true },
    { id: 4, name: "iPad Pro M4", price: 125000, originalPrice: 140000, discount: 11, category: "tablets", featured: true },
    { id: 5, name: "AirPods Pro 2", price: 28000, originalPrice: 32000, discount: 13, category: "audio", featured: true },
    { id: 6, name: "Sony WH-1000XM5", price: 32000, originalPrice: 38000, discount: 15, category: "audio", featured: true },
];

export default function FeaturedProducts() {
    return (
        <section className="py-12 bg-background">
            <div className="container">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-2">Featured Products</h2>
                        <p className="text-muted-foreground">Hand-picked products just for you</p>
                    </div>
                    <Link
                        href="/products"
                        className="flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                    >
                        View All
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
