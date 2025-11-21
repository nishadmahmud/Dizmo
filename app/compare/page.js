import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GitCompare, Plus } from "lucide-react";

export default function ComparePage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="container py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                        <GitCompare className="h-5 w-5" />
                        <span className="font-bold">Compare Products</span>
                    </div>
                    <h1 className="text-4xl font-bold text-primary mb-4">Product Comparison</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Compare specifications, prices, and features of your favorite gadgets side by side.
                    </p>
                </div>

                {/* Comparison Slots */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[1, 2, 3].map((slot) => (
                        <div
                            key={slot}
                            className="border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center text-center hover:border-primary transition-colors cursor-pointer"
                        >
                            <div className="bg-secondary rounded-full p-6 mb-4">
                                <Plus className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">Add Product {slot}</h3>
                            <p className="text-sm text-muted-foreground">
                                Click to select a product to compare
                            </p>
                        </div>
                    ))}
                </div>

                {/* Info */}
                <div className="bg-secondary/50 border border-border rounded-lg p-6 text-center">
                    <p className="text-muted-foreground">
                        Select up to 3 products to compare their specifications, prices, and features.
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
