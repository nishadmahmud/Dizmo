import { Suspense } from "react";
import ProductsContent from "@/components/ProductsContent";

export default function ProductsPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <div className="flex-1">
                <Suspense fallback={
                    <div className="container py-8">
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                <p className="text-muted-foreground">Loading products...</p>
                            </div>
                        </div>
                    </div>
                }>
                    <ProductsContent />
                </Suspense>
            </div>
        </main>
    );
}
