"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { ArrowRight, TrendingUp } from "lucide-react";

const trendingProducts = [
    { id: 201, name: "Nothing Phone (2a)", price: 45000, originalPrice: 50000, discount: 10, category: "phones", trending: true },
    { id: 202, name: "Galaxy Buds 3 Pro", price: 24000, originalPrice: 28000, discount: 14, category: "audio", trending: true },
    { id: 203, name: "iPad Air M3", price: 95000, originalPrice: 105000, discount: 10, category: "tablets", trending: true },
    { id: 204, name: "Xiaomi 14 Pro", price: 98000, originalPrice: 110000, discount: 11, category: "phones", trending: true },
    { id: 205, name: "Galaxy Watch 7", price: 35000, originalPrice: 40000, discount: 13, category: "watches", trending: true },
    { id: 206, name: "Sony WF-1000XM5", price: 26000, originalPrice: 30000, discount: 13, category: "audio", trending: true },
];

export default function TrendingProducts() {
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
                    {trendingProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
