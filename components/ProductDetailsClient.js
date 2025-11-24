"use client";

import { useState, useEffect } from "react";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";

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

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Image Gallery */}
            <ProductGallery images={filteredImages} />

            {/* Right: Product Info & Actions */}
            <ProductInfo
                product={product}
                onColorChange={setSelectedColor}
                selectedColorProp={selectedColor}
            />
        </div>
    );
}
