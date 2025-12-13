"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Home, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function OfferProductsPage() {
    const params = useParams();
    const router = useRouter();
    const offerId = params.id;

    const [offer, setOffer] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("default");

    // Countdown timer state
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const fetchOfferAndProducts = async () => {
            try {
                setLoading(true);

                // Fetch all offers to find the selected one
                const offersResponse = await fetch('https://www.outletexpense.xyz/api/latest-ecommerce-offer-list/265');
                const offersData = await offersResponse.json();

                if (offersData.success && offersData.data) {
                    const selectedOffer = offersData.data.find(o => o.id.toString() === offerId);

                    if (selectedOffer) {
                        setOffer(selectedOffer);

                        // Fetch brand products
                        const storeId = process.env.NEXT_PUBLIC_STORE_ID || '265';
                        const productsResponse = await fetch(
                            `https://www.outletexpense.xyz/api/public/brandwise-products/${selectedOffer.brand_id}/${storeId}`
                        );
                        const productsData = await productsResponse.json();

                        if (productsData.success && productsData.data && productsData.data.data) {
                            const mappedProducts = productsData.data.data.map(item => ({
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
                        }
                    } else {
                        setError('Offer not found');
                    }
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load offer products');
            } finally {
                setLoading(false);
            }
        };

        fetchOfferAndProducts();
    }, [offerId]);

    // Countdown timer
    useEffect(() => {
        // Set offer end time to 7 days from now (fixed time)
        const endTime = new Date();
        endTime.setDate(endTime.getDate() + 7);

        const calculateTimeLeft = () => {
            const difference = endTime - new Date();

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Sort products
    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            case "name":
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    if (loading) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </main>
        );
    }

    if (error || !offer) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">{error || 'Offer not found'}</p>
                    <Link href="/offers" className="mt-4 inline-block text-primary hover:underline">
                        ← Back to Offers
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="container py-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link href="/" className="hover:text-primary transition-colors">
                        <Home className="h-4 w-4" />
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href="/offers" className="hover:text-primary transition-colors">
                        Offers
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-foreground">Offer Products</span>
                </div>

                {/* Offer Banner with Countdown */}
                <div className="bg-gradient-to-r from-[#103E34] to-[#FCB042] text-white rounded-2xl p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">{offer.title}</h1>
                            <p className="text-white/90 text-sm md:text-base line-clamp-2">{offer.description}</p>
                        </div>

                        {/* Countdown Timer */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-fit">
                            <p className="text-xs text-white/80 mb-2 text-center">OFFER ENDS IN:</p>
                            <div className="flex gap-2">
                                <div className="text-center">
                                    <div className="bg-white text-[#103E34] rounded-lg px-3 py-2 min-w-[60px]">
                                        <span className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
                                    </div>
                                    <span className="text-xs mt-1 block">Days</span>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white text-[#103E34] rounded-lg px-3 py-2 min-w-[60px]">
                                        <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                                    </div>
                                    <span className="text-xs mt-1 block">Hour</span>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white text-[#103E34] rounded-lg px-3 py-2 min-w-[60px]">
                                        <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                    </div>
                                    <span className="text-xs mt-1 block">Min</span>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white text-[#103E34] rounded-lg px-3 py-2 min-w-[60px]">
                                        <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                    </div>
                                    <span className="text-xs mt-1 block">Sec</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Header */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-muted-foreground">
                        Total <span className="font-semibold text-foreground">{products.length}</span> Products
                    </p>

                    {/* Sort Dropdown */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="default">Default</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name: A to Z</option>
                    </select>
                </div>

                {/* Products Grid */}
                {sortedProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {sortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No products found for this offer</p>
                    </div>
                )}
            </div>
        </main>
    );
}
