"use client";

import { useState } from "react";
import { FileText, Gift, Truck, CreditCard, X, ShieldCheck, CheckCircle2, Clock, MapPin } from "lucide-react";

export default function ProductExtras({ product }) {
    const [activeDrawer, setActiveDrawer] = useState(null);

    const closeDrawer = () => setActiveDrawer(null);

    const extras = [
        {
            id: "specs",
            label: "Technical Specifications",
            icon: FileText,
            description: "Detailed product specs",
            color: "text-blue-500",
            bgColor: "bg-blue-50"
        },
        {
            id: "perks",
            label: "Perks & Benefits",
            icon: Gift,
            description: "Services included",
            color: "text-green-500",
            bgColor: "bg-green-50"
        },
        {
            id: "delivery",
            label: "Delivery Information",
            icon: Truck,
            description: "Shipping options & times",
            color: "text-orange-500",
            bgColor: "bg-orange-50"
        },
        {
            id: "emi",
            label: "EMI Availability",
            icon: CreditCard,
            description: "Starting from ৳4,000/mo",
            color: "text-purple-500",
            bgColor: "bg-purple-50"
        }
    ];

    const renderDrawerContent = () => {
        switch (activeDrawer) {
            case "specs":
                return (
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg mb-4">Technical Specifications</h3>
                        {(!product.specifications ||
                            (Array.isArray(product.specifications) && product.specifications.length === 0) ||
                            (typeof product.specifications === 'object' && Object.keys(product.specifications).length === 0)) ? (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground mb-2">No specifications available for this product.</p>
                            </div>
                        ) : Array.isArray(product.specifications) && product.specifications.length > 0 ? (
                            // Handle array format from API with name and description fields
                            <div className="grid grid-cols-1 gap-3">
                                {product.specifications.map((spec, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 md:grid-cols-3 gap-2 py-3 border-b border-border/50 last:border-0"
                                    >
                                        <span className="font-medium text-foreground">{spec.name}</span>
                                        <span className="text-muted-foreground md:col-span-2">{spec.description}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Handle object format
                            Object.entries(product.specifications).map(([key, category]) => {
                                if (!category || typeof category !== 'object') return null;
                                return (
                                    <div key={key} className="border-b border-border pb-6 last:border-0">
                                        <h3 className="text-lg font-bold text-primary mb-4">{category.title || key}</h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            {category.specs && typeof category.specs === 'object' && Object.entries(category.specs).map(([specKey, specValue]) => (
                                                <div
                                                    key={specKey}
                                                    className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 border-b border-border/50 last:border-0"
                                                >
                                                    <span className="font-medium text-foreground">{specKey}</span>
                                                    <span className="text-muted-foreground md:col-span-2">{specValue}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                );
            case "perks":
                return (
                    <div className="space-y-6">
                        <h3 className="font-bold text-lg">Perks & benefits included</h3>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="bg-green-100 p-3 rounded-full h-fit">
                                    <ShieldCheck className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold">7-Days Replacement</h4>
                                    <p className="text-sm text-muted-foreground">Get 7-Days Replacement of your device</p>
                                    <p className="text-xs text-muted-foreground mt-1">*Condition apply</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-yellow-100 p-3 rounded-full h-fit">
                                    <Truck className="h-6 w-6 text-yellow-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Free Shipping</h4>
                                    <p className="text-sm text-muted-foreground">Get your order delivered inside Dhaka for free</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-blue-100 p-3 rounded-full h-fit">
                                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Authentic device</h4>
                                    <p className="text-sm text-muted-foreground">Get genuine, unaltered, authentic device from Dizmo</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-red-100 p-3 rounded-full h-fit">
                                    <Clock className="h-6 w-6 text-red-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Repair history</h4>
                                    <p className="text-sm text-muted-foreground">Acknowledge repair histories of devices from now if there is ANY</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "delivery":
                return (
                    <div className="space-y-6">
                        <h3 className="font-bold text-lg">Shipping Information</h3>
                        <p className="text-sm text-muted-foreground">
                            We are committed to delivering your orders quickly and reliably. Our standard and express delivery options are designed to meet your needs:
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                                <span className="font-medium">Inside Dhaka</span>
                                <span className="font-bold bg-secondary px-3 py-1 rounded-full text-sm">48–72 hours</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                                <span className="font-medium">Outside Dhaka</span>
                                <span className="font-bold bg-secondary px-3 py-1 rounded-full text-sm">48–72 hours</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                                <span className="font-medium">Express Delivery</span>
                                <span className="font-bold bg-cyan-500 text-white px-3 py-1 rounded-full text-sm">24 hours</span>
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground mt-4">
                            With these options, you can always count on us for timely and secure delivery.
                        </p>
                    </div>
                );
            case "emi":
                const currentPrice = product.price || 0;
                return (
                    <div className="space-y-6">
                        <h3 className="font-bold text-lg">EMI Availability</h3>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                            <div className="flex items-center gap-3 mb-3">
                                <CreditCard className="h-6 w-6 text-purple-600" />
                                <h4 className="font-bold text-purple-900">Starting from ৳4,000/mo</h4>
                            </div>
                            <p className="text-sm text-purple-800 mb-4">
                                Enjoy 0% interest EMI for up to 12 months with selected bank credit cards.
                            </p>
                            <ul className="space-y-2 text-sm text-purple-800">
                                <li className="flex justify-between border-b border-purple-200 pb-1"><span>3 Months</span> <span>৳{Math.round(currentPrice / 3).toLocaleString()}/mo</span></li>
                                <li className="flex justify-between border-b border-purple-200 pb-1"><span>6 Months</span> <span>৳{Math.round(currentPrice / 6).toLocaleString()}/mo</span></li>
                                <li className="flex justify-between"><span>12 Months</span> <span>৳{Math.round(currentPrice / 12).toLocaleString()}/mo</span></li>
                            </ul>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            * EMI facility is available for purchase over ৳5,000. Terms and conditions apply.
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="space-y-3">
                {extras.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveDrawer(item.id)}
                        className="w-full flex items-center gap-4 p-3 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all bg-card group text-left"
                    >
                        <div className={`p-3 rounded-full ${item.bgColor} group-hover:scale-110 transition-transform`}>
                            <item.icon className={`h-5 w-5 ${item.color}`} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm">{item.label}</h4>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Drawer Overlay */}
            {activeDrawer && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
                        onClick={closeDrawer}
                    />

                    {/* Sidebar */}
                    <div className="relative w-full max-w-md bg-background h-full shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
                        <button
                            onClick={closeDrawer}
                            className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="mt-8">
                            {renderDrawerContent()}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
