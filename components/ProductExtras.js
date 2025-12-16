"use client";

import { useState } from "react";
import { FileText, Gift, Truck, CreditCard, X, ShieldCheck, CheckCircle2, Clock, MapPin } from "lucide-react";

export default function ProductExtras({ product, selectedCarePlans, toggleCarePlan }) {
    const [activeDrawer, setActiveDrawer] = useState(null);

    const closeDrawer = () => setActiveDrawer(null);

    const extras = [
        {
            id: "specs",
            label: "Technical Specifications",
            description: "Detailed product specs",
            icon: FileText,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            id: "perks",
            label: "Perks & Benefits",
            description: "Exclusive rewards & offers",
            icon: Gift,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            id: "delivery",
            label: "Delivery Information",
            description: "Shipping methods & times",
            icon: Truck,
            color: "text-green-600",
            bgColor: "bg-green-50"
        },
        {
            id: "emi",
            label: "EMI Availability",
            description: "Easy monthly installments",
            icon: CreditCard,
            color: "text-orange-600",
            bgColor: "bg-orange-50"
        }
    ];

    const renderDrawerContent = () => {
        switch (activeDrawer) {
            case "specs":
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-[#103E34]">Technical Specifications</h3>
                        <div className="divide-y divide-gray-100">
                            {Array.isArray(product.specifications) ? (
                                product.specifications.map((spec, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row gap-4 py-4">
                                        <span className="font-bold text-[#103E34] sm:w-1/3 text-base">{spec.name}</span>
                                        <span className="text-gray-600 sm:w-2/3 text-sm leading-relaxed">
                                            {spec.description}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="flex flex-col sm:flex-row gap-4 py-4">
                                        <span className="font-bold text-[#103E34] sm:w-1/3 text-base">{key}</span>
                                        <span className="text-gray-600 sm:w-2/3 text-sm leading-relaxed">
                                            {typeof value === 'object' && value !== null ? value.name || JSON.stringify(value) : value}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
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
        <div className="space-y-4">
            {/* Dizmo Care Plans - Moved from ProductInfo */}


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

            {/* Dizmo Care Plans - Moved from ProductInfo */}
            {/* Different care options based on category */}
            {(() => {
                const categoryLower = (product.category || '').toLowerCase();
                const isPhoneCategory = categoryLower.includes('phone') || categoryLower.includes('phones');

                // Calculate extended warranty prices for non-phone categories
                const productPrice = product.price || 0;
                const warranty12MonthPrice = Math.round(productPrice * 0.20); // 20% of product price
                const warranty18MonthPrice = Math.round(productPrice * 0.30); // 30% of product price

                // Care plans for phones
                const phoneCarePlans = product.carePlans && product.carePlans.length > 0 ? product.carePlans : [
                    { id: 'care_android', name: 'Dizmo Care+ 1 Year', description: 'Brand New Replacement Guarantee', price: 1152 },
                    { id: 'screen_care', name: 'Dizmo Screen Care+ : 730 days', description: 'One time display replacements (excluding physical damage)', price: 987 },
                    { id: 'parts', name: '1 Year Parts Warranty', description: '', price: 700 },
                ];

                // Extended warranty for other categories (like the uploaded image style)
                const otherCategoryPlans = [
                    { id: 'warranty_12', name: '12 Months Extended Warranty', description: 'Extended coverage for hardware issues', price: warranty12MonthPrice },
                    { id: 'warranty_18', name: '18 Months Extended Warranty', description: 'Extended coverage for hardware issues', price: warranty18MonthPrice },
                ];

                const carePlansToShow = isPhoneCategory ? phoneCarePlans : otherCategoryPlans;

                return (
                    <div className="bg-secondary/10 rounded-xl overflow-hidden border border-border">
                        <div className="bg-black text-white p-2.5 flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-accent" />
                            <span className="font-bold text-sm">Dizmo Care</span>
                        </div>

                        <div className="p-2 space-y-2">
                            {carePlansToShow.map((plan) => (
                                <label
                                    key={plan.id}
                                    className={`cursor-pointer bg-white border p-2.5 rounded-lg flex items-start gap-2 transition-all hover:shadow-sm ${selectedCarePlans.includes(plan.id)
                                        ? "border-primary ring-1 ring-primary"
                                        : "border-border"
                                        }`}
                                >
                                    <div className={`mt-0.5 w-4 h-4 border-2 rounded flex items-center justify-center transition-colors ${selectedCarePlans.includes(plan.id) ? "bg-black border-black" : "border-gray-300"}`}>
                                        {selectedCarePlans.includes(plan.id) && <CheckCircle2 className="h-2.5 w-2.5 text-white" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCarePlans.includes(plan.id)}
                                        onChange={() => toggleCarePlan(plan.id)}
                                        className="hidden"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <span className="font-semibold text-xs text-foreground leading-tight">{plan.name}</span>
                                            <span className="font-bold text-xs text-foreground whitespace-nowrap">BDT {plan.price.toLocaleString()}</span>
                                        </div>
                                        {plan.description && (
                                            <span className="text-[10px] text-muted-foreground block mt-0.5 leading-tight line-clamp-2">{plan.description}</span>
                                        )}
                                    </div>
                                </label>
                            ))}

                            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                                <div className="w-3.5 h-3.5 bg-green-500 rounded flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                                </div>
                                <span className="text-[10px] text-muted-foreground leading-tight">I agree to Dizmo's <a href="#" className="text-primary hover:underline">terms & conditions</a></span>
                            </div>
                        </div>
                    </div>
                );
            })()}

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
        </div>
    );
}
