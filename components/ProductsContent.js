"use client";

import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal, ArrowUpDown, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Default Categories as fallback
const defaultCategories = [
    { id: "all", name: "All" },
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

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    // Cache for storing fetched products by category
    const productsCache = useRef({});

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

    // Fetch products based on selected category with caching
    useEffect(() => {
        const fetchProducts = async () => {
            // Check if products are already cached
            if (productsCache.current[selectedCategory]) {
                console.log('Loading from cache for category:', selectedCategory);
                const cachedData = productsCache.current[selectedCategory];
                setProducts(cachedData.products);
                setMinPrice(cachedData.minPrice);
                setMaxPrice(cachedData.maxPrice);
                setPriceRange([cachedData.minPrice, cachedData.maxPrice]);
                setLoading(false);
                setCurrentPage(1); // Reset to first page
                return;
            }

            setLoading(true);

            // Helper function to process product data
            const processProducts = (productData, category) => {
                return productData
                    .map((product) => {
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
                            category: category,
                            inStock: product.status === "In stock",
                            image: product.image_path,
                            brand: product.brand_name,
                            stock: product.current_stock,
                            rating: parseFloat(product.review_summary?.average_rating) || 0,
                            reviews: product.review_summary?.total_reviews || 0
                        };
                    })
                    .filter(product => product.price >= 100); // Filter out products below 100 taka
            };

            // Special handling for "All" category - fetch from all categories
            if (selectedCategory === "all") {
                try {
                    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORY_PRODUCTS;

                    // Get all category IDs (excluding "all")
                    const categoryIds = categories
                        .filter(cat => cat.id !== "all")
                        .map(cat => cat.id);

                    if (categoryIds.length === 0) {
                        // Wait for categories to load
                        return;
                    }

                    // Fetch first category immediately to show initial products
                    const firstCategoryUrl = `${apiBaseUrl}${endpoint}/${categoryIds[0]}`;
                    console.log('Fetching first category from API:', firstCategoryUrl);

                    const firstResponse = await fetch(firstCategoryUrl);
                    let allProducts = [];

                    if (firstResponse.ok) {
                        const firstData = await firstResponse.json();
                        if (firstData.success && firstData.data && firstData.data.length > 0) {
                            allProducts = processProducts(firstData.data, "all");
                            setProducts(allProducts);
                            setLoading(false); // Show first batch immediately
                        }
                    }

                    // Fetch remaining categories in parallel
                    const remainingIds = categoryIds.slice(1);
                    console.log('Fetching remaining categories in background...');

                    const remainingPromises = remainingIds.map(categoryId =>
                        fetch(`${apiBaseUrl}${endpoint}/${categoryId}`)
                            .then(res => res.json())
                            .catch(err => {
                                console.error(`Error fetching category ${categoryId}:`, err);
                                return null;
                            })
                    );

                    const remainingResults = await Promise.all(remainingPromises);

                    // Process and combine all products
                    remainingResults.forEach(data => {
                        if (data && data.success && data.data && data.data.length > 0) {
                            const newProducts = processProducts(data.data, "all");
                            allProducts = [...allProducts, ...newProducts];
                        }
                    });

                    setProducts(allProducts);

                    // Update price range
                    if (allProducts.length > 0) {
                        const prices = allProducts.map(p => p.price);
                        const min = Math.floor(Math.min(...prices) / 1000) * 1000;
                        const max = Math.ceil(Math.max(...prices) / 1000) * 1000;
                        setMinPrice(min);
                        setMaxPrice(max);
                        setPriceRange([min, max]);

                        // Cache the combined data
                        productsCache.current["all"] = {
                            products: allProducts,
                            minPrice: min,
                            maxPrice: max
                        };
                    }

                } catch (error) {
                    console.error("Error fetching all products:", error);
                    setProducts([]);
                    setLoading(false);
                }
                return;
            }

            // Regular single category fetch
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORY_PRODUCTS;
                const url = `${apiBaseUrl}${endpoint}/${selectedCategory}`;

                console.log('Fetching products from API:', url);
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();

                    if (data.success && data.data && data.data.length > 0) {
                        const fetchedProducts = processProducts(data.data, selectedCategory);
                        setProducts(fetchedProducts);

                        // Update price range based on fetched products
                        let min = 0, max = 200000;
                        if (fetchedProducts.length > 0) {
                            const prices = fetchedProducts.map(p => p.price);
                            min = Math.floor(Math.min(...prices) / 1000) * 1000;
                            max = Math.ceil(Math.max(...prices) / 1000) * 1000;
                            setMinPrice(min);
                            setMaxPrice(max);
                            setPriceRange([min, max]);
                        }

                        // Cache the fetched data
                        productsCache.current[selectedCategory] = {
                            products: fetchedProducts,
                            minPrice: min,
                            maxPrice: max
                        };
                    } else {
                        setProducts([]);
                    }
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
                setCurrentPage(1); // Reset to first page
            }
        };

        fetchProducts();
    }, [selectedCategory, categories]);

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

    // Pagination Logic
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetFilters = () => {
        setPriceRange([minPrice, maxPrice]);
        setInStockOnly(false);
        setCurrentPage(1);
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
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                            {currentProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-border bg-background hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>

                                <div className="flex items-center gap-1">
                                    {[...Array(totalPages)].map((_, i) => {
                                        const page = i + 1;
                                        // Show first, last, current, and adjacent pages
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 1 && page <= currentPage + 1)
                                        ) {
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                                            ? "bg-primary text-white"
                                                            : "bg-background border border-border hover:bg-secondary"
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        } else if (
                                            page === currentPage - 2 ||
                                            page === currentPage + 2
                                        ) {
                                            return <span key={page} className="px-1 text-muted-foreground">...</span>;
                                        }
                                        return null;
                                    })}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-border bg-background hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        )}

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
