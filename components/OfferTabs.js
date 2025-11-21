"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const tabs = ["Eid Super Sale", "New Arrivals", "Best Sellers", "Clearance"];

const products = {
    "Eid Super Sale": [
        { id: 11, name: "OnePlus 12", price: 85000, originalPrice: 90000, discount: 5 },
        { id: 12, name: "Pixel 8 Pro", price: 95000, originalPrice: 105000, discount: 10 },
        { id: 13, name: "Xiaomi 14 Ultra", price: 110000, originalPrice: 120000, discount: 8 },
        { id: 14, name: "Nothing Phone (2)", price: 65000, originalPrice: 70000, discount: 7 },
    ],
    "New Arrivals": [
        { id: 21, name: "iPad Pro M4", price: 125000, originalPrice: null, discount: null },
        { id: 22, name: "Galaxy Watch 7", price: 35000, originalPrice: null, discount: null },
        { id: 23, name: "AirPods 4", price: 22000, originalPrice: null, discount: null },
        { id: 24, name: "Surface Laptop 6", price: 180000, originalPrice: null, discount: null },
    ],
    "Best Sellers": [
        { id: 31, name: "iPhone 13", price: 65000, originalPrice: 75000, discount: 13 },
        { id: 32, name: "Galaxy S23 FE", price: 55000, originalPrice: 65000, discount: 15 },
        { id: 33, name: "JBL Flip 6", price: 12000, originalPrice: 15000, discount: 20 },
        { id: 34, name: "Anker Soundcore", price: 8000, originalPrice: 10000, discount: 20 },
    ],
    "Clearance": [
        { id: 41, name: "iPhone 12", price: 45000, originalPrice: 60000, discount: 25 },
        { id: 42, name: "Galaxy S22", price: 40000, originalPrice: 55000, discount: 27 },
        { id: 43, name: "MacBook Air M1", price: 85000, originalPrice: 95000, discount: 10 },
        { id: 44, name: "Sony XM4", price: 25000, originalPrice: 30000, discount: 16 },
    ]
};

export default function OfferTabs() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <section className="py-12 bg-secondary/30">
            <div className="container">
                <div className="flex flex-col items-center mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-6">Special Offers</h2>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab
                                        ? "bg-primary text-white shadow-md scale-105"
                                        : "bg-white text-muted-foreground hover:bg-white/80 border border-border"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in zoom-in duration-500 key={activeTab}">
                    {products[activeTab]?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
