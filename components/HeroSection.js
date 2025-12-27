"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BadgeCheck, Truck, CreditCard, ArrowLeftRight, BadgePercent, Headset } from "lucide-react";

const defaultSlides = [
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

const defaultBanners = [
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
    { icon: BadgeCheck, text: "100% Genuine Products", color: "text-emerald-600" },
    { icon: Truck, text: "Super Fast Delivery", color: "text-sky-600" },
    { icon: CreditCard, text: "36 Months Installments", color: "text-[#FCB042]" },
    { icon: ArrowLeftRight, text: "1 Years Replacement", color: "text-violet-600" },
    { icon: BadgePercent, text: "Best Price in BD", color: "text-rose-600" },
    { icon: Headset, text: "24/7 Customer Support", color: "text-teal-600" }
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState(defaultSlides);
    const [banners, setBanners] = useState(defaultBanners);
    const [loading, setLoading] = useState(true);

    // Fetch sliders and banners from API with caching
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BLOG_BASE_URL;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;
                const sliderEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_SLIDERS;
                const bannerEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_BANNERS;

                // Check localStorage cache first
                const cachedData = localStorage.getItem('hero_section_cache');
                if (cachedData) {
                    const { slides: cachedSlides, banners: cachedBanners, timestamp } = JSON.parse(cachedData);
                    // Use cache if less than 5 minutes old
                    if (Date.now() - timestamp < 5 * 60 * 1000) {
                        if (cachedSlides?.length) setSlides(cachedSlides);
                        if (cachedBanners?.length) setBanners(cachedBanners);
                        setLoading(false);
                        return;
                    }
                }

                // Fetch sliders
                const sliderUrl = `${apiBaseUrl}${sliderEndpoint}/${storeId}`;
                const sliderResponse = await fetch(sliderUrl);
                let fetchedSlides = null;

                if (sliderResponse.ok) {
                    const sliderData = await sliderResponse.json();
                    if (sliderData.success && sliderData.data && sliderData.data.length > 0) {
                        const sliderInfo = sliderData.data[0];
                        fetchedSlides = sliderInfo.image_path.map((imagePath, index) => ({
                            id: index + 1,
                            image: imagePath,
                            link: sliderInfo.product_id[index]
                                ? `/products/${sliderInfo.product_id[index]}`
                                : "/products"
                        }));
                        setSlides(fetchedSlides);
                    }
                }

                // Fetch banners
                const bannerUrl = `${apiBaseUrl}/api/get-banners/${storeId}`; // Using the provided logic but keeping it dynamic with storeId
                // However, user specifically asked for https://www.outletexpense.xyz/api/get-banners/265
                // If storeId is 265, this works generally. 

                const bannerResponse = await fetch("https://www.outletexpense.xyz/api/get-banners/265");
                let fetchedBanners = null;

                if (bannerResponse.ok) {
                    const bannerData = await bannerResponse.json();
                    if (bannerData.success && bannerData.data && bannerData.data.length > 0) {
                        fetchedBanners = bannerData.data.slice(0, 2).map((banner) => ({
                            id: banner.id,
                            image: banner.image_path,
                            link: "/products", // API returns button_url as null in example, defaulting to products
                            title: banner.title
                        }));
                        setBanners(fetchedBanners);
                    }
                }

                // Cache the fetched data
                localStorage.setItem('hero_section_cache', JSON.stringify({
                    slides: fetchedSlides,
                    banners: fetchedBanners,
                    timestamp: Date.now()
                }));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Auto-play slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // No loading blocker - show default content immediately while API fetches in background

    return (
        <section className="py-6 bg-background">
            <div className="container">
                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                    {/* Large Slider - Left Side */}
                    <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group h-[200px] md:h-[300px] lg:h-[400px]">
                        {slides.map((slide, index) => (
                            <Link
                                key={slide.id}
                                href={slide.link}
                                className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"
                                    }`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <Image
                                    unoptimized
                                    src={slide.image}
                                    alt={`Banner ${slide.id}`}
                                    fill
                                    priority={index === 0}
                                    loading="eager"
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
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-white w-8" : "bg-white/50"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Side Banners - Right Side on desktop, Single row on mobile */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:flex lg:flex-col">
                        {banners.map((banner) => (
                            <Link
                                key={banner.id}
                                href={banner.link}
                                className="relative rounded-2xl overflow-hidden group h-[120px] lg:h-[192px] hover:shadow-xl transition-shadow"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <Image
                                    unoptimized
                                    src={banner.image}
                                    alt={banner.title || `Banner ${banner.id}`}
                                    fill
                                    priority
                                    loading="eager"
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Features Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-row md:flex-col items-center justify-start md:justify-center gap-2 p-2 md:p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                            >
                                <feature.icon className={`h-5 w-5 md:h-7 md:w-7 flex-shrink-0 ${feature.color}`} />
                                <span className="text-[10px] md:text-sm font-semibold text-foreground text-left md:text-center leading-tight">
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
