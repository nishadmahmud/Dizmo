"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";

const newProducts = [
    { id: 101, name: "iPhone 16 Pro", price: 165000, originalPrice: null, discount: null, category: "phones", isNew: true },
    { id: 102, name: "Galaxy S25 Ultra", price: 155000, originalPrice: null, discount: null, category: "phones", isNew: true },
    { id: 103, name: "Pixel 9 Pro XL", price: 125000, originalPrice: null, discount: null, category: "phones", isNew: true },
    { id: 104, name: "MacBook Pro M4", price: 245000, originalPrice: null, discount: null, category: "laptops", isNew: true },
];

export default function NewArrivals() {
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
                    {newProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
