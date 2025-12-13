"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, AlertCircle } from "lucide-react";

export default function OffersPage() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://www.outletexpense.xyz/api/latest-ecommerce-offer-list/265');
                const data = await response.json();

                if (data.success && data.data) {
                    setOffers(data.data);
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border">
                                <div className="aspect-[16/9] bg-secondary/50 animate-pulse" />
                                <div className="p-6 space-y-3">
                                    <div className="h-6 bg-secondary/50 rounded animate-pulse" />
                                    <div className="h-4 bg-secondary/50 rounded animate-pulse w-3/4" />
                                    <div className="h-4 bg-secondary/50 rounded animate-pulse w-1/2" />
                                </div>
                            </div>
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

                {/* Offers Grid */}
                {!loading && !error && offers.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {offers.map((offer) => (
                            <Link
                                key={offer.id}
                                href={`/offers/${offer.id}`}
                                className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 group"
                            >
                                {/* Image */}
                                <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
                                    <Image
                                        src={offer.image}
                                        alt={offer.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Title */}
                                    <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                        {offer.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                        {offer.description}
                                    </p>

                                    {/* Date */}
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>{formatDate(offer.created_at)}</span>
                                    </div>

                                    {/* Click to view products hint */}
                                    <div className="mt-4 text-sm text-primary font-medium">
                                        View Products →
                                    </div>
                                </div>
                            </Link>
                        ))}
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
