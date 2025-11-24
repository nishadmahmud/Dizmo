"use client";

import { useState } from "react";

export default function ProductTabs({ product }) {
    const [activeTab, setActiveTab] = useState("description");

    const tabs = [
        { id: "description", label: "Description" },
        { id: "specifications", label: "Specifications" },
    ];

    return (
        <div className="mt-16 border-t border-border pt-8">
            {/* Tab Navigation */}
            <div className="flex gap-4 border-b border-border mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 px-4 font-semibold transition-all relative ${activeTab === tab.id
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                {activeTab === "description" && (
                    <div className="prose max-w-none">
                        <p className="text-muted-foreground leading-relaxed text-base">
                            {product.description}
                        </p>

                        {/* Key Features */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-secondary/30 p-6 rounded-lg">
                                <h4 className="font-bold text-primary mb-3">Display</h4>
                                <p className="text-sm text-muted-foreground">
                                    6.7-inch Super Retina XDR display with ProMotion technology for smooth scrolling and responsiveness.
                                </p>
                            </div>
                            <div className="bg-secondary/30 p-6 rounded-lg">
                                <h4 className="font-bold text-primary mb-3">Camera</h4>
                                <p className="text-sm text-muted-foreground">
                                    Pro camera system with 48MP Main, Ultra Wide, and Telephoto cameras for stunning photos and videos.
                                </p>
                            </div>
                            <div className="bg-secondary/30 p-6 rounded-lg">
                                <h4 className="font-bold text-primary mb-3">Performance</h4>
                                <p className="text-sm text-muted-foreground">
                                    A17 Pro chip delivers incredible performance and efficiency for gaming, apps, and multitasking.
                                </p>
                            </div>
                            <div className="bg-secondary/30 p-6 rounded-lg">
                                <h4 className="font-bold text-primary mb-3">Battery</h4>
                                <p className="text-sm text-muted-foreground">
                                    All-day battery life with up to 29 hours of video playback and fast charging support.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "specifications" && (
                    <div className="space-y-8">
                        {(!product.specifications || (Array.isArray(product.specifications) && product.specifications.length === 0) || Object.keys(product.specifications).length === 0) ? (
                            <p className="text-muted-foreground text-center py-8">No specifications available for this product.</p>
                        ) : (
                            Object.entries(product.specifications).map(([key, category]) => {
                                if (!category || typeof category !== 'object' || !category.specs) return null;
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
                )}
            </div>
        </div>
    );
}
