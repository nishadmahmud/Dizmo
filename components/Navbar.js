"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
    Search, ShoppingCart, Menu, Zap, FileText, GitCompare, MapPin, Package, Home,
    Smartphone, Laptop, Tablet, Watch, Headphones, Cable, Gamepad2, Camera, X, Mic, ArrowRight, User, Battery, LayoutGrid, Speaker,
    MonitorSmartphone, TabletSmartphone, MonitorPlay, Volume2, RefreshCcw, Plug2, ChevronDown, ChevronRight
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProduct } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Default categories with icons as fallback
const defaultCategories = [
    { id: "phones", name: "Phones", Icon: Smartphone },
    { id: "laptops", name: "Laptops", Icon: Laptop },
    { id: "tablets", name: "Tablets", Icon: Tablet },
    { id: "watches", name: "Smart Watches", Icon: Watch },
    { id: "audio", name: "Audio", Icon: Headphones },
    { id: "accessories", name: "Accessories", Icon: Cable },
    { id: "gadgets", name: "Gadgets", Icon: Gamepad2 },
    { id: "cameras", name: "Cameras", Icon: Camera },
];

// Icon mapping for categories
const iconMap = {
    // Navbar categories (primary)
    "Phones": Smartphone,
    "Tablet": TabletSmartphone,         // Tablet-specific icon
    "Laptop": Laptop,
    "Smart Watch": Watch,
    "Airpods": Headphones,
    "Gadget": Zap,
    "Gadgets": Zap,
    "Accessories": Plug2,
    "Sounds": Speaker,
    "Used Phone": RefreshCcw,
};

// Category whitelist - only these categories will be shown in navbar (in order)
const NAVBAR_CATEGORIES = [
    "Phones",
    "Tablet",
    "Laptop",
    "Smart Watch",
    "Gadgets",
    "Accessories",
    "Sounds",
    "Used Phone"
];

export default function Navbar() {
    const { openDrawer, cartCount } = useCart();
    const { searchProducts } = useProduct();
    const { isAuthenticated } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const recognitionRef = useRef(null);

    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [categories, setCategories] = useState(defaultCategories);
    const [categoryBrands, setCategoryBrands] = useState({});
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [hoveredSidebarCategory, setHoveredSidebarCategory] = useState(null);
    const [loadingBrands, setLoadingBrands] = useState({});
    const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
    const [brandsPreloaded, setBrandsPreloaded] = useState(false);

    // Search State
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isListening, setIsListening] = useState(false);

    // localStorage key for cached brands
    const BRANDS_CACHE_KEY = 'dizmo_category_brands';
    const BRANDS_CACHE_EXPIRY_KEY = 'dizmo_category_brands_expiry';
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Load cached brands from localStorage on mount
    useEffect(() => {
        try {
            const cachedBrands = localStorage.getItem(BRANDS_CACHE_KEY);
            const cacheExpiry = localStorage.getItem(BRANDS_CACHE_EXPIRY_KEY);

            if (cachedBrands && cacheExpiry) {
                const expiryTime = parseInt(cacheExpiry);
                if (Date.now() < expiryTime) {
                    // Cache is still valid
                    const parsedBrands = JSON.parse(cachedBrands);
                    setCategoryBrands(parsedBrands);
                    setBrandsPreloaded(true);
                    console.log('Loaded brands from localStorage cache');
                } else {
                    // Cache expired, clear it
                    localStorage.removeItem(BRANDS_CACHE_KEY);
                    localStorage.removeItem(BRANDS_CACHE_EXPIRY_KEY);
                }
            }
        } catch (error) {
            console.error('Error loading cached brands:', error);
        }
    }, []);

    // Function to fetch brands for a single category (used for preloading)
    const fetchBrandsForCategory = async (categoryId) => {
        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            const productsEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORY_PRODUCTS;

            let allProducts = [];
            const limit = 20;
            const maxPages = 2;

            for (let page = 1; page <= maxPages; page++) {
                try {
                    const url = `${apiBaseUrl}${productsEndpoint}/${categoryId}?page=${page}&limit=${limit}`;
                    const response = await fetch(url);
                    if (!response.ok) break;

                    const data = await response.json();
                    if (!data.success || !data.data || data.data.length === 0) break;

                    allProducts.push(...data.data);

                    if (data.data.length < limit) break;
                } catch (e) {
                    break;
                }
            }

            if (allProducts.length > 0) {
                const uniqueBrands = [];
                const brandIds = new Set();

                allProducts.forEach(product => {
                    let brandId, brandName;

                    if (product.brand_id && product.brand_name) {
                        brandId = product.brand_id;
                        brandName = product.brand_name;
                    } else if (product.brands && product.brands.id) {
                        brandId = product.brands.id;
                        brandName = product.brands.name;
                    }

                    if (brandId && brandName && !brandIds.has(brandId)) {
                        brandIds.add(brandId);
                        uniqueBrands.push({ id: brandId, name: brandName });
                    }
                });

                uniqueBrands.sort((a, b) => a.name.localeCompare(b.name));
                return uniqueBrands;
            }
            return [];
        } catch (error) {
            console.error(`Error fetching brands for category ${categoryId}:`, error);
            return [];
        }
    };

    // Preload all category brands in background after categories are loaded
    useEffect(() => {
        if (categories.length === 0 || brandsPreloaded) return;

        const preloadAllBrands = async () => {
            console.log('Preloading brands for all categories in background...');
            const allBrands = {};

            // Fetch brands for all categories in parallel (with small batches to avoid overload)
            const batchSize = 3;
            for (let i = 0; i < categories.length; i += batchSize) {
                const batch = categories.slice(i, i + batchSize);
                const results = await Promise.all(
                    batch.map(async (cat) => {
                        const brands = await fetchBrandsForCategory(cat.id);
                        return { categoryId: cat.id, brands };
                    })
                );

                results.forEach(({ categoryId, brands }) => {
                    if (brands.length > 0) {
                        allBrands[categoryId] = brands;
                    }
                });
            }

            // Update state with all brands
            setCategoryBrands(prev => ({ ...prev, ...allBrands }));
            setBrandsPreloaded(true);

            // Save to localStorage
            try {
                localStorage.setItem(BRANDS_CACHE_KEY, JSON.stringify({ ...categoryBrands, ...allBrands }));
                localStorage.setItem(BRANDS_CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
                console.log('Brands cached to localStorage');
            } catch (error) {
                console.error('Error saving brands to localStorage:', error);
            }
        };

        // Start preloading after a short delay to not block initial render
        const timer = setTimeout(preloadAllBrands, 1000);
        return () => clearTimeout(timer);
    }, [categories, brandsPreloaded]);

    // Fetch brands on hover (fallback if not preloaded)
    const fetchCategoryBrands = async (categoryId) => {
        // If brands already loaded, don't fetch again
        if (categoryBrands[categoryId]) return;

        setLoadingBrands(prev => ({ ...prev, [categoryId]: true }));

        const brands = await fetchBrandsForCategory(categoryId);

        if (brands.length > 0) {
            setCategoryBrands(prev => {
                const updated = { ...prev, [categoryId]: brands };
                // Also update localStorage
                try {
                    localStorage.setItem(BRANDS_CACHE_KEY, JSON.stringify(updated));
                    localStorage.setItem(BRANDS_CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
                } catch (e) { }
                return updated;
            });
        }

        setLoadingBrands(prev => ({ ...prev, [categoryId]: false }));
    };

    const handleTopCategoryHover = (categoryId) => {
        setHoveredCategory(categoryId);
        fetchCategoryBrands(categoryId);
    };

    const handleSidebarCategoryHover = (categoryId) => {
        setHoveredSidebarCategory(categoryId);
        fetchCategoryBrands(categoryId);
    };

    // Handle Voice Search
    const handleVoiceSearch = () => {
        if (isListening) {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
                setIsListening(false);
            }
            return;
        }

        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("Voice search is not supported in this browser.");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setSearchQuery(transcript);

            // Trigger search with the spoken text
            const results = searchProducts(transcript);
            setSearchResults(results.slice(0, 5));
            setShowResults(true);
        };

        recognition.onerror = (event) => {
            console.error("Voice search error:", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
            recognitionRef.current = null;
        };

        recognition.start();
    };

    // Handle search input change
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            const results = searchProducts(query);
            setSearchResults(results.slice(0, 5)); // Limit to 5 results
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    };

    // Handle search submit (Enter key)
    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            setShowResults(false);
            setShowSearch(false); // Close mobile search if open
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    // Handle clicking a search result
    const handleResultClick = (productId) => {
        setSearchQuery("");
        setShowResults(false);
        setShowSearch(false);
        router.push(`/products/${productId}`);
    };

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setShowResults(false);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

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
                        // Log all categories from API to help debug
                        console.log('All categories from API:', data.data.map(cat => cat.name));

                        // Filter categories to only include whitelisted ones
                        const filteredCategories = data.data
                            .filter(cat => NAVBAR_CATEGORIES.includes(cat.name))
                            .map((cat) => ({
                                id: cat.category_id.toString(),
                                name: cat.name,
                                Icon: iconMap[cat.name] || Package
                            }));

                        // Remove duplicates by ID (in case API returns duplicates)
                        const uniqueCategories = Array.from(
                            new Map(filteredCategories.map(cat => [cat.name, cat])).values()
                        );

                        // Sort categories based on whitelist order
                        const sortedCategories = uniqueCategories.sort((a, b) => {
                            return NAVBAR_CATEGORIES.indexOf(a.name) - NAVBAR_CATEGORIES.indexOf(b.name);
                        });

                        console.log('Filtered navbar categories:', sortedCategories.map(cat => cat.name));
                        setCategories(sortedCategories);
                    }
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                // Keep default categories on error
            }
        };

        fetchCategories();
    }, []);

    // Hide category bar on products page
    const showCategoryBar = pathname !== "/products";

    return (
        <>
            {/* Main Navbar */}
            <nav className="sticky top-0 z-50 w-full border-b border-[#103E34]/20 bg-[#103E34]">
                <div className="container flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/dizmo_logo_1.png"
                            alt="DIZMO"
                            width={120}
                            height={40}
                            className="h-10 w-auto"
                            unoptimized
                        />
                    </Link>

                    {/* Search Bar (Visible on all screens) */}
                    <div className="flex flex-1 max-w-xl mx-2 lg:mx-6 relative" onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder={isListening ? "Listening..." : "Search gadgets..."}
                                value={searchQuery}
                                onChange={handleSearch}
                                onKeyDown={handleSearchSubmit}
                                className={`w-full rounded-full border bg-secondary py-2 pl-10 pr-10 text-base md:text-sm outline-none focus:ring-2 focus:ring-ring transition-all ${isListening ? 'border-red-500 ring-2 ring-red-500/20 placeholder:text-red-500' : 'border-input'}`}
                            />
                            <button
                                onClick={handleVoiceSearch}
                                className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-muted-foreground hover:text-primary'}`}
                            >
                                <Mic className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Search Results Dropdown - Responsive */}
                        {showResults && (
                            <div className="fixed md:absolute left-2 right-2 md:left-0 md:right-0 top-16 md:top-full mt-0 md:mt-2 bg-background border border-border rounded-xl shadow-2xl overflow-hidden z-[100] md:z-50 max-h-[70vh] md:max-h-[80vh] overflow-y-auto">
                                {searchResults.length > 0 ? (
                                    <div className="flex flex-col md:flex-row">
                                        {/* Left Column - Categories (Hidden on Mobile) */}
                                        <div className="hidden md:block md:w-1/3 border-r border-border bg-gray-50/50 p-4">
                                            <h3 className="font-bold text-sm text-foreground mb-3">Categories</h3>
                                            <ul className="space-y-2">
                                                {/* Get unique categories from search results */}
                                                {[...new Set(searchResults.map(p => p.category || 'Products'))].slice(0, 8).map((category, idx) => (
                                                    <li key={idx}>
                                                        <button
                                                            onClick={() => {
                                                                router.push(`/products?search=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(category)}`);
                                                                setShowResults(false);
                                                            }}
                                                            className="text-sm text-muted-foreground hover:text-[#FCB042] transition-colors text-left w-full truncate"
                                                        >
                                                            {category}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Right Column - Products Grid */}
                                        <div className="w-full md:w-2/3 p-3 md:p-4">
                                            <div className="flex items-center justify-between mb-3 md:mb-4">
                                                <h3 className="font-bold text-sm text-foreground">Products</h3>
                                                <button
                                                    onClick={() => {
                                                        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                                                        setShowResults(false);
                                                    }}
                                                    className="text-sm text-[#FCB042] hover:text-[#e5a03d] font-medium flex items-center gap-1"
                                                >
                                                    View all <ChevronRight className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                                                {searchResults.slice(0, 6).map((product) => {
                                                    const discount = product.originalPrice && product.originalPrice > product.price
                                                        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                                                        : 0;

                                                    return (
                                                        <button
                                                            key={product.id}
                                                            onClick={() => handleResultClick(product.id)}
                                                            className="bg-white border border-border rounded-lg p-2 hover:shadow-md hover:border-[#FCB042]/50 transition-all text-left group"
                                                        >
                                                            {/* Product Image */}
                                                            <div className="aspect-square rounded-md bg-gray-50 overflow-hidden mb-2 relative">
                                                                <Image
                                                                    unoptimized
                                                                    src={product.image}
                                                                    alt={product.name}
                                                                    fill
                                                                    className="object-contain p-1 md:p-2 group-hover:scale-105 transition-transform"
                                                                />
                                                            </div>

                                                            {/* Product Name */}
                                                            <p className="text-[10px] md:text-xs font-medium text-foreground line-clamp-2 mb-1 min-h-[2rem]">
                                                                {product.name}
                                                            </p>

                                                            {/* Price */}
                                                            <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                                                                <span className="text-xs md:text-sm font-bold text-foreground">
                                                                    ৳{product.price.toLocaleString()}
                                                                </span>
                                                                {product.originalPrice && product.originalPrice > product.price && (
                                                                    <span className="text-[8px] md:text-[10px] font-bold text-[#FCB042] bg-[#FCB042]/10 px-1 py-0.5 rounded">
                                                                        {discount}% OFF
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-6 md:p-8 text-center text-muted-foreground">
                                        <Search className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">No products found for "{searchQuery}"</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-5 text-base font-semibold">
                        {/* Offers Link - visible on desktop beside search */}
                        <Link
                            href="/offers"
                            className="hidden lg:flex items-center gap-2 text-[#FCB042] hover:text-white hover:bg-[#FCB042] transition-all px-4 py-2 rounded-full bg-white/10 font-bold text-base shadow-[0_0_15px_rgba(252,176,66,0.5)] hover:shadow-[0_0_25px_rgba(252,176,66,0.8)] border border-[#FCB042]/50 animate-pulse hover:animate-none"
                        >

                            <span><span className="animate-bounce inline-block">🔥</span> Offers</span>
                        </Link>
                        <Link href="/categories" className="flex items-center gap-2 text-white hover:text-[#FCB042] transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                            <Package className="h-5 w-5" />
                            All Products
                        </Link>

                        <Link href="/track-order" className="flex items-center gap-2 text-white hover:text-[#FCB042] transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                            <Package className="h-5 w-5" />
                            Track Order
                        </Link>

                        <Link
                            href="/store-locations"
                            className="flex items-center gap-2 text-white hover:text-[#FCB042] transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                        >
                            <MapPin className="h-5 w-5 flex-shrink-0" />
                            <span className="text-xs leading-tight">
                                Store<br />Location
                            </span>
                        </Link>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-3">




                        <button
                            onClick={openDrawer}
                            className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors relative"
                        >
                            <ShoppingCart className="h-5 w-5 text-white" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center text-[10px] font-bold rounded-full bg-[#FCB042] text-white ring-2 ring-[#103E34]">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <Link
                            href="/login"
                            className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <User className="h-5 w-5 text-white" />
                        </Link>

                        <button
                            onClick={() => setShowMenu(true)}
                            className="md:hidden p-2 hover:bg-white/10 rounded-full"
                        >
                            <Menu className="h-5 w-5 text-white" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Category Bar - Slimmer (Hidden on products page) */}
            {/* Category Bar - Slimmer (Hidden on products page) */}
            {/* Category Bar - Slimmer (Hidden on products page) */}
            {showCategoryBar && (
                <div className="hidden md:block sticky top-16 z-40 w-full border-b border-border bg-white py-2 shadow-sm">
                    <div className="container flex items-center justify-between gap-4">
                        {/* Left: All Categories Hamburger (Icon Only) */}
                        <div className="relative">
                            <button
                                onClick={() => setShowAllCategories(!showAllCategories)}
                                className="p-2 hover:bg-secondary rounded-full text-[#103E34] transition-colors flex-shrink-0"
                                aria-label="All Categories"
                            >
                                <Menu className="h-6 w-6" />
                            </button>

                            {/* Dropdown Menu */}
                            {showAllCategories && (
                                <>
                                    {/* Backdrop for click-outside */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowAllCategories(false)}
                                    />

                                    {/* Dropdown */}
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-border z-50">
                                        {categories.map((category) => {
                                            const IconComponent = category.Icon;
                                            const isHovered = hoveredSidebarCategory === category.id;
                                            const brands = categoryBrands[category.id] || [];

                                            return (
                                                <div
                                                    key={category.id}
                                                    className="relative"
                                                    onMouseEnter={() => handleSidebarCategoryHover(category.id)}
                                                    onMouseLeave={() => setHoveredSidebarCategory(null)}
                                                >
                                                    <Link
                                                        href={`/categories/${category.id}`}
                                                        onClick={() => setShowAllCategories(false)}
                                                        className={`flex items-center gap-3 px-4 py-3 transition-colors border-b border-border last:border-0 ${isHovered ? 'bg-secondary text-primary' : 'hover:bg-secondary'}`}
                                                    >
                                                        <IconComponent className={`h-5 w-5 ${isHovered ? 'text-primary' : 'text-[#103E34]'}`} />
                                                        <span className="text-sm font-medium">{category.name.toUpperCase()}</span>
                                                    </Link>

                                                    {/* Brand Dropdown (Side) */}
                                                    {isHovered && (
                                                        <div className="absolute top-0 left-full ml-2 w-[300px] bg-background rounded-xl shadow-xl border border-border z-50 p-4 animate-in fade-in slide-in-from-left-2 min-h-[200px]">
                                                            <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
                                                                <h3 className="font-bold text-base text-primary">{category.name.toUpperCase()} Brands</h3>
                                                                <Link
                                                                    href={`/categories/${category.id}`}
                                                                    onClick={() => setShowAllCategories(false)}
                                                                    className="text-[10px] text-muted-foreground hover:text-primary flex items-center gap-1"
                                                                >
                                                                    View All <ArrowRight className="h-3 w-3" />
                                                                </Link>
                                                            </div>

                                                            {loadingBrands[category.id] ? (
                                                                <div className="py-8 text-center text-muted-foreground text-xs">
                                                                    Loading...
                                                                </div>
                                                            ) : brands.length > 0 ? (
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    {brands.map((brand) => (
                                                                        <Link
                                                                            key={brand.id}
                                                                            href={`/categories/${category.id}?brand=${brand.id}`}
                                                                            onClick={() => setShowAllCategories(false)}
                                                                            className="text-xs text-muted-foreground hover:text-primary hover:font-medium transition-colors py-1 truncate"
                                                                        >
                                                                            {brand.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="py-8 text-center text-muted-foreground text-xs">
                                                                    No brands
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Center: Horizontal Category List */}
                        <div className="flex-1 flex justify-center">
                            <div className="flex items-center gap-2 overflow-x-auto md:overflow-visible py-1.5 scrollbar-hide mask-linear-fade px-4">
                                {categories.slice(0, 8).map((category, index) => {
                                    const IconComponent = category.Icon;
                                    const isHovered = hoveredCategory === category.id;
                                    const brands = categoryBrands[category.id] || [];
                                    const isRightAligned = index > 4; // Right align for last 3 items

                                    return (
                                        <div
                                            key={category.id}
                                            className="relative"
                                            onMouseEnter={() => handleTopCategoryHover(category.id)}
                                            onMouseLeave={() => setHoveredCategory(null)}
                                        >
                                            <Link
                                                href={`/categories/${category.id}`}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap text-sm font-medium flex-shrink-0 ${isHovered
                                                    ? 'bg-[#103E34] text-white'
                                                    : 'bg-secondary hover:bg-[#103E34] hover:text-white'
                                                    }`}
                                            >
                                                <IconComponent className="h-6 w-6" />
                                                <span>{category.name.toUpperCase()}</span>
                                            </Link>

                                            {isHovered && (
                                                <div
                                                    className={`absolute top-full mt-2 w-[600px] bg-background rounded-xl shadow-xl border border-border z-50 p-6 ${isRightAligned ? 'right-0' : 'left-0'}`}
                                                    style={{
                                                        animation: 'slideDown 0.3s ease-out',
                                                        transformOrigin: 'top',
                                                        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
                                                        <h3 className="font-bold text-lg text-primary">{category.name.toUpperCase()} Brands</h3>
                                                        <Link
                                                            href={`/categories/${category.id}`}
                                                            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                                                        >
                                                            View All <ArrowRight className="h-3 w-3" />
                                                        </Link>
                                                    </div>

                                                    {loadingBrands[category.id] ? (
                                                        <div className="py-8 text-center text-muted-foreground text-sm">
                                                            Loading brands...
                                                        </div>
                                                    ) : brands.length > 0 ? (
                                                        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                                                            {brands.map((brand) => (
                                                                <Link
                                                                    key={brand.id}
                                                                    href={`/categories/${category.id}?brand=${brand.id}`}
                                                                    className="text-sm text-muted-foreground hover:text-primary hover:font-medium transition-colors py-1 block truncate"
                                                                >
                                                                    {brand.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="py-8 text-center text-muted-foreground text-sm">
                                                            No brands available
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right: Flash Sale Button */}
                        <button
                            onClick={() => {
                                if (pathname === '/') {
                                    document.getElementById('flash-sale')?.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                    router.push('/#flash-sale');
                                }
                            }}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#103E34] text-white hover:bg-[#0c2e26] transition-colors text-sm font-bold shadow-sm flex-shrink-0"
                        >
                            <Zap className="h-4 w-4 fill-[#FCB042] text-[#FCB042] animate-pulse" />
                            <span className="hidden sm:inline">Flash Sale</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile Side Menu */}
            {showMenu && (
                <>
                    <div
                        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowMenu(false)}
                    />
                    <div className="fixed top-0 left-0 bottom-0 z-[70] w-72 bg-white shadow-xl">
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <Link href="/" onClick={() => setShowMenu(false)} className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-[#103E34] tracking-tight">
                                        DIZMO<span className="text-[#FCB042]">™</span>
                                    </span>
                                </Link>
                                <button
                                    onClick={() => setShowMenu(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <nav className="flex-1 overflow-y-auto">
                                {/* All Category Button */}
                                <Link
                                    href="/categories"
                                    onClick={() => setShowMenu(false)}
                                    className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <LayoutGrid className="h-5 w-5 text-[#103E34]" />
                                    <span className="font-semibold text-[#103E34] uppercase text-sm">All Category</span>
                                </Link>

                                {/* Category List with Collapsible Brands */}
                                {categories.slice(0, 9).map((category) => {
                                    const IconComponent = category.Icon;
                                    const isExpanded = expandedMobileCategory === category.id;
                                    const brands = categoryBrands[category.id] || [];
                                    const isLoadingBrands = loadingBrands[category.id];

                                    return (
                                        <div key={category.id} className="border-b border-gray-200">
                                            {/* Category Button */}
                                            <button
                                                onClick={() => {
                                                    if (isExpanded) {
                                                        setExpandedMobileCategory(null);
                                                    } else {
                                                        setExpandedMobileCategory(category.id);
                                                        fetchCategoryBrands(category.id);
                                                    }
                                                }}
                                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <IconComponent className="h-5 w-5 text-[#103E34]" />
                                                    <span className="font-medium text-[#103E34] text-sm">{category.name.toUpperCase()}</span>
                                                </div>
                                                <ChevronRight
                                                    className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''
                                                        }`}
                                                />
                                            </button>

                                            {/* Brand Dropdown */}
                                            {isExpanded && (
                                                <div className="bg-gray-50 py-2">
                                                    {isLoadingBrands ? (
                                                        <div className="px-4 py-2 text-sm text-gray-500">Loading brands...</div>
                                                    ) : brands.length > 0 ? (
                                                        brands.map((brand) => (
                                                            <Link
                                                                key={brand.id}
                                                                href={`/categories/${category.id}?brand=${brand.id}`}
                                                                onClick={() => setShowMenu(false)}
                                                                className="block px-8 py-2 text-sm text-[#103E34] hover:bg-gray-100 transition-colors"
                                                            >
                                                                {brand.name}
                                                            </Link>
                                                        ))
                                                    ) : (
                                                        <div className="px-8 py-2 text-sm text-gray-500">No brands available</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Additional Links */}
                                <Link
                                    href="/offers"
                                    onClick={() => setShowMenu(false)}
                                    className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <Zap className="h-5 w-5 text-[#103E34]" />
                                    <span className="font-medium text-[#103E34] uppercase text-sm">Offers</span>
                                </Link>

                                <Link
                                    href="/blog"
                                    onClick={() => setShowMenu(false)}
                                    className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <FileText className="h-5 w-5 text-[#103E34]" />
                                    <span className="font-medium text-[#103E34] uppercase text-sm">Blog</span>
                                </Link>

                                <Link
                                    href="/compare"
                                    onClick={() => setShowMenu(false)}
                                    className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <GitCompare className="h-5 w-5 text-[#103E34]" />
                                    <span className="font-medium text-[#103E34] uppercase text-sm">Compare</span>
                                </Link>

                                <Link
                                    href="/track-order"
                                    onClick={() => setShowMenu(false)}
                                    className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <Package className="h-5 w-5 text-[#103E34]" />
                                    <span className="font-medium text-[#103E34] uppercase text-sm">Order Tracking</span>
                                </Link>

                                <Link
                                    href="/login"
                                    onClick={() => setShowMenu(false)}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                                >
                                    <User className="h-5 w-5 text-[#103E34]" />
                                    <span className="font-medium text-[#103E34] uppercase text-sm">Profile</span>
                                </Link>
                            </nav>
                        </div>
                    </div>
                </>
            )
            }

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#103E34] border-t border-[#103E34]/20 shadow-lg">
                <div className="grid grid-cols-4 h-16">
                    {/* Home */}
                    <Link
                        href="/"
                        className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === '/' ? 'text-[#FCB042]' : 'text-white hover:text-[#FCB042]'
                            }`}
                    >
                        <Home className="h-5 w-5" />
                        <span className="text-[10px] font-medium">Home</span>
                    </Link>

                    {/* Cart */}
                    <button
                        onClick={openDrawer}
                        className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${pathname === '/cart' ? 'text-[#FCB042]' : 'text-white hover:text-[#FCB042]'
                            }`}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="text-[10px] font-medium">Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute top-2 right-1/2 translate-x-3 h-4 w-4 flex items-center justify-center text-[9px] font-bold rounded-full bg-[#FCB042] text-[#103E34]">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Products */}
                    <Link
                        href="/categories"
                        className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === '/products' ? 'text-[#FCB042]' : 'text-white hover:text-[#FCB042]'
                            }`}
                    >
                        <Package className="h-5 w-5" />
                        <span className="text-[10px] font-medium">Categories</span>
                    </Link>

                    {/* Profile (Mobile) */}
                    <Link
                        href={isAuthenticated ? "/profile" : "/login"}
                        className={`flex flex-col items-center justify-center gap-1 transition-colors ${(pathname === '/profile' || pathname === '/login') ? 'text-[#FCB042]' : 'text-white hover:text-[#FCB042]'
                            }`}
                    >
                        <User className="h-5 w-5" />
                        <span className="text-[10px] font-medium">{isAuthenticated ? 'Profile' : 'Login'}</span>
                    </Link>
                </div>
            </nav >

            <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Add padding to body for mobile bottom nav */
        @media (max-width: 768px) {
          body {
            padding-bottom: 4rem;
          }
        }
      `}</style>
        </>
    );
}
