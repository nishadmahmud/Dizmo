"use client";

import { useState, useEffect } from "react";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductExtras from "@/components/ProductExtras";

export default function ProductDetailsClient({ product }) {
    const [selectedColor, setSelectedColor] = useState(
        product.variants?.colors?.[0]?.id || null
    );

    // Filter images based on selected color
    const getFilteredImages = () => {
        if (!selectedColor || !product.imeiImagesByColor || !product.imeiImagesByColor[selectedColor]) {
            // If no color selected or no images for this color, show all images
            return product.images;
        }

        // Show images for the selected color
        const colorImages = product.imeiImagesByColor[selectedColor] || [];

        // If color has images, show them; otherwise fallback to all images
        return colorImages.length > 0 ? colorImages : product.images;
    };

    const filteredImages = getFilteredImages();

    const [selectedCarePlans, setSelectedCarePlans] = useState([]);

    // Track the live variant price so ProductExtras can react to variant changes
    const [selectedPrice, setSelectedPrice] = useState(product.price || 0);

    // Toggle care plan - now stores full plan objects with id, name, price
    const toggleCarePlan = (plan) => {
        setSelectedCarePlans(prev => {
            const exists = prev.find(p => p.id === plan.id);
            if (exists) {
                return prev.filter(p => p.id !== plan.id);
            }
            return [...prev, plan];
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Image Gallery (4 cols) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start lg:h-fit">
                <ProductGallery images={filteredImages} />
            </div>

            {/* Middle: Product Info (5 cols) */}
            <div className="lg:col-span-5">
                <ProductInfo
                    product={product}
                    onColorChange={setSelectedColor}
                    selectedColorProp={selectedColor}
                    selectedCarePlans={selectedCarePlans}
                    onPriceChange={setSelectedPrice}
                />
            </div>

            {/* Right: Product Extras (3 cols) */}
            <div className="lg:col-span-3">
                <ProductExtras
                    product={product}
                    selectedCarePlans={selectedCarePlans}
                    toggleCarePlan={toggleCarePlan}
                    currentPrice={selectedPrice}
                />
            </div>
        </div>
    );
}
