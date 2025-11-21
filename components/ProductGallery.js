"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

export default function ProductGallery({ images }) {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-secondary rounded-2xl overflow-hidden border border-border relative group">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-white">
                    {/* Placeholder for actual image */}
                    <ImageIcon className="h-16 w-16 opacity-20" />
                    <span className="sr-only">Product Image {activeImage + 1}</span>
                </div>

                {/* Zoom Hint */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${activeImage === index
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-transparent hover:border-border"
                            }`}
                    >
                        <div className="w-full h-full bg-secondary flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
