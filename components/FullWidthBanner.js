"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FullWidthBanner() {
    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BLOG_BASE_URL;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;
                const bannerEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_BANNERS;

                const url = `${apiBaseUrl}${bannerEndpoint}/${storeId}`;
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();

                    if (data.success && data.data && data.data.length >= 5) {
                        // Get banner 5 (index 4)
                        const bannerData = data.data[4];
                        setBanner({
                            id: bannerData.id,
                            image: bannerData.image_path,
                            link: bannerData.button_url,
                            title: bannerData.title
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching full-width banner:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanner();
    }, []);

    if (loading || !banner) {
        return null;
    }

    return (
        <section className="py-6 bg-background">
            <div className="container">
                <Link
                    href={banner.link}
                    className="relative rounded-2xl overflow-hidden group block h-[400px] hover:shadow-xl transition-shadow"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={banner.image}
                        alt={banner.title || `Banner ${banner.id}`}
                        className="w-full h-full object-cover"
                    />
                </Link>
            </div>
        </section>
    );
}
