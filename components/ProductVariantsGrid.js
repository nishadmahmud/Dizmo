"use client";

import { useState } from "react";
import { Battery, Smartphone, Globe, HardDrive, Box, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductVariantsGrid({ imeis, product }) {
    const [sortBy, setSortBy] = useState("price_asc");
    const [filterColor, setFilterColor] = useState("all");
    const { addToCart } = useCart();
    const router = useRouter();

    if (!imeis || imeis.length === 0) return null;

    // Extract unique colors for filter
    const uniqueColors = [...new Set(imeis.map(i => i.color).filter(Boolean))];

    // Filter and Sort
    const filteredImeis = imeis
        .filter(item => filterColor === "all" || item.color === filterColor)
        .sort((a, b) => {
            if (sortBy === "price_asc") return a.sale_price - b.sale_price;
            if (sortBy === "price_desc") return b.sale_price - a.sale_price;
            return 0;
        });

    const handleBuyNow = (variant) => {
        // Construct a product object for the cart
        const cartItem = {
            ...product,
            id: product.id, // Ensure ID is passed
            price: variant.sale_price,
            selectedVariants: {
                storage: variant.storage,
                color: variant.color,
                region: variant.region,
            },
            // You might want to pass specific IMEI info if needed
            specificVariantId: variant.id // Assuming IMEI object has an ID
        };
        addToCart(cartItem, 1);
        router.push("/checkout");
    };

    return (
        <div className="py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-primary border-b-2 border-accent inline-block pb-1">
                    Pick Your Perfect Match
                </h2>

                <div className="flex gap-3">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>

                    <select
                        value={filterColor}
                        onChange={(e) => setFilterColor(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="all">Any Color</option>
                        {uniqueColors.map(color => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
                {filteredImeis.map((item, index) => (
                    <div key={index} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-card hover:shadow-lg transition-shadow rounded-xl border border-border p-4 flex flex-col gap-3 relative overflow-hidden group">
                        {/* Condition Badge (Mocked for now as 'Excellent' based on UI request, or dynamic if available) */}
                        <div className="absolute top-4 left-4">
                            <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                Excellent
                            </span>
                        </div>

                        {/* Content */}
                        <div className="mt-6 space-y-2">
                            {/* Battery Health */}
                            {item.battery_health && (
                                <div className="flex items-center gap-3 p-1.5 bg-secondary/30 rounded-lg border border-border/50">
                                    <Battery className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">Battery Health: <span className="text-foreground">{item.battery_health}%</span></span>
                                </div>
                            )}

                            {/* Color */}
                            {item.color && (
                                <div className="flex items-center gap-3 p-1.5 bg-secondary/30 rounded-lg border border-border/50">
                                    <div className="w-4 h-4 rounded-full border border-border shadow-sm" style={{ backgroundColor: item.color_code || "#ccc" }}></div>
                                    <span className="text-sm font-medium">Color: <span className="text-foreground">{item.color}</span></span>
                                </div>
                            )}

                            {/* Region */}
                            {item.region && (
                                <div className="flex items-center gap-3 p-1.5 bg-secondary/30 rounded-lg border border-border/50">
                                    <Globe className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">Region: <span className="text-foreground">{item.region}</span></span>
                                </div>
                            )}

                            {/* Storage */}
                            {item.storage && (
                                <div className="flex items-center gap-3 p-1.5 bg-secondary/30 rounded-lg border border-border/50">
                                    <HardDrive className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">Storage: <span className="text-foreground">{item.storage}</span></span>
                                </div>
                            )}

                            {/* Cycle Count (Optional) */}
                            {item.cycle_count && (
                                <div className="flex items-center gap-3 p-1.5 bg-secondary/30 rounded-lg border border-border/50">
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">Cycle Count: <span className="text-foreground">{item.cycle_count}</span></span>
                                </div>
                            )}

                            {/* Comes with Original Box */}
                            <div className="flex items-center gap-3 mt-1 pt-1">
                                <span className="text-sm font-bold text-[#103E34]">Comes with:</span>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white shadow-sm">
                                    <Box className="h-4 w-4 text-[#FCB042] fill-[#FCB042]/20" />
                                    <span className="text-sm font-bold text-[#103E34]">Original Box</span>
                                </div>
                            </div>
                        </div>



                        <div className="border-t border-border my-2"></div>

                        {/* Price & Action */}
                        <div className="flex items-end justify-between mt-auto">
                            <div>
                                <div className="text-2xl font-bold text-green-600">
                                    ৳{item.sale_price?.toLocaleString()}
                                </div>

                            </div>
                            <button
                                onClick={() => handleBuyNow(item)}
                                className="bg-white border border-green-600 text-green-600 hover:bg-green-50 font-semibold px-6 py-2 rounded-lg transition-colors"
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
