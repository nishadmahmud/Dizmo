"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function SpecialBanner() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 59,
        seconds: 45
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-12 bg-background">
            <div className="container">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-12">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1 text-white">
                            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-4">
                                🔥 Limited Time Offer
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Mega Sale Up to 50% OFF
                            </h2>
                            <p className="text-lg text-white/90 mb-6">
                                Don't miss out on incredible deals on your favorite gadgets
                            </p>

                            {/* Countdown Timer */}
                            <div className="flex items-center gap-4 mb-6">
                                <Clock className="h-6 w-6" />
                                <div className="flex gap-3">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                                        <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                                        <div className="text-xs opacity-80">Hours</div>
                                    </div>
                                    <div className="text-2xl font-bold">:</div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                                        <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                                        <div className="text-xs opacity-80">Minutes</div>
                                    </div>
                                    <div className="text-2xl font-bold">:</div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                                        <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                                        <div className="text-xs opacity-80">Seconds</div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/offers"
                                className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-accent-foreground transition-all hover:gap-3"
                            >
                                Shop Now
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>

                        <div className="flex-shrink-0">
                            <div className="w-64 h-64 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl font-bold text-white mb-2">50%</div>
                                    <div className="text-xl text-white/90">OFF</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
