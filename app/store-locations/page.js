"use client";

import { MapPin, Phone, Home, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Store locations data - Real data
const storeLocations = [
    {
        id: 1,
        name: "DIZMO - Jamuna Future Park",
        address: "Shop: 028A & 028B, Level: 4, Block: B, Jamuna Future Park, Dhaka 1229",
        offDay: "Off Day: Wednesday",
        phone: "01710425454",
        mapUrl: "https://www.google.com/maps/place/DIZMO/@23.8143061,90.4247331,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c76859d0b31b:0x9761e02933dd029!8m2!3d23.8143061!4d90.4247331!16s%2Fg%2F11xlnj8vry",
        image: "https://lh3.googleusercontent.com/p/AF1QipPtgI7i501SL0pqmYWKJKFkezULjr4Tpuz8Th81=w408-h306-k-no"
    },
    {
        id: 2,
        name: "DIZMO - Bogura Branch",
        address: "Shop: 615 & 616 (6th Floor), Police Plaza, Bogura Sadar",
        offDay: "Off Day: Friday",
        phone: "01710425454",
        mapUrl: "https://maps.app.goo.gl/DnYA5U427GmRdrsW8",
        image: "/Dizmo_Bogura.jpeg"
    }
];

export default function StoreLocationsPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <div className="container py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                        <MapPin className="h-5 w-5" />
                        <span className="font-bold">Find Us</span>
                    </div>
                    <h1 className="text-4xl font-bold text-primary mb-4">Our Store Locations</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Visit our showroom to experience our products firsthand.
                        Our expert staff is ready to assist you.
                    </p>
                </div>

                {/* Store Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {storeLocations.map((store) => (
                        <div
                            key={store.id}
                            className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
                        >
                            {/* Store Image */}
                            <div className="relative h-56 w-full bg-secondary">
                                <Image
                                    unoptimized
                                    src={store.image}
                                    alt={store.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Store Details */}
                            <div className="p-6">
                                {/* Store Name */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Home className="h-5 w-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold text-foreground">{store.name}</h2>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-3 mb-2">
                                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                    <span className="text-foreground">{store.address}</span>
                                </div>

                                {/* Off Day */}
                                <div className="flex items-center gap-3 mb-3 ml-8">
                                    <span className="text-red-500 font-medium">{store.offDay}</span>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-3 mb-6">
                                    <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                    <a href={`tel:${store.phone}`} className="text-foreground hover:text-primary transition-colors">
                                        {store.phone}
                                    </a>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <a
                                        href={store.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#103E34] text-white py-3 rounded-lg font-bold hover:bg-[#103E34]/90 transition-colors"
                                    >
                                        SHOP MAP
                                    </a>
                                    <a
                                        href={`tel:${store.phone}`}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#FCB042]/20 text-[#103E34] py-3 rounded-lg font-bold border border-[#FCB042] hover:bg-[#FCB042]/30 transition-colors"
                                    >
                                        SHOW DETAILS
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Banner */}
                <div className="max-w-2xl mx-auto mt-12 bg-[#103E34] rounded-2xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-3">Need Help Finding Us?</h3>
                    <p className="text-white/80 mb-6">
                        Call our customer support for assistance with directions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:+8801710425454"
                            className="inline-flex items-center justify-center gap-2 bg-[#FCB042] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#FCB042]/90 transition-colors"
                        >
                            <Phone className="h-5 w-5" />
                            Call: 01710-425454
                        </a>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
