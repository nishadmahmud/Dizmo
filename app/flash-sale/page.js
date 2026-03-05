"use client";

import ProductCard from "@/components/ProductCard";
import { Timer, Loader2, AlertCircle, ArrowLeft, ArrowRight, Zap, ShoppingBag, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { getProductImage } from "@/utils/imageHelper";
import Image from "next/image";

// Sub-component for individual card timer
const CardTimer = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculate = () => {
            const difference = +new Date(endTime) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    hours: Math.floor((difference / (1000 * 60 * 60))),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };
        calculate();
        const interval = setInterval(calculate, 1000);
        return () => clearInterval(interval);
    }, [endTime]);

    return (
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
            <Clock className="h-3 w-3" />
            <span>{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
    );
};

export default function FlashSalePage() {
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_CAMPAIGNS || "/campaigns";
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;

                const url = `${apiBaseUrl}${endpoint}/${storeId}`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.success && data.campaigns && data.campaigns.data) {
                    setCampaigns(data.campaigns.data);
                } else {
                    setError("Failed to load campaigns.");
                }
            } catch (err) {
                console.error("Error fetching campaigns:", err);
                setError("Something went wrong while fetching campaigns.");
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    const handleCampaignSelect = (campaign) => {
        setSelectedCampaign(campaign);
        if (campaign.products && campaign.products.length > 0) {
            const mappedProducts = campaign.products.map(item => ({
                id: item.id,
                name: item.name,
                price: parseFloat(item.discounted_price || item.retails_price),
                originalPrice: parseFloat(item.retails_price),
                discount: parseFloat(item.discount) || 0,
                image: getProductImage(item),
                inStock: item.status === "In stock",
            }));
            setProducts(mappedProducts);
        } else {
            setProducts([]);
        }
    };

    // Detail view timer
    useEffect(() => {
        if (!selectedCampaign || !selectedCampaign.end_at) return;

        const calculate = () => {
            const difference = +new Date(selectedCampaign.end_at) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    hours: Math.floor((difference / (1000 * 60 * 60))),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        };
        calculate();
        const interval = setInterval(calculate, 1000);
        return () => clearInterval(interval);
    }, [selectedCampaign]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Loader2 className="h-12 w-12 animate-spin text-[#FCB042] mb-4" />
                <p className="text-lg font-medium text-gray-500">Discovering deals...</p>
            </div>
        );
    }

    if (error && campaigns.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Oops! {error}</h2>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-[#103E34] text-white rounded-full hover:bg-[#0c2e26] transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            {/* Header - Reduced Height */}
            <div className="bg-[#103E34] text-white py-6 md:py-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCB042]/10 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="container relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            {selectedCampaign ? (
                                <button
                                    onClick={() => setSelectedCampaign(null)}
                                    className="flex items-center gap-2 text-[#FCB042] hover:text-white transition-colors mb-2 text-sm font-semibold"
                                >
                                    <ArrowLeft className="h-4 w-4" /> Back to Campaigns
                                </button>
                            ) : (
                                <p className="text-[#FCB042] font-bold text-xs uppercase tracking-wider mb-1">Exclusive Offers</p>
                            )}

                            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">
                                {selectedCampaign ? selectedCampaign.name : "Active Campaigns"}
                            </h1>
                        </div>

                        {selectedCampaign && selectedCampaign.end_at && (
                            <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20">
                                <Clock className="h-4 w-4 text-[#FCB042]" />
                                <div className="flex gap-2 text-lg md:text-xl font-mono font-bold">
                                    <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                                    <span className="text-[#FCB042]">:</span>
                                    <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                                    <span className="text-[#FCB042]">:</span>
                                    <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container py-8 md:py-12">
                {!selectedCampaign ? (
                    /* Campaign Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {campaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col"
                            >
                                {/* Campaign Image/Banner */}
                                <div className="relative h-48 bg-gray-100 overflow-hidden">
                                    <Image
                                        src={campaign.bg_image || "/placeholder-campaign.jpg"}
                                        alt={campaign.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        unoptimized
                                    />
                                    {/* Badges Overlay */}
                                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                                        {campaign.discount > 0 && (
                                            <div className="bg-red-600 text-white px-3 py-1 rounded-lg font-bold text-[10px] shadow-lg">
                                                -{campaign.discount}{campaign.discount_type === 'amount' ? ' TAKA' : '%'}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-[#103E34] mb-2">{campaign.name}</h3>
                                    <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                                        {campaign.description || "Limited time exclusive deals just for you."}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between gap-3">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase">
                                                <ShoppingBag className="h-3 w-3" />
                                                {campaign.products?.length || 0} Products
                                            </div>
                                            {campaign.end_at && <CardTimer endTime={campaign.end_at} />}
                                        </div>
                                        <button
                                            onClick={() => handleCampaignSelect(campaign)}
                                            className="bg-[#103E34] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#FCB042] transition-colors flex items-center gap-2"
                                        >
                                            View Deals <ArrowRight className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Products Grid for Selected Campaign */
                    <div>
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-[#103E34]">Available Deals</h3>
                            <span className="bg-[#103E34]/5 text-[#103E34] px-3 py-1 rounded-lg font-bold text-xs">
                                {products.length} Items Found
                            </span>
                        </div>

                        {products.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-300">
                                <ShoppingBag className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                                <p className="text-lg text-gray-400 font-medium">No products currently in this campaign.</p>
                                <button
                                    onClick={() => setSelectedCampaign(null)}
                                    className="mt-4 text-[#103E34] font-bold underline"
                                >
                                    Explore other campaigns
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

