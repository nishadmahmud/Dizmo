"use client";

import Link from "next/link";
import Image from "next/image";

const categories = [
    {
        name: "Phones",
        slug: "phones",
        image: "/category_phones_1763732425967.png",
    },
    {
        name: "Laptops",
        slug: "laptops",
        image: "/category_laptops_1763732474032.png",
    },
    {
        name: "Smart Watch",
        slug: "watches",
        image: "/category_watches_1763732515134.png",
    },
    {
        name: "AirPods",
        slug: "audio",
        image: "/category_audio_1763732559516.png",
    },
    {
        name: "Tablet",
        slug: "tablets",
        image: "/category_tablets_1763732624660.png",
    },
    {
        name: "Cameras",
        slug: "cameras",
        image: "/category_cameras_1763732691560.png",
    },
    {
        name: "Gadgets",
        slug: "gadgets",
        image: "/category_gaming_1763732756275.png",
    },
    {
        name: "Accessories",
        slug: "accessories",
        image: "/category_phones_1763732425967.png", // Reusing for now
    },
];

export default function CategoryIcons() {
    return (
        <section className="py-10 bg-background">
            <div className="container">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Shop by Categories</h2>
                    <Link
                        href="/products"
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        SEE ALL
                    </Link>
                </div>

                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/products?category=${cat.slug}`}
                            className="flex flex-col items-center group"
                        >
                            <div className="w-full aspect-square bg-secondary rounded-xl p-4 flex items-center justify-center group-hover:shadow-lg transition-all duration-300 border border-border group-hover:border-primary/30">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={cat.image}
                                        alt={cat.name}
                                        fill
                                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                            <span className="text-sm font-medium text-foreground mt-3 text-center group-hover:text-primary transition-colors">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
