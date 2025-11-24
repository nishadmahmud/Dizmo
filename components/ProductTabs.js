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
                    <div className="prose prose-sm md:prose-base max-w-none">
                        {/* Render HTML description from API */}
                        <div
                            className="
                                [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-primary [&>h1]:mb-4 [&>h1]:mt-6
                                [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-primary [&>h2]:mb-3 [&>h2]:mt-5
                                [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mb-2 [&>h3]:mt-4
                                [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-4
                                [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>ul]:space-y-2
                                [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4 [&>ol]:space-y-2
                                [&>li]:text-muted-foreground [&>li]:leading-relaxed
                                [&>img]:rounded-lg [&>img]:my-4 [&>img]:w-full [&>img]:h-auto [&>img]:object-contain
                                [&>strong]:font-semibold [&>strong]:text-foreground
                                [&>a]:text-primary [&>a]:underline [&>a]:hover:text-primary/80
                                [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4
                                [&>code]:bg-secondary [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm
                                [&>pre]:bg-secondary [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-4
                            "
                            dangerouslySetInnerHTML={{ __html: product.description || "No description available." }}
                        />
                    </div>
                )}

                {activeTab === "specifications" && (
                    <div className="space-y-8">
                        {(!product.specifications ||
                            (Array.isArray(product.specifications) && product.specifications.length === 0) ||
                            (typeof product.specifications === 'object' && Object.keys(product.specifications).length === 0)) ? (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground mb-2">No specifications available for this product.</p>
                                {/* Debug info - remove in production */}
                                <p className="text-xs text-muted-foreground/50">
                                    Specifications type: {Array.isArray(product.specifications) ? 'array' : typeof product.specifications}
                                </p>
                            </div>
                        ) : Array.isArray(product.specifications) && product.specifications.length > 0 ? (
                            // Handle array format from API
                            product.specifications.map((spec, index) => (
                                <div key={index} className="border-b border-border pb-6 last:border-0">
                                    <h3 className="text-lg font-bold text-primary mb-4">{spec.title || spec.name || `Specification ${index + 1}`}</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {spec.details && typeof spec.details === 'object' && Object.entries(spec.details).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 border-b border-border/50 last:border-0"
                                            >
                                                <span className="font-medium text-foreground">{key}</span>
                                                <span className="text-muted-foreground md:col-span-2">{value}</span>
                                            </div>
                                        ))}
                                        {spec.value && (
                                            <div className="py-2">
                                                <span className="text-muted-foreground">{spec.value}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
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
                )}
            </div>
        </div>
    );
}
