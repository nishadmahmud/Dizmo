"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "./ProductCard";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function BrandShowcase() {
    const [brands, setBrands] = useState([]);
    const [activeBrandId, setActiveBrandId] = useState(null);
    const [products, setProducts] = useState([]);
    const [loadingBrands, setLoadingBrands] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const scrollContainerRef = useRef(null);

    // Fetch Brands on Mount
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;
                const productsEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_PRODUCTS;

                const response = await fetch(`${baseUrl}${productsEndpoint}/${storeId}`);
                const data = await response.json();

                if (data.success && data.data) {
                    const uniqueBrands = [];
                    const brandIds = new Set();

                    data.data.forEach(product => {
                        if (product.brands && !brandIds.has(product.brands.id)) {
                            brandIds.add(product.brands.id);
                            uniqueBrands.push(product.brands);
                        }
                    });

                    setBrands(uniqueBrands);
                    if (uniqueBrands.length > 0) {
                        setActiveBrandId(uniqueBrands[0].id);
                    }
                }
            } catch (error) {
                console.error("Error fetching brands:", error);
            } finally {
                setLoadingBrands(false);
            }
        };

        fetchBrands();
    }, []);

    // Fetch Products when Active Brand Changes
    useEffect(() => {
        if (!activeBrandId) return;

        const fetchBrandProducts = async () => {
            setLoadingProducts(true);
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;
                const brandEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_BRAND_PRODUCTS;

                const response = await fetch(`${baseUrl}${brandEndpoint}/${activeBrandId}/${storeId}`);
                const data = await response.json();

                if (data.success && data.data && data.data.data) {
                    const mappedProducts = data.data.data.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: parseFloat(item.retails_price),
                        originalPrice: parseFloat(item.retails_price),
                        discount: parseFloat(item.discount) || 0,
                        image: item.image_path,
                        inStock: item.current_stock > 0,
                        rating: parseFloat(item.review_summary?.average_rating) || 0,
                        reviews: item.review_summary?.total_reviews || 0
                    }));
                    setProducts(mappedProducts);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching brand products:", error);
                setProducts([]);
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchBrandProducts();
    }, [activeBrandId]);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (loadingBrands) return null;
    if (brands.length === 0) return null;

    return (
        <section className="py-12 bg-secondary/30">
            <div className="container">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">Shop by Brand</h2>
                    <p className="text-muted-foreground">Explore products from top brands</p>
                </div>

                {/* Brand Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {brands.map((brand) => (
                        <button
                            key={brand.id}
                            onClick={() => setActiveBrandId(brand.id)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeBrandId === brand.id
                                ? "bg-primary text-primary-foreground border-primary shadow-md"
                                : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
                                }`}
                        >
                            {brand.name}
                        </button>
                    ))}
                </div>

                {/* Products Carousel */}
                <div className="relative group/carousel">
                    {/* Scroll Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-border opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0"
                        disabled={!products.length}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-border opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0"
                        disabled={!products.length}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Products Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {loadingProducts ? (
                            [...Array(4)].map((_, i) => (
                                <div key={i} className="min-w-[280px] aspect-[3/4] bg-secondary/50 rounded-xl animate-pulse snap-start" />
                            ))
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="min-w-[280px] max-w-[280px] snap-start">
                                    <ProductCard product={product} />
                                </div>
                            ))
                        ) : (
                            <div className="w-full text-center py-12 text-muted-foreground">
                                No products found for this brand.
                            </div>
                        )}
                    </div>
                </div>

                {/* View All Link */}
                {activeBrandId && products.length > 0 && (
                    <div className="flex justify-center mt-8">
                        <Link
                            href={`/products?brand=${activeBrandId}`}
                            className="flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                        >
                            View All {brands.find(b => b.id === activeBrandId)?.name} Products
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
