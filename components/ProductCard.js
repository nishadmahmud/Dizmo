"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";

export default function ProductCard({ product, category }) {
    const { id, name, price, originalPrice, image, discount, discountType } = product;

    // Construct URL with category query param if available
    const productUrl = category
        ? `/products/${id}?category=${encodeURIComponent(category)}`
        : `/products/${id}`;

    return (
        <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {discountType === 'Fixed' ? `-${discount.toLocaleString()} Taka` : `-${discount}%`}
                </div>
            )}

            {/* Clickable Card Link */}
            <Link href={productUrl} className="block">
                {/* Image Container */}
                <div className="relative aspect-square bg-secondary/50 overflow-hidden">
                    {image ? (
                        <Image
                            unoptimized
                            src={image}
                            alt={name}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gray-100">
                            <span className="text-xs">No Image</span>
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <Eye className="h-8 w-8 text-white drop-shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                    </div>
                </div>

                {/* Content */}
                <div className="px-3 py-1">
                    <h3 className="font-medium text-foreground hover:text-primary transition-colors min-h-[2.5rem] text-sm line-clamp-2">
                        {name}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-base font-bold text-primary">৳{price.toLocaleString()}</span>
                        {originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">৳{originalPrice.toLocaleString()}</span>
                        )}
                    </div>
                </div>
            </Link>


        </div>
    );
}
