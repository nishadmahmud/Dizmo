import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Dummy Data (In real app, fetch based on slug)
const categoryProducts = [
    { id: 1, name: "iPhone 15 Pro Max", price: 145000, originalPrice: 160000, discount: 10 },
    { id: 11, name: "OnePlus 12", price: 85000, originalPrice: 90000, discount: 5 },
    { id: 12, name: "Pixel 8 Pro", price: 95000, originalPrice: 105000, discount: 10 },
    { id: 13, name: "Xiaomi 14 Ultra", price: 110000, originalPrice: 120000, discount: 8 },
    { id: 14, name: "Nothing Phone (2)", price: 65000, originalPrice: 70000, discount: 7 },
    { id: 31, name: "iPhone 13", price: 65000, originalPrice: 75000, discount: 13 },
    { id: 32, name: "Galaxy S23 FE", price: 55000, originalPrice: 65000, discount: 15 },
    { id: 41, name: "iPhone 12", price: 45000, originalPrice: 60000, discount: 25 },
];

export default async function CategoryDetailPage({ params }) {
    const { slug } = await params;
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="container py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/categories" className="p-2 hover:bg-secondary rounded-full transition-colors">
                        <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                    </Link>
                    <h1 className="text-3xl font-bold text-primary">{categoryName}</h1>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categoryProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
