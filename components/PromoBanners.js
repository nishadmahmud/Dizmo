"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PromoBanners() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BLOG_BASE_URL;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;
                const bannerEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_BANNERS;

                const url = `${apiBaseUrl}${bannerEndpoint}/${storeId}`;
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();

                    if (data.success && data.data && data.data.length >= 4) {
                        // Get banners 3 and 4 (indices 2, 3)
                        const promoBanners = data.data.slice(2, 4).map((banner) => ({
                            id: banner.id,
                            image: banner.image_path,
                            link: banner.button_url,
                            title: banner.title
                        }));
                        setBanners(promoBanners);
                    }
                }
            } catch (error) {
                console.error("Error fetching promo banners:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    if (loading || banners.length === 0) {
        return null;
    }

    return (
        <section className="py-6 bg-background">
            <div className="container">
                {/* Two Banners in a Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {banners.map((banner) => (
                        <Link
                            key={banner.id}
                            href={banner.link}
                            className="relative rounded-2xl overflow-hidden group h-[350px] hover:shadow-xl transition-shadow"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <Image
                                unoptimized
                                src={banner.image}
                                alt={banner.title || `Banner ${banner.id}`}
                                fill
                                className="w-full h-full object-cover"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
