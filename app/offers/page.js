import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Zap, Clock } from "lucide-react";

export default function OffersPage() {
    // Dummy offer products
    const offerProducts = [
        { id: 1, name: "iPhone 15 Pro Max", price: 145000, originalPrice: 160000, discount: 10, category: "phones" },
        { id: 2, name: "Samsung S24 Ultra", price: 135000, originalPrice: 150000, discount: 10, category: "phones" },
        { id: 3, name: "MacBook Air M2", price: 115000, originalPrice: 130000, discount: 12, category: "laptops" },
        { id: 4, name: "Sony WH-1000XM5", price: 32000, originalPrice: 38000, discount: 15, category: "audio" },
        { id: 5, name: "Apple Watch Ultra 2", price: 85000, originalPrice: 95000, discount: 10, category: "watches" },
        { id: 6, name: "iPad Pro M4", price: 125000, originalPrice: 140000, discount: 11, category: "tablets" },
    ];

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="container py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
                        <Zap className="h-5 w-5" />
                        <span className="font-bold">Special Offers</span>
                    </div>
                    <h1 className="text-4xl font-bold text-primary mb-4">Limited Time Deals</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Grab the best deals on top gadgets before they're gone!
                    </p>
                </div>

                {/* Countdown Timer */}
                <div className="bg-gradient-to-r from-primary to-accent text-white rounded-xl p-6 mb-12 text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Clock className="h-5 w-5" />
                        <span className="font-semibold">Offer Ends In</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-3xl font-bold">
                        <div className="flex flex-col">
                            <span>23</span>
                            <span className="text-xs font-normal opacity-80">Hours</span>
                        </div>
                        <span>:</span>
                        <div className="flex flex-col">
                            <span>45</span>
                            <span className="text-xs font-normal opacity-80">Minutes</span>
                        </div>
                        <span>:</span>
                        <div className="flex flex-col">
                            <span>12</span>
                            <span className="text-xs font-normal opacity-80">Seconds</span>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {offerProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
