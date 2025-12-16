"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const defaultCategories = [
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
        image: "/category_phones_1763732425967.png",
    },
];

export default function CategoryIcons() {
    const [categories, setCategories] = useState(defaultCategories);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;
                const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORIES;

                const url = `${apiBaseUrl}${endpoint}/${storeId}`;
                console.log('Fetching categories from:', url);

                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();
                    console.log('Categories data:', data);

                    if (data.success && data.data && data.data.length > 0) {
                        const fetchedCategories = data.data.map((cat) => ({
                            name: cat.name,
                            slug: cat.category_id.toString(),
                            image: cat.image_url,
                            id: cat.category_id,
                            productCount: cat.product_count
                        }));
                        setCategories(fetchedCategories);
                    }
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                // Keep default categories on error
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

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

                {loading ? (
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-full aspect-square bg-secondary/50 rounded-xl animate-pulse" />
                                <div className="h-4 w-16 bg-secondary/50 rounded mt-3 animate-pulse" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {categories.map((cat) => (
                            <Link
                                key={cat.slug}
                                href={`/categories/${cat.slug}`}
                                className="group flex flex-col items-center justify-center bg-secondary/90 hover:bg-secondary/50 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-transparent hover:border-black/5"
                            >
                                <div className="relative w-20 h-20 mb-3 group-hover:scale-110 transition-transform duration-300">
                                    <Image
                                        unoptimized
                                        src={cat.image}
                                        alt={cat.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-sm font-medium text-foreground text-center line-clamp-2">
                                    {cat.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
