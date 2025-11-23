"use client";

import Link from "next/link";
import Image from "next/image";
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
            {discount > 0 && (
                <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{discount}%
                </div>
            )}

            {/* Clickable Card Link */}
            <Link href={`/product/${id}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-square bg-secondary/50 overflow-hidden">
                    {image ? (
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gray-100">
                            <span className="text-xs">No Image</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-medium text-foreground mb-2 hover:text-primary transition-colors min-h-[2.5rem]">
                        {name}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-bold text-primary">৳{price.toLocaleString()}</span>
                        {originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">৳{originalPrice.toLocaleString()}</span>
                        )}
                    </div>
                </div>
            </Link>

            {/* Action Buttons - Always Visible */}
            <div className="px-4 pb-4 flex flex-col gap-2">
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#103E34] hover:bg-[#FCB042] text-white py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    title="Add to Cart"
                >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                </button>
                <button
                    onClick={handleBuyNow}
                    className="w-full bg-[#FCB042] hover:bg-[#103E34] text-white py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    title="Buy Now"
                >
                    <Zap className="h-4 w-4" />
                    <span>Buy Now</span>
                </button>
            </div>
        </div>
    );
}
