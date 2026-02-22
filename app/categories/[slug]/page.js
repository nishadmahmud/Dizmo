"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import CategoryFilters from "@/components/CategoryFilters";
import BrandFilter from "@/components/BrandFilter";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SectionLoader from "@/components/SectionLoader";

// Curated vibrant colors for banners
const bannerColors = [
    'bg-[#103E34]', // Brand Green
    'bg-[#FCB042]', // Brand Orange
    'bg-[#2563eb]', // Blue
    'bg-[#7c3aed]', // Purple
    'bg-[#059669]', // Emerald
    'bg-[#dc2626]', // Red
    'bg-[#ea580c]', // Orange-Red
    'bg-[#1e293b]', // Slate
    'bg-[#000000]', // Black
    'bg-[#4f46e5]', // Indigo
    'bg-[#0891b2]', // Cyan
    'bg-[#be185d]', // Pink
];

// Helper to get random color
const getRandomColor = () => {
    return bannerColors[Math.floor(Math.random() * bannerColors.length)];
};

export default function CategoryDetailPage({ params }) {
    const searchParams = useSearchParams();
    const brandFromUrl = searchParams.get('brand');
    const subcategoryId = searchParams.get('sub'); // Subcategory filter from Navbar

    const [allPages, setAllPages] = useState({}); // Store all fetched pages {1: [...products], 2: [...products]}
    const [loading, setLoading] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [subcategoryName, setSubcategoryName] = useState(''); // Name of the active subcategory
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPagesKnown, setTotalPagesKnown] = useState(1);
    const [isFetchingBackground, setIsFetchingBackground] = useState(false);

    // New state for dynamic banner color
    const [bannerColor, setBannerColor] = useState('bg-[#103E34]');

    // State for brand banners from API
    const [brandBanners, setBrandBanners] = useState({});

    // State for category banner from API
    const [categoryBanner, setCategoryBanner] = useState(null);

    // Filter States
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
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

    // Set brand from URL parameter when it changes
    useEffect(() => {
        if (brandFromUrl) {
            setSelectedBrand(parseInt(brandFromUrl));
        }
    }, [brandFromUrl]);

    // Set random banner color on mount or when category/brand changes
    useEffect(() => {
        setBannerColor(getRandomColor());
    }, [slug, selectedBrand]);

    // Fetch category name
    useEffect(() => {
        if (!slug) return;

        const fetchCategoryName = async () => {
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const categoriesEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORIES;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;

                const categoriesResponse = await fetch(`${apiBaseUrl}${categoriesEndpoint}/${storeId}`);
                if (categoriesResponse.ok) {
                    const categoriesData = await categoriesResponse.json();
                    if (categoriesData.success && categoriesData.data) {
                        const category = categoriesData.data.find(cat => cat.category_id.toString() === slug);
                        setCategoryName(category ? category.name : 'Category');
                        // Store category banner if available
                        setCategoryBanner(category?.banner || null);
                    }
                }
            } catch (error) {
                console.error("Error fetching category name:", error);
            }
        };

        fetchCategoryName();
    }, [slug]);

    // Resolve subcategory name whenever slug or subcategoryId changes
    useEffect(() => {
        if (!slug || !subcategoryId) {
            setSubcategoryName('');
            return;
        }
        const resolveSubcategoryName = async () => {
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const categoriesEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORIES;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;
                const res = await fetch(`${apiBaseUrl}${categoriesEndpoint}/${storeId}`);
                if (!res.ok) return;
                const data = await res.json();
                if (data.success && data.data) {
                    const category = data.data.find(cat => cat.category_id.toString() === slug);
                    if (category && Array.isArray(category.sub_category)) {
                        const sub = category.sub_category.find(s => s.id.toString() === subcategoryId.toString());
                        if (sub) setSubcategoryName(sub.name);
                    }
                }
            } catch (e) {
                console.error('Error resolving subcategory name:', e);
            }
        };
        resolveSubcategoryName();
    }, [slug, subcategoryId]);

    // Helper function to fetch and process a single page
    const fetchProductsPage = async (page) => {
        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            const limit = 20;

            let url;
            if (subcategoryId) {
                // Subcategory mode: use subcategorywise-products endpoint
                const subcategoryEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_SUBCATEGORY_PRODUCTS;
                url = `${apiBaseUrl}${subcategoryEndpoint}/${subcategoryId}?page=${page}`;
            } else {
                // Default category mode
                const productsEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORY_PRODUCTS;
                url = `${apiBaseUrl}${productsEndpoint}/${slug}?page=${page}&limit=${limit}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                return { products: [], brandBanners: {} };
            }

            const data = await response.json();

            if (!data.success || !data.data || data.data.length === 0) {
                return { products: [], brandBanners: {} };
            }

            // Extract brand banners from filter_options (only on first page typically has this)
            const apiBrandBanners = data.filter_options?.brand_banners || {};

            // Process products
            const products = data.data.map(product => {
                // Get the base retail price (this is the original price before any discount)
                const retailPrice = parseFloat(product.retails_price);

                // Check if there are IMEI prices (variant prices)
                let currentPrice = retailPrice;
                if (product.imeis && product.imeis.length > 0) {
                    const prices = product.imeis.map(imei => parseFloat(imei.sale_price));
                    currentPrice = Math.min(...prices);
                }

                // Get discount information
                const discountValue = parseFloat(product.discount) || 0;
                const discountType = product.discount_type || 'Percentage';

                // Calculate final price and original price based on discount type
                let finalPrice = currentPrice;
                let originalPrice = retailPrice;

                if (discountValue > 0) {
                    if (discountType === 'Fixed') {
                        // For fixed discount: final price = retail price - discount amount
                        finalPrice = retailPrice - discountValue;
                        originalPrice = retailPrice;
                    } else {
                        // For percentage discount: final price = retail price - (retail price * discount / 100)
                        finalPrice = retailPrice - (retailPrice * discountValue / 100);
                        originalPrice = retailPrice;
                    }
                }

                return {
                    id: product.id,
                    name: product.name,
                    price: finalPrice,
                    originalPrice: discountValue > 0 ? originalPrice : null,
                    discount: discountValue,
                    discountType: discountType,
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

            return { products, brandBanners: apiBrandBanners };
        } catch (error) {
            console.error(`Error fetching page ${page}:`, error);
            return { products: [], brandBanners: {} };
        }
    };

    // Initial load - fetch first page and then background fetch remaining
    useEffect(() => {
        if (!slug) return;

        const loadInitialAndBackground = async () => {
            setLoading(true);
            setCurrentPage(1);
            setTotalPagesKnown(1);
            setAllPages({});
            setBrandBanners({});

            // Fetch first page immediately
            const { products: firstPageProducts, brandBanners: apiBrandBanners } = await fetchProductsPage(1);

            // Store brand banners from first page (this is where filter_options is returned)
            if (Object.keys(apiBrandBanners).length > 0) {
                setBrandBanners(apiBrandBanners);
            }

            if (firstPageProducts.length > 0) {
                setAllPages({ 1: firstPageProducts });
            }

            setLoading(false);

            // Start background fetching of remaining pages
            if (firstPageProducts.length === 20) {
                fetchRemainingPagesInBackground();
            }
        };

        const fetchRemainingPagesInBackground = async () => {
            setIsFetchingBackground(true);
            let page = 2;

            while (true) {
                const { products: pageProducts } = await fetchProductsPage(page);

                if (pageProducts.length === 0) {
                    setIsFetchingBackground(false);
                    break;
                }

                // Store this page
                setAllPages(prev => ({ ...prev, [page]: pageProducts }));
                setTotalPagesKnown(page);

                // If we got fewer than 20, this is the last page
                if (pageProducts.length < 20) {
                    setIsFetchingBackground(false);
                    break;
                }

                page++;
            }
        };

        loadInitialAndBackground();
    }, [slug, subcategoryId]); // Re-fetch when subcategoryId changes too

    // Navigate to specific page (instant since data is already fetched)
    const goToPage = (page) => {
        if (page === currentPage || page < 1) return;

        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    // Get ALL products from all pages for filtering
    const allProducts = useMemo(() => Object.values(allPages).flat(), [allPages]);

    // Extract unique brands from ALL products
    const uniqueBrands = useMemo(() => {
        const brandMap = new Map();
        allProducts.forEach(product => {
            if (product.brandId && product.brand && !brandMap.has(product.brandId)) {
                brandMap.set(product.brandId, {
                    id: product.brandId,
                    name: product.brand
                });
            }
        });
        return Array.from(brandMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [allProducts]);

    // Extract unique colors from all product variants
    const availableColors = useMemo(() => {
        const colorMap = new Map();
        allProducts.forEach(product => {
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
    }, [allProducts]);

    // Extract unique storage options
    const availableStorage = useMemo(() => {
        const storageSet = new Set();
        allProducts.forEach(product => {
            product.imeis.forEach(imei => {
                if (imei.storage) {
                    storageSet.add(imei.storage);
                }
            });
        });
        return Array.from(storageSet).sort((a, b) => parseInt(a) - parseInt(b));
    }, [allProducts]);

    // Extract unique regions
    const availableRegions = useMemo(() => {
        const regionSet = new Set();
        allProducts.forEach(product => {
            product.imeis.forEach(imei => {
                if (imei.region) {
                    regionSet.add(imei.region);
                }
            });
        });
        return Array.from(regionSet).sort();
    }, [allProducts]);

    // Filter and sort products from ALL products
    const filteredProducts = useMemo(() => {
        let filtered = [...allProducts];

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
    }, [allProducts, priceRange, availability, selectedBrand, selectedColors, sortBy, selectedBatteryRange, selectedStorage, selectedRegions]);

    // Calculate total pages based on filtered results
    const totalFilteredPages = Math.ceil(filteredProducts.length / 20);

    // Get products for current page from filtered results
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * 20;
        const endIndex = startIndex + 20;
        return filteredProducts.slice(startIndex, endIndex);
    }, [filteredProducts, currentPage]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedBrand, selectedColors, selectedStorage, selectedRegions, selectedBatteryRange, availability]);

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
        if (allProducts.length > 0) {
            const prices = allProducts.map(p => p.price);
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

            {/* Universal Dynamic Banner */}
            {(() => {
                let bannerText = '';
                let subText = 'Explore our collection';
                let brandBannerUrl = null;

                // Always try to get categoryName first as fallback
                if (categoryName) {
                    bannerText = categoryName;
                    subText = `Browse the best ${categoryName} in town`;
                }

                // Override with subcategory name if filtering by subcategory
                if (subcategoryName) {
                    bannerText = subcategoryName;
                    subText = `Browse the best ${subcategoryName} in ${categoryName}`;
                }

                // Override with brand name if a brand is selected and found
                if (selectedBrand && uniqueBrands.length > 0) {
                    const brandObj = uniqueBrands.find(b => b.id === selectedBrand);
                    if (brandObj) {
                        bannerText = brandObj.name;
                        subText = `Check out the latest products from ${brandObj.name}`;

                        // Check if we have a banner image for this brand
                        if (brandBanners[selectedBrand]) {
                            brandBannerUrl = brandBanners[selectedBrand];
                        }
                    }
                }

                if (!bannerText) return <div className="pt-6"></div>; // Placeholder space if loading

                // If we have a brand banner image, show it without overlay
                if (brandBannerUrl) {
                    return (
                        <div className="container pt-6">
                            {/* Mobile: maintain aspect ratio */}
                            <div className="md:hidden w-full rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src={brandBannerUrl}
                                    alt={bannerText}
                                    width={1000}
                                    height={1000}
                                    className="w-full h-auto"
                                    unoptimized
                                />
                            </div>
                            {/* Desktop: fixed height cover */}
                            <div className="hidden md:block relative h-52 w-full rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src={brandBannerUrl}
                                    alt={bannerText}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>
                    );
                }

                // If no brand selected and we have a category banner, show it without overlay
                if (!selectedBrand && categoryBanner) {
                    return (
                        <div className="container pt-6">
                            {/* Mobile: maintain aspect ratio */}
                            <div className="md:hidden w-full rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src={categoryBanner}
                                    alt={bannerText}
                                    width={1000}
                                    height={1000}
                                    className="w-full h-auto"
                                    unoptimized
                                />
                            </div>
                            {/* Desktop: fixed height cover */}
                            <div className="hidden md:block relative h-52 w-full rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src={categoryBanner}
                                    alt={bannerText}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>
                    );
                }

                // Fallback to text-based colored banner
                return (
                    <div className="container pt-6">
                        <div className={`relative h-40 md:h-52 w-full rounded-2xl overflow-hidden shadow-lg transition-colors duration-500 ${bannerColor} flex flex-col items-center justify-center text-center px-4`}>
                            {/* Texture Overlay (optional) */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                            <div className="relative z-10">
                                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-md">
                                    {bannerText}
                                </h1>
                                <p className="text-white/90 text-sm md:text-lg font-medium tracking-wide">
                                    {subText}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })()}

            <div className="container py-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
                    <span>/</span>
                    {subcategoryName ? (
                        <>
                            <Link href={`/categories/${slug}`} className="hover:text-primary transition-colors">{categoryName}</Link>
                            <span>/</span>
                            <span className="text-foreground font-medium">{subcategoryName}</span>
                        </>
                    ) : (
                        <span className="text-foreground font-medium">
                            {categoryName || 'Loading...'}
                        </span>
                    )}
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
                                <h1 className="text-2xl font-bold text-primary">
                                    {subcategoryName ? (
                                        <>
                                            {subcategoryName} <span className="text-muted-foreground font-normal text-lg">in {categoryName}</span>
                                        </>
                                    ) : (
                                        `Products of ${categoryName || 'Category'}`
                                    )}
                                </h1>
                                <button
                                    onClick={() => setShowMobileFilters(true)}
                                    className="lg:hidden p-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                                >
                                    <SlidersHorizontal className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <p className="text-sm text-muted-foreground">
                                    Showing {((currentPage - 1) * 20) + 1} to {Math.min(currentPage * 20, filteredProducts.length)} from {filteredProducts.length} Products
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
                            <SectionLoader />
                        ) : paginatedProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {paginatedProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} category={categoryName} />
                                    ))}
                                </div>


                                {/* Pagination */}
                                {totalFilteredPages > 1 && (
                                    <div className="flex justify-center items-center gap-2 mt-8">
                                        {/* Previous Button */}
                                        <button
                                            onClick={() => goToPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>

                                        {/* Page Numbers */}
                                        {[...Array(totalFilteredPages)].map((_, idx) => {
                                            const pageNum = idx + 1;

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => goToPage(pageNum)}
                                                    className={`min-w-[40px] h-10 rounded-lg font-medium transition-all ${pageNum === currentPage
                                                        ? 'bg-primary text-white'
                                                        : 'border border-border hover:bg-secondary'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        {/* Next Button */}
                                        <button
                                            onClick={() => goToPage(currentPage + 1)}
                                            disabled={currentPage >= totalFilteredPages}
                                            className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </>
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

        </main>
    );
}
