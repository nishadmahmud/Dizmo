"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;
                const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORIES;

                const url = `${apiBaseUrl}${endpoint}/${storeId}`;
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();

                    if (data.success && data.data && data.data.length > 0) {
                        const fetchedCategories = data.data.map((cat) => ({
                            id: cat.category_id.toString(),
                            name: cat.name,
                            image: cat.image_url,
                        }));
                        setCategories(fetchedCategories);
                    }
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <main className="min-h-screen flex flex-col bg-background">

            <div className="container py-12">
                <h1 className="text-3xl font-bold text-primary mb-8 text-center">Browse Categories</h1>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Loading categories...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/categories/${cat.id}`}
                                className="group bg-card border border-border rounded-xl p-8 flex flex-col items-center gap-4 hover:shadow-lg transition-all hover:border-primary/50"
                            >
                                <div className="w-24 h-24 rounded-full bg-secondary p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://via.placeholder.com/150?text=No+Image";
                                        }}
                                    />
                                </div>
                                <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors text-center">
                                    {cat.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

        </main>
    );
}
