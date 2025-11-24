"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Smartphone, Laptop, Watch, Headphones, Tablet, Camera, Gamepad, Plug, Monitor, HardDrive, Speaker, Battery, Package } from "lucide-react";

// Icon mapping for categories
const iconMap = {
    "I Phone Series": Smartphone,
    "Smart Phone": Smartphone,
    "Smart Watch": Watch,
    "Airpods": Headphones,
    "Accessories": Plug,
    "Adapter": Plug,
    "Used Phone": Smartphone,
    "Powerbank": Battery,
    "Laptop": Laptop,
    "Tablet": Tablet,
    "Camera": Camera,
    "Gaming": Gamepad,
    "Monitor": Monitor,
    "Storage": HardDrive,
    "Speaker": Speaker,
};

const colorClasses = [
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-orange-100 text-orange-600",
    "bg-red-100 text-red-600",
    "bg-green-100 text-green-600",
    "bg-yellow-100 text-yellow-600",
    "bg-indigo-100 text-indigo-600",
    "bg-teal-100 text-teal-600",
    "bg-cyan-100 text-cyan-600",
    "bg-gray-100 text-gray-600",
    "bg-pink-100 text-pink-600",
    "bg-lime-100 text-lime-600",
];

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
                        const fetchedCategories = data.data.map((cat, index) => ({
                            id: cat.category_id.toString(),
                            name: cat.name,
                            icon: iconMap[cat.name] || Package,
                            color: colorClasses[index % colorClasses.length]
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
            <Navbar />

            <div className="container py-12">
                <h1 className="text-3xl font-bold text-primary mb-8 text-center">Browse Categories</h1>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Loading categories...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categories.map((cat) => {
                            const IconComponent = cat.icon;
                            return (
                                <Link
                                    key={cat.id}
                                    href={`/categories/${cat.id}`}
                                    className="group bg-card border border-border rounded-xl p-8 flex flex-col items-center gap-4 hover:shadow-lg transition-all hover:border-primary/50"
                                >
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="h-10 w-10" />
                                    </div>
                                    <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {cat.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
