"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

export default function ProductGallery({ images }) {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-secondary rounded-2xl overflow-hidden border border-border relative group">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-white relative">
                    {images && images.length > 0 && images[activeImage] ? (
                        <Image
                            unoptimized
                            src={images[activeImage]}
                            alt={`Product Image ${activeImage + 1}`}
                            fill
                            className="w-full h-full object-contain p-4"
                        />
                    ) : (
                        <div className="flex flex-col items-center">
                            <ImageIcon className="h-16 w-16 opacity-20" />
                            <span className="sr-only">No Image Available</span>
                        </div>
                    )}
                </div>

                {/* Zoom Hint */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {images && images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${activeImage === index
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-transparent hover:border-border"
                            }`}
                    >
                        <div className="w-full h-full bg-secondary flex items-center justify-center overflow-hidden">
                            {img ? (
                                <Image
                                    unoptimized
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
