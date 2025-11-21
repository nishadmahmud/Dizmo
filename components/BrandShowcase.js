"use client";

import Link from "next/link";
import Image from "next/image";

const brands = [
    { id: 1, name: "Apple", slug: "apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { id: 2, name: "Samsung", slug: "samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
    { id: 3, name: "Sony", slug: "sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
    { id: 4, name: "Xiaomi", slug: "xiaomi", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg" },
    { id: 5, name: "OnePlus", slug: "oneplus", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/OnePlus_logo.svg" },
    { id: 6, name: "Google", slug: "google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { id: 7, name: "Huawei", slug: "huawei", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Huawei_Standard_logo.svg" },
    { id: 8, name: "Oppo", slug: "oppo", logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Oppo_Logo_wiki.svg" },
];

export default function BrandShowcase() {
    return (
        <section className="py-12 bg-secondary/30">
            <div className="container">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">Shop by Brand</h2>
                    <p className="text-muted-foreground">Explore products from top brands</p>
                </div>

                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {brands.map((brand) => (
                        <Link
                            key={brand.id}
                            href={`/products?brand=${brand.slug}`}
                            className="bg-background rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/30 group aspect-square"
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                    {brand.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
