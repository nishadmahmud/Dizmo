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
        <section className="py-6 md:py-12 bg-background">
            <div className="container">
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-6 md:p-12">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 md:w-48 md:h-48 bg-white/10 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                        <div className="flex-1 text-white text-center md:text-left">
                            <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold mb-3 md:mb-4">
                                🔥 Limited Time Offer
                            </div>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
                                Mega Sale Up to<br className="md:hidden" /> 50% OFF
                            </h2>
                            <p className="text-sm md:text-lg text-white/90 mb-4 md:mb-6 max-w-md mx-auto md:mx-0">
                                Don't miss out on incredible deals on your favorite gadgets
                            </p>

                            {/* Countdown Timer */}
                            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4 mb-4 md:mb-6">
                                <Clock className="h-4 w-4 md:h-6 md:w-6" />
                                <div className="flex gap-2 md:gap-3">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 md:px-4 md:py-2 text-center min-w-[50px] md:min-w-[60px]">
                                        <div className="text-lg md:text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                                        <div className="text-[10px] md:text-xs opacity-80">Hours</div>
                                    </div>
                                    <div className="text-lg md:text-2xl font-bold self-center">:</div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 md:px-4 md:py-2 text-center min-w-[50px] md:min-w-[60px]">
                                        <div className="text-lg md:text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                                        <div className="text-[10px] md:text-xs opacity-80">Minutes</div>
                                    </div>
                                    <div className="text-lg md:text-2xl font-bold self-center">:</div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 md:px-4 md:py-2 text-center min-w-[50px] md:min-w-[60px]">
                                        <div className="text-lg md:text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                                        <div className="text-[10px] md:text-xs opacity-80">Seconds</div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/offers"
                                className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-bold hover:bg-accent hover:text-accent-foreground transition-all hover:gap-3"
                            >
                                Shop Now
                                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                            </Link>
                        </div>

                        <div className="flex-shrink-0 hidden md:block">
                            <div className="w-48 h-48 md:w-64 md:h-64 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-5xl md:text-6xl font-bold text-white mb-2">50%</div>
                                    <div className="text-lg md:text-xl text-white/90">OFF</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
