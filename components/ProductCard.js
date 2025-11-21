"use client";

import Link from "next/link";
import { ShoppingCart, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
    const { id, name, price, originalPrice, image, discount } = product;
    const { addToCart } = useCart();
    const router = useRouter();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        router.push("/checkout");
    };

    return (
        <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Discount Badge */}
            {discount && (
                <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{discount}%
                </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-square bg-secondary/50 overflow-hidden">
                {/* Placeholder for Image */}
                <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gray-100">
                    {/* Replace with actual Image component later */}
                    <span className="text-xs">Product Image</span>
                </div>

                {/* Overlay Actions (Dazzle Style) */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={handleAddToCart} className="bg-white text-primary p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors" title="Add to Cart">
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                    <button onClick={handleBuyNow} className="bg-accent text-accent-foreground p-2 rounded-full hover:bg-white hover:text-primary transition-colors" title="Buy Now">
                        <Zap className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <Link href={`/product/${id}`} className="block">
                    <h3 className="font-medium text-foreground line-clamp-2 h-10 mb-2 hover:text-primary transition-colors">
                        {name}
                    </h3>
                </Link>

                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">৳{price.toLocaleString()}</span>
                    {originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">৳{originalPrice.toLocaleString()}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
