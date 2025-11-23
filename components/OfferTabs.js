"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const tabs = ["New Arrivals", "Best Deals", "Best Sellers"];

export default function OfferTabs() {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [products, setProducts] = useState({
        "New Arrivals": [],
        "Best Deals": [],
        "Best Sellers": []
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            // If we already have data for this tab, don't fetch again
            if (products[activeTab].length > 0) return;

            setLoading(true);
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;
                let endpoint = "";

                switch (activeTab) {
                    case "New Arrivals":
                        endpoint = process.env.NEXT_PUBLIC_ENDPOINT_NEW_ARRIVALS;
                        break;
                    case "Best Deals":
                        endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BEST_DEALS;
                        break;
                    case "Best Sellers":
                        endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BEST_SELLERS;
                        break;
                    default:
                        return;
                }

                const response = await fetch(`${baseUrl}${endpoint}/${storeId}`);
                const data = await response.json();

                let mappedProducts = [];

                if (data.success) {
                    // Handle different response structures
                    const productsData = Array.isArray(data.data) ? data.data : (data.data?.data || []);

                    mappedProducts = productsData.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: parseFloat(item.discounted_price || item.retails_price),
                        originalPrice: parseFloat(item.retails_price),
                        discount: parseFloat(item.discount || item.discount_rate) || 0,
                        image: item.image_path,
                        inStock: item.status === "In stock",
                        rating: parseFloat(item.review_summary?.average_rating) || 0,
                        reviews: item.review_summary?.total_reviews || 0
                    }));
                }

                setProducts(prev => ({
                    ...prev,
                    [activeTab]: mappedProducts.slice(0, 12) // Limit to 12 items
                }));

            } catch (error) {
                console.error(`Error fetching ${activeTab}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [activeTab]);

    return (
        <section className="py-12 bg-secondary/30">
            <div className="container">
                <div className="flex flex-col items-center mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-6">Special Offers</h2>

                    {/* Tabs */}
                    <div className="flex flex-nowrap overflow-x-auto pb-2 md:pb-0 no-scrollbar justify-start md:justify-center gap-2 md:gap-4 w-full md:w-auto px-4 md:px-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${activeTab === tab
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
                {loading && products[activeTab].length === 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] bg-secondary/50 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-in fade-in zoom-in duration-500 key={activeTab}">
                        {products[activeTab]?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        {products[activeTab]?.length === 0 && (
                            <div className="col-span-full text-center py-12 text-muted-foreground">
                                No products found in this category.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
