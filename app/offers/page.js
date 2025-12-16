"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function OffersPage() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timers, setTimers] = useState({});
    const [endTimes, setEndTimes] = useState({}); // Store fixed end times

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://www.outletexpense.xyz/api/latest-ecommerce-offer-list/265');
                const data = await response.json();

                if (data.success && data.data) {
                    setOffers(data.data);

                    // Initialize fixed end times and timers for each offer
                    const initialTimers = {};
                    const initialEndTimes = {};
                    data.data.forEach(offer => {
                        const endTime = new Date();
                        endTime.setDate(endTime.getDate() + 7);
                        initialEndTimes[offer.id] = endTime;
                        initialTimers[offer.id] = calculateTimeLeft(endTime);
                    });
                    setEndTimes(initialEndTimes);
                    setTimers(initialTimers);
                } else {
                    setError('Failed to load offers');
                }
            } catch (err) {
                console.error('Error fetching offers:', err);
                setError('Failed to load offers. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    // Update timers every second using fixed end times
    useEffect(() => {
        const interval = setInterval(() => {
            setTimers(prev => {
                const newTimers = { ...prev };
                Object.keys(newTimers).forEach(offerId => {
                    if (endTimes[offerId]) {
                        newTimers[offerId] = calculateTimeLeft(endTimes[offerId]);
                    }
                });
                return newTimers;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [offers]);

    const calculateTimeLeft = (endTime) => {
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

    return (
        <main className="min-h-screen bg-background">
            <div className="container py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        Exclusive Offers
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Discover our latest deals and special promotions on premium gadgets
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="aspect-[2/1] bg-secondary/50 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center gap-2 text-red-500 bg-red-50 px-6 py-3 rounded-lg">
                            <AlertCircle className="h-5 w-5" />
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                {/* Offers Grid - 2 columns on large screens */}
                {!loading && !error && offers.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {offers.map((offer) => {
                            const timer = timers[offer.id] || { days: 0, hours: 0, minutes: 0, seconds: 0 };

                            return (
                                <Link
                                    key={offer.id}
                                    href={`/offers/${offer.id}`}
                                    className="relative aspect-[1/1] rounded-2xl overflow-hidden group block"
                                >
                                    {/* Background Image */}
                                    <Image
                                        unoptimized
                                        src={offer.image}
                                        alt={offer.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />

                                    {/* Content Overlay - Centered at Bottom */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                                        {/* Countdown Timer */}
                                        <div className="flex gap-2 mb-4">
                                            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 text-center min-w-[70px]">
                                                <div className="text-xl font-bold text-white">
                                                    {String(timer.days).padStart(2, '0')}
                                                </div>
                                                <div className="text-xs text-white/80 uppercase mt-1">Day</div>
                                            </div>
                                            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 text-center min-w-[70px]">
                                                <div className="text-xl font-bold text-white">
                                                    {String(timer.hours).padStart(2, '0')}
                                                </div>
                                                <div className="text-xs text-white/80 uppercase mt-1">Hrs</div>
                                            </div>
                                            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 text-center min-w-[70px]">
                                                <div className="text-xl font-bold text-white">
                                                    {String(timer.minutes).padStart(2, '0')}
                                                </div>
                                                <div className="text-xs text-white/80 uppercase mt-1">Min</div>
                                            </div>
                                            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 text-center min-w-[70px]">
                                                <div className="text-xl font-bold text-white">
                                                    {String(timer.seconds).padStart(2, '0')}
                                                </div>
                                                <div className="text-xs text-white/80 uppercase mt-1">Sec</div>
                                            </div>
                                        </div>

                                        {/* View Details Button */}
                                        <button className="bg-[#FCB042] hover:bg-[#FCB042]/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-base">
                                            View Details
                                        </button>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* No Offers */}
                {!loading && !error && offers.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">
                            No offers available at the moment. Check back soon!
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
