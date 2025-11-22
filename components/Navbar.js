"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    Search, ShoppingCart, Menu, Zap, FileText, GitCompare, Package, Home,
    Smartphone, Laptop, Tablet, Watch, Headphones, Cable, Gamepad2, Camera, X
} from "lucide-react";
import { useCart } from "@/context/CartContext";

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
    "I Phone Series": Smartphone,
    "Smart Phone": Smartphone,
    "Smart Watch": Watch,
    "Airpods": Headphones,
    "Accessories": Cable,
    "Adapter": Cable,
    "Used Phone": Smartphone,
    "Powerbank": Cable,
};

export default function Navbar() {
    const { openDrawer, cartCount } = useCart();
    const pathname = usePathname();
    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [categories, setCategories] = useState(defaultCategories);

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
                        const fetchedCategories = data.data.map((cat) => ({
                            id: cat.category_id.toString(),
                            name: cat.name,
                            Icon: iconMap[cat.name] || Package
                        }));
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

    // Hide category bar on products page
    const showCategoryBar = pathname !== "/products";

    return (
        <>
            {/* Main Navbar */}
            <nav className="sticky top-0 z-50 w-full border-b border-primary/30 bg-primary/15 backdrop-blur-md supports-[backdrop-filter]:bg-primary/20">
                <div className="container flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary tracking-tight">
                            DIZMO<span className="text-accent">™</span>
                        </span>
                    </Link>

                    {/* Search Bar (Hidden on mobile, visible on lg) */}
                    <div className="hidden lg:flex flex-1 max-w-xl mx-6">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Search gadgets..."
                                className="w-full rounded-full border border-input bg-secondary py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-4 text-sm font-medium">
                        <Link href="/products" className="flex items-center gap-1.5 hover:text-accent transition-colors text-foreground/80">
                            <Package className="h-4 w-4" />
                            All Products
                        </Link>
                        <Link href="/blog" className="flex items-center gap-1.5 hover:text-accent transition-colors text-foreground/80">
                            <FileText className="h-4 w-4" />
                            Blog
                        </Link>
                        <Link href="/offers" className="flex items-center gap-1.5 hover:text-accent transition-colors text-foreground/80">
                            <Zap className="h-4 w-4" />
                            Offers
                        </Link>
                        <Link href="/compare" className="flex items-center gap-1.5 hover:text-accent transition-colors text-foreground/80">
                            <GitCompare className="h-4 w-4" />
                            Compare
                        </Link>
                        <Link href="/track-order" className="flex items-center gap-1.5 hover:text-accent transition-colors text-foreground/80">
                            <Package className="h-4 w-4" />
                            Track Order
                        </Link>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowSearch(true)}
                            className="lg:hidden p-2 hover:bg-accent/10 rounded-full"
                        >
                            <Search className="h-5 w-5 text-foreground" />
                        </button>

                        <button
                            onClick={openDrawer}
                            className="hidden md:block p-2 hover:bg-accent/10 rounded-full transition-colors relative"
                        >
                            <ShoppingCart className="h-5 w-5 text-foreground" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center text-[10px] font-bold rounded-full bg-accent text-accent-foreground ring-2 ring-background">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => setShowMenu(true)}
                            className="md:hidden p-2 hover:bg-accent/10 rounded-full"
                        >
                            <Menu className="h-5 w-5 text-foreground" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Category Bar - Slimmer (Hidden on products page) */}
            {showCategoryBar && (
                <div className="sticky top-16 z-40 w-full border-b border-primary/30 bg-primary/15 backdrop-blur-md supports-[backdrop-filter]:bg-primary/20">
                    <div className="container">
                        <div className="flex items-center gap-2 overflow-x-auto py-1.5 scrollbar-hide">
                            {categories.map((category) => {
                                const IconComponent = category.Icon;
                                return (
                                    <Link
                                        key={category.id}
                                        href={`/products?category=${category.id}`}
                                        className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary hover:bg-primary hover:text-white transition-all whitespace-nowrap text-xs font-medium"
                                    >
                                        <IconComponent className="h-3.5 w-3.5" />
                                        <span>{category.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Search Modal */}
            {showSearch && (
                <div className="fixed inset-0 z-[60] bg-background">
                    <div className="container h-full flex flex-col">
                        <div className="flex items-center gap-3 h-16 border-b border-border">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="search"
                                    placeholder="Search gadgets..."
                                    autoFocus
                                    className="w-full rounded-full border border-input bg-secondary py-2 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                            <button
                                onClick={() => setShowSearch(false)}
                                className="p-2 hover:bg-accent/10 rounded-full"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto py-4">
                            <p className="text-sm text-muted-foreground text-center">Start typing to search...</p>
                        </div>
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
                    <div className="fixed top-0 right-0 bottom-0 z-[70] w-72 bg-background border-l border-border shadow-xl">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between p-4 border-b border-border">
                                <h2 className="text-lg font-bold">Menu</h2>
                                <button
                                    onClick={() => setShowMenu(false)}
                                    className="p-2 hover:bg-accent/10 rounded-full"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <nav className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-2">
                                    <Link
                                        href="/products"
                                        onClick={() => setShowMenu(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                                    >
                                        <Package className="h-5 w-5" />
                                        <span className="font-medium">All Products</span>
                                    </Link>
                                    <Link
                                        href="/blog"
                                        onClick={() => setShowMenu(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                                    >
                                        <FileText className="h-5 w-5" />
                                        <span className="font-medium">Blog</span>
                                    </Link>
                                    <Link
                                        href="/offers"
                                        onClick={() => setShowMenu(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                                    >
                                        <Zap className="h-5 w-5" />
                                        <span className="font-medium">Offers</span>
                                    </Link>
                                    <Link
                                        href="/compare"
                                        onClick={() => setShowMenu(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                                    >
                                        <GitCompare className="h-5 w-5" />
                                        <span className="font-medium">Compare</span>
                                    </Link>
                                    <Link
                                        href="/track-order"
                                        onClick={() => setShowMenu(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                                    >
                                        <Package className="h-5 w-5" />
                                        <span className="font-medium">Track Order</span>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </>
            )}

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary/15 backdrop-blur-md border-t border-primary/30 shadow-lg">
                <div className="grid grid-cols-4 h-16">
                    {/* Home */}
                    <Link
                        href="/"
                        className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <Home className="h-5 w-5" />
                        <span className="text-[10px] font-medium">Home</span>
                    </Link>

                    {/* Cart */}
                    <button
                        onClick={openDrawer}
                        className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${pathname === '/cart' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="text-[10px] font-medium">Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute top-2 right-1/2 translate-x-3 h-4 w-4 flex items-center justify-center text-[9px] font-bold rounded-full bg-accent text-accent-foreground">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Products */}
                    <Link
                        href="/products"
                        className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === '/products' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <Package className="h-5 w-5" />
                        <span className="text-[10px] font-medium">Products</span>
                    </Link>

                    {/* Offers */}
                    <Link
                        href="/offers"
                        className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === '/offers' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <Zap className="h-5 w-5" />
                        <span className="text-[10px] font-medium">Offers</span>
                    </Link>
                </div>
            </nav>

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
