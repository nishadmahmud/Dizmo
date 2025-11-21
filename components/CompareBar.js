"use client";

import { useState } from "react";
import { ArrowLeftRight, X } from "lucide-react";
import Link from "next/link";

export default function CompareBar() {
    // Dummy state for demonstration
    const [compareCount, setCompareCount] = useState(2);
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible || compareCount === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 animate-in slide-in-from-bottom duration-500">
            <div className="container flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-accent text-accent-foreground p-2 rounded-full">
                        <ArrowLeftRight className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-bold text-primary">{compareCount} items selected</p>
                        <p className="text-xs text-muted-foreground">Compare products to find the best deal</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setCompareCount(0)}
                        className="text-sm text-muted-foreground hover:text-red-500 underline"
                    >
                        Clear All
                    </button>
                    <Link
                        href="/compare"
                        className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors"
                    >
                        Compare Now
                    </Link>
                    <button onClick={() => setIsVisible(false)} className="md:hidden text-muted-foreground">
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
