"use client";

import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Default Categories as fallback
const defaultCategories = [
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

// Dummy Data with categories and stock status
const allProducts = [
    { id: 1, name: "iPhone 15 Pro Max", price: 145000, originalPrice: 160000, discount: 10, category: "phones", inStock: true },
    { id: 2, name: "Samsung S24 Ultra", price: 135000, originalPrice: 150000, discount: 10, category: "phones", inStock: true },
    { id: 3, name: "MacBook Air M2", price: 115000, originalPrice: 130000, discount: 12, category: "laptops", inStock: false },
    { id: 4, name: "Sony WH-1000XM5", price: 32000, originalPrice: 38000, discount: 15, category: "audio", inStock: true },
    { id: 5, name: "Apple Watch Ultra 2", price: 85000, originalPrice: 95000, discount: 10, category: "watches", inStock: true },
    { id: 11, name: "OnePlus 12", price: 85000, originalPrice: 90000, discount: 5, category: "phones", inStock: true },
    { id: 12, name: "Dell XPS 15", price: 145000, originalPrice: 160000, discount: 9, category: "laptops", inStock: true },
    { id: 13, name: "AirPods Pro 2", price: 28000, originalPrice: 32000, discount: 13, category: "audio", inStock: false },
    { id: 14, name: "Galaxy Watch 6", price: 35000, originalPrice: 40000, discount: 13, category: "watches", inStock: true },
    { id: 15, name: "iPad Pro M2", price: 125000, originalPrice: 140000, discount: 11, category: "tablets", inStock: true },
    { id: 16, name: "Google Pixel 8 Pro", price: 95000, originalPrice: 105000, discount: 10, category: "phones", inStock: true },
    { id: 17, name: "Lenovo ThinkPad X1", price: 135000, originalPrice: 150000, discount: 10, category: "laptops", inStock: false },
];

export default function ProductsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [categories, setCategories] = useState(defaultCategories);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [loading, setLoading] = useState(true);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200000);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;
                const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORIES;

                const url = `${apiBaseUrl}${endpoint}/${storeId}`;
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();

                    if (data.success && data.data && data.data.length > 0) {
                        const fetchedCategories = [
                            { id: "all", name: "All" },
                            ...data.data.map((cat) => ({
                                id: cat.category_id.toString(),
                                name: cat.name
                            }))
                        ];
                        setCategories(fetchedCategories);
                    }
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                // Keep default categories on error
            }
        };

        fetchCategories();
    }, []);

    // Fetch products based on selected category
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;
                const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORY_PRODUCTS;

                // Use store ID for "all" category, otherwise use the selected category ID
                const categoryId = selectedCategory === "all" ? storeId : selectedCategory;
                const url = `${apiBaseUrl}${endpoint}/${categoryId}`;

                console.log('Fetching products from:', url);
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();
                    console.log('Products data:', data);

                    if (data.success && data.data && data.data.length > 0) {
                        const fetchedProducts = data.data.map((product) => {
                            // Get the lowest price from imeis if available
                            let lowestPrice = parseFloat(product.retails_price);
                            if (product.imeis && product.imeis.length > 0) {
                                const prices = product.imeis.map(imei => parseFloat(imei.sale_price));
                                lowestPrice = Math.min(...prices);
                            }

                            return {
                                id: product.id,
                                name: product.name,
                                price: lowestPrice,
                                originalPrice: parseFloat(product.retails_price),
                                discount: parseFloat(product.discount) || 0,
                                category: selectedCategory,
                                inStock: product.status === "In stock",
                                image: product.image_path,
                                brand: product.brand_name,
                                stock: product.current_stock,
                                rating: parseFloat(product.review_summary?.average_rating) || 0,
                                reviews: product.review_summary?.total_reviews || 0
                            };
                        });

                        setProducts(fetchedProducts);

                        // Update price range based on fetched products
                        if (fetchedProducts.length > 0) {
                            const prices = fetchedProducts.map(p => p.price);
                            const min = Math.floor(Math.min(...prices) / 1000) * 1000;
                            const max = Math.ceil(Math.max(...prices) / 1000) * 1000;
                            setMinPrice(min);
                            setMaxPrice(max);
                            setPriceRange([min, max]);
                        }
                    } else {
                        setProducts([]);
                    }
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    // Read category from URL on mount
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        } else {
            setSelectedCategory("all");
        }
    }, [searchParams]);

    // Update URL when category changes
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        const params = new URLSearchParams(searchParams);
        if (categoryId === 'all') {
            params.delete('category');
        } else {
            params.set('category', categoryId);
        }
        router.push(`/products?${params.toString()}`, { scroll: false });
    };

    // Filter products
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesStock = !inStockOnly || product.inStock;
        return matchesSearch && matchesPrice && matchesStock;
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

    const resetFilters = () => {
        setPriceRange([minPrice, maxPrice]);
        setInStockOnly(false);
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container py-8">
                {/* Categories - Horizontal Scroll */}
                <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex items-center gap-3 min-w-max">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.id)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === category.id
                                    ? "bg-primary text-white shadow-md"
                                    : "bg-secondary/50 text-foreground hover:bg-secondary hover:text-primary"
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-2.5 h-5 w-5 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder={`Search in ${categories.find(c => c.id === selectedCategory)?.name}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                    </div>

                    <div className="flex gap-3">
                        <div className="relative">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors font-medium text-sm ${showFilters
                                    ? "bg-primary text-white border-primary"
                                    : "border-border bg-background hover:bg-secondary/50"
                                    }`}
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                                Filter
                            </button>

                            {/* Filter Popover */}
                            {showFilters && (
                                <div className="absolute top-full right-0 mt-2 w-72 bg-background border border-border rounded-xl shadow-xl p-4 z-50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-base font-bold text-foreground">Filters</h3>
                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="p-1 hover:bg-secondary rounded-lg transition-colors"
                                        >
                                            <X className="h-4 w-4 text-muted-foreground" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Price Range */}
                                        <div>
                                            <label className="block text-xs font-medium text-foreground mb-2">
                                                Price: ৳{priceRange[0].toLocaleString()} - ৳{priceRange[1].toLocaleString()}
                                            </label>
                                            <div className="space-y-2">
                                                <input
                                                    type="range"
                                                    min={minPrice}
                                                    max={maxPrice}
                                                    step="1000"
                                                    value={priceRange[0]}
                                                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                                    className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                                <input
                                                    type="range"
                                                    min={minPrice}
                                                    max={maxPrice}
                                                    step="1000"
                                                    value={priceRange[1]}
                                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                                    className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                            </div>
                                        </div>

                                        {/* Stock Filter */}
                                        <div>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={inStockOnly}
                                                    onChange={(e) => setInStockOnly(e.target.checked)}
                                                    className="w-4 h-4 rounded border-border bg-background checked:bg-primary checked:border-primary cursor-pointer accent-primary"
                                                />
                                                <span className="text-xs font-medium text-foreground">In Stock Only</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-4 flex gap-2 justify-end">
                                        <button
                                            onClick={resetFilters}
                                            className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                                        >
                                            Reset
                                        </button>
                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none pl-9 pr-10 py-2 rounded-xl border border-border bg-background hover:bg-secondary/50 transition-colors font-medium text-sm outline-none cursor-pointer text-foreground [&>option]:bg-background [&>option]:text-foreground"
                            >
                                <option value="default">Sort</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A to Z</option>
                            </select>
                            <ArrowUpDown className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                    </div>
                </div>



                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-primary">
                        {categories.find(c => c.id === selectedCategory)?.name}
                    </h1>
                    <span className="text-muted-foreground">
                        {loading ? "Loading..." : `${sortedProducts.length} items found`}
                    </span>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="bg-card rounded-xl overflow-hidden border border-border">
                                <div className="aspect-square bg-secondary/50 animate-pulse" />
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-secondary/50 rounded animate-pulse" />
                                    <div className="h-4 bg-secondary/50 rounded w-2/3 animate-pulse" />
                                    <div className="h-6 bg-secondary/50 rounded w-1/2 animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Products Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {sortedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* No Results */}
                        {sortedProducts.length === 0 && (
                            <div className="text-center py-20">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                                    <Search className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">No products found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filters</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
