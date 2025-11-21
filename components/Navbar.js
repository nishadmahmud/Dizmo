"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Search, ShoppingCart, Menu, Zap, FileText, GitCompare, Package,
    Smartphone, Laptop, Tablet, Watch, Headphones, Cable, Gamepad2, Camera
} from "lucide-react";
import { useCart } from "@/context/CartContext";

// Categories for the secondary navbar
const categories = [
    { id: "phones", name: "Phones", Icon: Smartphone },
    { id: "laptops", name: "Laptops", Icon: Laptop },
    { id: "tablets", name: "Tablets", Icon: Tablet },
    { id: "watches", name: "Smart Watches", Icon: Watch },
    { id: "audio", name: "Audio", Icon: Headphones },
    { id: "accessories", name: "Accessories", Icon: Cable },
    { id: "gadgets", name: "Gadgets", Icon: Gamepad2 },
    { id: "cameras", name: "Cameras", Icon: Camera },
];

export default function Navbar() {
    const { openDrawer, cartCount } = useCart();
    const pathname = usePathname();

    // Hide category bar on products page
    const showCategoryBar = pathname !== "/products";

    return (
        <>
            {/* Main Navbar */}
            <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                        <Link href="/products" className="flex items-center gap-1.5 hover:text-primary transition-colors text-muted-foreground">
                            <Package className="h-4 w-4" />
                            All Products
                        </Link>
                        <Link href="/blog" className="flex items-center gap-1.5 hover:text-primary transition-colors text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            Blog
                        </Link>
                        <Link href="/offers" className="flex items-center gap-1.5 hover:text-primary transition-colors text-muted-foreground">
                            <Zap className="h-4 w-4" />
                            Offers
                        </Link>
                        <Link href="/compare" className="flex items-center gap-1.5 hover:text-primary transition-colors text-muted-foreground">
                            <GitCompare className="h-4 w-4" />
                            Compare
                        </Link>
                        <Link href="/track-order" className="flex items-center gap-1.5 hover:text-primary transition-colors text-muted-foreground">
                            <Package className="h-4 w-4" />
                            Track Order
                        </Link>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-3">
                        <button className="lg:hidden p-2 hover:bg-accent/10 rounded-full">
                            <Search className="h-5 w-5 text-foreground" />
                        </button>

                        <button
                            onClick={openDrawer}
                            className="p-2 hover:bg-accent/10 rounded-full transition-colors relative"
                        >
                            <ShoppingCart className="h-5 w-5 text-foreground" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center text-[10px] font-bold rounded-full bg-accent text-accent-foreground ring-2 ring-background">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button className="md:hidden p-2 hover:bg-accent/10 rounded-full">
                            <Menu className="h-5 w-5 text-foreground" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Category Bar - Slimmer (Hidden on products page) */}
            {showCategoryBar && (
                <div className="sticky top-16 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container">
                        <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-hide">
                            {categories.map((category) => {
                                const IconComponent = category.Icon;
                                return (
                                    <Link
                                        key={category.id}
                                        href={`/products?category=${category.id}`}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary hover:bg-primary hover:text-white transition-all whitespace-nowrap text-sm font-medium"
                                    >
                                        <IconComponent className="h-4 w-4" />
                                        <span>{category.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </>
    );
}
