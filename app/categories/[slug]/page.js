"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryFilters from "@/components/CategoryFilters";
import BrandFilter from "@/components/BrandFilter";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function CategoryDetailPage({ params }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    // Filter States
    const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
    const [availability, setAvailability] = useState('all');
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [sortBy, setSortBy] = useState('default');
    const [selectedBatteryRange, setSelectedBatteryRange] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([]);

    const batteryRanges = [
        { label: '96-100%', min: 96, max: 100 },
        { label: '91-95%', min: 91, max: 95 },
        { label: '86-90%', min: 86, max: 90 },
        { label: '81-85%', min: 81, max: 85 },
        { label: '76-80%', min: 76, max: 80 },
        { label: '71-75%', min: 71, max: 75 },
        { label: '66-70%', min: 66, max: 70 }
    ];

    // Unwrap params
    const [slug, setSlug] = useState(null);

    useEffect(() => {
        params.then(p => setSlug(p.slug));
    }, [params]);

    // Fetch category products
    useEffect(() => {
        if (!slug) return;

        const fetchCategoryProducts = async () => {
            try {
                setLoading(true);
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const productsEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORY_PRODUCTS;
                const categoriesEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORIES;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;

                // Fetch category info to get the name
                const categoriesResponse = await fetch(`${apiBaseUrl}${categoriesEndpoint}/${storeId}`);
                if (categoriesResponse.ok) {
                    const categoriesData = await categoriesResponse.json();
                    if (categoriesData.success && categoriesData.data) {
                        const category = categoriesData.data.find(cat => cat.category_id.toString() === slug);
                        if (category) {
                            setCategoryName(category.name);
                        } else {
                            setCategoryName('Category');
                        }
                    }
                }

                // Fetch products for this category
                const response = await fetch(`${apiBaseUrl}${productsEndpoint}/${slug}`);
                const data = await response.json();

                if (data.success && data.data) {
                    // Process products similar to ProductContext
                    const processedProducts = data.data.map(product => {
                        // Get lowest price from imeis
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
                            inStock: product.status === "In stock",
                            image: product.image_path,
                            brand: product.brand_name,
                            brandId: product.brand_id,
                            stock: product.current_stock,
                            rating: parseFloat(product.review_summary?.average_rating) || 0,
                            reviews: product.review_summary?.total_reviews || 0,
                            imeis: product.imeis || [],
                            brands: product.brands
                        };
                    });

                    setProducts(processedProducts);

                    // Set initial price range based on products
                    if (processedProducts.length > 0) {
                        const prices = processedProducts.map(p => p.price);
                        setPriceRange({
                            min: Math.floor(Math.min(...prices)),
                            max: Math.ceil(Math.max(...prices))
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching category products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [slug]);

    // Extract unique brands from products
    const uniqueBrands = useMemo(() => {
        const brandMap = new Map();
        products.forEach(product => {
            if (product.brandId && product.brand && !brandMap.has(product.brandId)) {
                brandMap.set(product.brandId, {
                    id: product.brandId,
                    name: product.brand
                });
            }
        });
        return Array.from(brandMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [products]);

    // Extract unique colors from all product variants
    const availableColors = useMemo(() => {
        const colorMap = new Map();
        products.forEach(product => {
            product.imeis.forEach(imei => {
                if (imei.color && imei.color_code && !colorMap.has(imei.color)) {
                    colorMap.set(imei.color, {
                        name: imei.color,
                        code: imei.color_code
                    });
                }
            });
        });
        return Array.from(colorMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [products]);

    // Extract unique storage options
    const availableStorage = useMemo(() => {
        const storageSet = new Set();
        products.forEach(product => {
            product.imeis.forEach(imei => {
                if (imei.storage) {
                    storageSet.add(imei.storage);
                }
            });
        });
        return Array.from(storageSet).sort((a, b) => parseInt(a) - parseInt(b));
    }, [products]);

    // Extract unique regions
    const availableRegions = useMemo(() => {
        const regionSet = new Set();
        products.forEach(product => {
            product.imeis.forEach(imei => {
                if (imei.region) {
                    regionSet.add(imei.region);
                }
            });
        });
        return Array.from(regionSet).sort();
    }, [products]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // Filter by price
        filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

        // Filter by availability
        if (availability === 'in-stock') {
            filtered = filtered.filter(p => p.inStock);
        } else if (availability === 'pre-order') {
            filtered = filtered.filter(p => !p.inStock);
        }

        // Filter by brand
        if (selectedBrand !== null) {
            filtered = filtered.filter(p => p.brandId === selectedBrand);
        }

        // Filter by color
        if (selectedColors.length > 0) {
            filtered = filtered.filter(p =>
                p.imeis.some(imei => selectedColors.includes(imei.color))
            );
        }

        // Filter by storage
        if (selectedStorage.length > 0) {
            filtered = filtered.filter(p =>
                p.imeis.some(imei => selectedStorage.includes(imei.storage))
            );
        }

        // Filter by region
        if (selectedRegions.length > 0) {
            filtered = filtered.filter(p =>
                p.imeis.some(imei => selectedRegions.includes(imei.region))
            );
        }

        // Filter by battery life
        if (selectedBatteryRange) {
            filtered = filtered.filter(p =>
                p.imeis.some(imei => {
                    if (!imei.battery_life) return false;

                    let battery = parseInt(imei.battery_life);

                    // Handle "Brand New" as 100%
                    if (isNaN(battery) && typeof imei.battery_life === 'string' && imei.battery_life.toLowerCase().includes('brand new')) {
                        battery = 100;
                    }

                    return !isNaN(battery) && battery >= selectedBatteryRange.min && battery <= selectedBatteryRange.max;
                })
            );
        }

        // Sort products
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'discount':
                filtered.sort((a, b) => b.discount - a.discount);
                break;
            case 'newest':
                // Assuming products are already sorted by newest from API
                break;
            default:
                // Keep default order
                break;
        }

        return filtered;
    }, [products, priceRange, availability, selectedBrand, selectedColors, sortBy, selectedBatteryRange, selectedStorage, selectedRegions]);

    // Handle color selection toggle
    const handleColorChange = (colorName) => {
        setSelectedColors(prev =>
            prev.includes(colorName)
                ? prev.filter(c => c !== colorName)
                : [...prev, colorName]
        );
    };

    // Handle storage selection toggle
    const handleStorageChange = (storage) => {
        setSelectedStorage(prev =>
            prev.includes(storage)
                ? prev.filter(s => s !== storage)
                : [...prev, storage]
        );
    };

    // Handle region selection toggle
    const handleRegionChange = (region) => {
        setSelectedRegions(prev =>
            prev.includes(region)
                ? prev.filter(r => r !== region)
                : [...prev, region]
        );
    };

    // Clear all filters
    const handleClearFilters = () => {
        if (products.length > 0) {
            const prices = products.map(p => p.price);
            setPriceRange({
                min: Math.floor(Math.min(...prices)),
                max: Math.ceil(Math.max(...prices))
            });
        }
        setAvailability('all');
        setSelectedColors([]);
        setSelectedBrand(null);
        setSelectedBatteryRange(null);
        setSelectedStorage([]);
        setSelectedRegions([]);
        setSortBy('default');
    };

    if (!slug) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="container py-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">{categoryName || 'Loading...'}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar Filters - Desktop */}
                    <div className="hidden lg:block">
                        <CategoryFilters
                            priceRange={priceRange}
                            onPriceChange={setPriceRange}
                            availability={availability}
                            onAvailabilityChange={setAvailability}
                            selectedColors={selectedColors}
                            onColorChange={handleColorChange}
                            availableColors={availableColors}
                            selectedStorage={selectedStorage}
                            onStorageChange={handleStorageChange}
                            availableStorage={availableStorage}
                            selectedRegions={selectedRegions}
                            onRegionChange={handleRegionChange}
                            availableRegions={availableRegions}
                            onClearFilters={handleClearFilters}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Brand Filter */}
                        {uniqueBrands.length > 0 && (
                            <BrandFilter
                                brands={uniqueBrands}
                                selectedBrand={selectedBrand}
                                onBrandChange={setSelectedBrand}
                            />
                        )}

                        {/* Battery Life Filter - Only show for Used Phone category */}
                        {categoryName === 'Used Phone' && (
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-foreground mb-3">Battery Health</h3>
                                <div className="overflow-x-auto pb-2 scrollbar-hide">
                                    <div className="flex items-center gap-2 min-w-max">
                                        {batteryRanges.map((range) => (
                                            <button
                                                key={range.label}
                                                onClick={() => setSelectedBatteryRange(
                                                    selectedBatteryRange?.label === range.label ? null : range
                                                )}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedBatteryRange?.label === range.label
                                                    ? "bg-[#10B981] text-white shadow-md"
                                                    : "bg-white border border-border text-foreground hover:bg-secondary"
                                                    }`}
                                            >
                                                {range.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Header with count and sort */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-primary">Products of {categoryName || 'Category'}</h1>
                                <button
                                    onClick={() => setShowMobileFilters(true)}
                                    className="lg:hidden p-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                                >
                                    <SlidersHorizontal className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <p className="text-sm text-muted-foreground">
                                    Showing 1 to {filteredProducts.length} from {products.length} Products
                                </p>

                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none px-4 py-2 pr-10 border border-border rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                                    >
                                        <option value="default">Default</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="newest">Newest First</option>
                                        <option value="discount">Discount: High to Low</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {loading ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">Loading products...</p>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} category={categoryName} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-card rounded-xl border border-border">
                                <p className="text-muted-foreground">No products found matching your filters.</p>
                                <button
                                    onClick={handleClearFilters}
                                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filters Modal */}
            {showMobileFilters && (
                <CategoryFilters
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    availability={availability}
                    onAvailabilityChange={setAvailability}
                    selectedColors={selectedColors}
                    onColorChange={handleColorChange}
                    availableColors={availableColors}
                    selectedStorage={selectedStorage}
                    onStorageChange={handleStorageChange}
                    availableStorage={availableStorage}
                    selectedRegions={selectedRegions}
                    onRegionChange={handleRegionChange}
                    availableRegions={availableRegions}
                    onClearFilters={handleClearFilters}
                    isMobile={true}
                    onClose={() => setShowMobileFilters(false)}
                />
            )}

            <Footer />
        </main>
    );
}
