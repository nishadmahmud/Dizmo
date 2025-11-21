"use client";

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
    { id: 12, name: "Dell XPS 15", price: 145000, originalPrice: 160000, discount: 9, category: "laptops" },
    { id: 13, name: "AirPods Pro 2", price: 28000, originalPrice: 32000, discount: 13, category: "audio" },
    { id: 14, name: "Galaxy Watch 6", price: 35000, originalPrice: 40000, discount: 13, category: "watches" },
    { id: 15, name: "iPad Pro M2", price: 125000, originalPrice: 140000, discount: 11, category: "tablets" },
    { id: 16, name: "Google Pixel 8 Pro", price: 95000, originalPrice: 105000, discount: 10, category: "phones" },
    { id: 17, name: "Lenovo ThinkPad X1", price: 135000, originalPrice: 150000, discount: 10, category: "laptops" },
];

export default function ProductsContent() {
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [showFilters, setShowFilters] = useState(false);

    // Read category from URL on mount
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    // Filter products
    const filteredProducts = allProducts.filter((product) => {
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesCategory && matchesSearch && matchesPrice;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            case "name":
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    return (
        <div className="min-h-screen bg-background">
            <div className="container py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        {/* Categories */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="font-bold text-lg mb-4">Categories</h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === category.id
                                            ? "bg-primary text-white"
                                            : "hover:bg-secondary"
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="font-bold text-lg mb-4">Price Range</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                        className="w-full px-3 py-2 border border-border rounded-lg"
                                        placeholder="Min"
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full px-3 py-2 border border-border rounded-lg"
                                        placeholder="Max"
                                    />
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200000"
                                    step="1000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full"
                                />
                                <div className="text-sm text-muted-foreground">
                                    ৳{priceRange[0].toLocaleString()} - ৳{priceRange[1].toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold mb-4">All Products</h1>

                            {/* Search and Sort Bar */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Search */}
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <input
                                        type="search"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring outline-none"
                                    />
                                </div>

                                {/* Sort */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary"
                                    >
                                        <SlidersHorizontal className="h-5 w-5" />
                                        Filters
                                    </button>

                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring outline-none"
                                    >
                                        <option value="default">Sort By</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="name">Name: A to Z</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mb-4 text-muted-foreground">
                            {sortedProducts.length} items found
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {sortedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* No Results */}
                        {sortedProducts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground text-lg">No products found</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
