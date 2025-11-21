"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Dummy Categories
const categories = [
    { id: "all", name: "All" },
    { id: "phones", name: "Phones" },
    { id: "laptops", name: "Laptops" },
    { id: "watches", name: "Watches" },
    { id: "audio", name: "Audio" },
    { id: "tablets", name: "Tablets" },
    { id: "accessories", name: "Accessories" },
    { id: "gadgets", name: "Gadgets" },
    { id: "cameras", name: "Cameras" },
];

// Dummy Data with categories
const allProducts = [
    { id: 1, name: "iPhone 15 Pro Max", price: 145000, originalPrice: 160000, discount: 10, category: "phones" },
    { id: 2, name: "Samsung S24 Ultra", price: 135000, originalPrice: 150000, discount: 10, category: "phones" },
    { id: 3, name: "MacBook Air M2", price: 115000, originalPrice: 130000, discount: 12, category: "laptops" },
    { id: 4, name: "Sony WH-1000XM5", price: 32000, originalPrice: 38000, discount: 15, category: "audio" },
    { id: 5, name: "Apple Watch Ultra 2", price: 85000, originalPrice: 95000, discount: 10, category: "watches" },
    { id: 11, name: "OnePlus 12", price: 85000, originalPrice: 90000, discount: 5, category: "phones" },
    { id: 12, name: "Pixel 8 Pro", price: 95000, originalPrice: 105000, discount: 10, category: "phones" },
    { id: 13, name: "Xiaomi 14 Ultra", price: 110000, originalPrice: 120000, discount: 8, category: "phones" },
    { id: 14, name: "Nothing Phone (2)", price: 65000, originalPrice: 70000, discount: 7, category: "phones" },
    { id: 21, name: "iPad Pro M4", price: 125000, originalPrice: null, discount: null, category: "tablets" },
    { id: 22, name: "Galaxy Watch 7", price: 35000, originalPrice: null, discount: null, category: "watches" },
    { id: 23, name: "AirPods 4", price: 22000, originalPrice: null, discount: null, category: "audio" },
];

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const categoryFromUrl = searchParams.get("category");

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [priceFilter, setPriceFilter] = useState("all");
    const [sortBy, setSortBy] = useState("default");
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [showSortMenu, setShowSortMenu] = useState(false);

    // Set category from URL on mount or when URL changes
    useEffect(() => {
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
        }
    }, [categoryFromUrl]);

    // Filter products by category, search, and price
    let filteredProducts = allProducts.filter((product) => {
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesPrice = true;
        if (priceFilter === "under-50k") matchesPrice = product.price < 50000;
        else if (priceFilter === "50k-100k") matchesPrice = product.price >= 50000 && product.price < 100000;
        else if (priceFilter === "above-100k") matchesPrice = product.price >= 100000;

        return matchesCategory && matchesSearch && matchesPrice;
    });

    // Sort products
    if (sortBy === "price-low") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    const selectedCategoryName = categories.find(c => c.id === selectedCategory)?.name || "All";

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="container py-8">
                {/* Scrollable Category Tabs */}
                <div className="mb-6">
                    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-1.5 rounded-md whitespace-nowrap text-sm font-medium transition-all ${selectedCategory === category.id
                                        ? "bg-primary text-white"
                                        : "bg-secondary text-foreground hover:bg-primary/10"
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Bar with Filter and Sort */}
                <div className="mb-8">
                    <div className="flex gap-3">
                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={`Search in ${selectedCategoryName}...`}
                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        {/* Filter Button */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowFilterMenu(!showFilterMenu);
                                    setShowSortMenu(false);
                                }}
                                className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-background hover:bg-secondary transition-colors"
                            >
                                <SlidersHorizontal className="h-5 w-5" />
                                <span className="font-medium">Filter</span>
                                {priceFilter !== "all" && (
                                    <span className="ml-1 h-2 w-2 rounded-full bg-primary"></span>
                                )}
                            </button>

                            {/* Filter Dropdown */}
                            {showFilterMenu && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-background border border-border rounded-lg shadow-lg z-10 p-2">
                                    <div className="flex items-center justify-between px-3 py-2 border-b border-border mb-2">
                                        <span className="font-semibold text-sm">Price Range</span>
                                        {priceFilter !== "all" && (
                                            <button
                                                onClick={() => setPriceFilter("all")}
                                                className="text-xs text-primary hover:underline"
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            setPriceFilter("all");
                                            setShowFilterMenu(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary ${priceFilter === "all" ? "bg-primary/10 text-primary font-medium" : ""
                                            }`}
                                    >
                                        All Prices
                                    </button>
                                    <button
                                        onClick={() => {
                                            setPriceFilter("under-50k");
                                            setShowFilterMenu(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary ${priceFilter === "under-50k" ? "bg-primary/10 text-primary font-medium" : ""
                                            }`}
                                    >
                                        Under ৳50,000
                                    </button>
                                    <button
                                        onClick={() => {
                                            setPriceFilter("50k-100k");
                                            setShowFilterMenu(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary ${priceFilter === "50k-100k" ? "bg-primary/10 text-primary font-medium" : ""
                                            }`}
                                    >
                                        ৳50,000 - ৳100,000
                                    </button>
                                    <button
                                        onClick={() => {
                                            setPriceFilter("above-100k");
                                            setShowFilterMenu(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary ${priceFilter === "above-100k" ? "bg-primary/10 text-primary font-medium" : ""
                                            }`}
                                    >
                                        Above ৳100,000
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Sort Button */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowSortMenu(!showSortMenu);
                                    setShowFilterMenu(false);
                                }}
                                className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-background hover:bg-secondary transition-colors"
                            >
                                <ArrowUpDown className="h-5 w-5" />
                                <span className="font-medium">Sort</span>
                            </button>

                            {/* Sort Dropdown */}
                            {showSortMenu && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-10 p-2">
                                    <div className="px-3 py-2 border-b border-border mb-2">
                                        <span className="font-semibold text-sm">Sort By</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSortBy("default");
                                            setShowSortMenu(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary ${sortBy === "default" ? "bg-primary/10 text-primary font-medium" : ""
                                            }`}
                                    >
                                        Default
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSortBy("price-low");
                                            setShowSortMenu(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary ${sortBy === "price-low" ? "bg-primary/10 text-primary font-medium" : ""
                                            }`}
                                    >
                                        Price: Low to High
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSortBy("price-high");
                                            setShowSortMenu(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-secondary ${sortBy === "price-high" ? "bg-primary/10 text-primary font-medium" : ""
                                            }`}
                                    >
                                        Price: High to Low
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="mb-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-primary">
                            {selectedCategoryName}
                        </h1>
                        <span className="text-muted-foreground text-sm">
                            {filteredProducts.length} items found
                        </span>
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
