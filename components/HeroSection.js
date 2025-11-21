"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShieldCheck, Truck, CreditCard, RefreshCw, Tag } from "lucide-react";

const mainSlides = [
    {
        id: 1,
        image: "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1757580565.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
        link: "/products"
    },
    {
        id: 2,
        image: "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1746470827.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
        link: "/products"
    },
    {
        id: 3,
        image: "https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1746470565.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS",
        link: "/products"
    }
];

const sideBanners = [
    {
        id: 1,
        image: "https://images.macrumors.com/t/hOuhsJYfJN_KtfPwJWT4WeohyPk=/1600x0/article-new/2024/09/apple-watch-ultra-2-new-black.jpg",
        link: "/products"
    },
    {
        id: 2,
        image: "https://dazzle.com.bd/_next/image?url=https%3A%2F%2Fdazzle.sgp1.cdn.digitaloceanspaces.com%2F72118%2Fipad-air-m3.jpg&w=1920&q=75",
        link: "/products"
    }
];

const features = [
    { icon: ShieldCheck, text: "100% Genuine Products", color: "text-green-600" },
    { icon: Truck, text: "Super Fast Delivery", color: "text-blue-600" },
    { icon: CreditCard, text: "36 Months Installments", color: "text-orange-600" },
    { icon: RefreshCw, text: "2 Years Replacement", color: "text-purple-600" },
    { icon: Tag, text: "Best Price in BD", color: "text-red-600" }
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % mainSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % mainSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + mainSlides.length) % mainSlides.length);
    };

    return (
        <section className="py-6 bg-background">
            <div className="container">
                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                    {/* Large Slider - Left Side */}
                    <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group h-[400px]">
                        {mainSlides.map((slide, index) => (
                            <Link
                                key={slide.id}
                                href={slide.link}
                                className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"
                                    }`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={slide.image}
                                    alt={`Banner ${slide.id}`}
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                        ))}

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {mainSlides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-white w-8" : "bg-white/50"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Side Banners - Right Side */}
                    <div className="flex flex-col gap-4">
                        {sideBanners.map((banner) => (
                            <Link
                                key={banner.id}
                                href={banner.link}
                                className="relative rounded-2xl overflow-hidden group h-[192px] hover:shadow-xl transition-shadow"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={banner.image}
                                    alt={`Banner ${banner.id}`}
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Features Bar */}
                <div className="bg-secondary/30 rounded-2xl p-4">
                    <div className="flex flex-wrap items-center justify-around gap-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <feature.icon className={`h-5 w-5 ${feature.color}`} />
                                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
