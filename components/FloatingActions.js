"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GitCompare, X } from "lucide-react";

export default function FloatingActions() {
    const [showGreeting, setShowGreeting] = useState(false);
    const whatsappNumber = "1234567890"; // Replace with actual WhatsApp number
    const whatsappMessage = "Hi! I need help with my order.";

    useEffect(() => {
        // Show greeting on first load
        const hasSeenGreeting = localStorage.getItem("hasSeenHelpGreeting");
        if (!hasSeenGreeting) {
            setTimeout(() => setShowGreeting(true), 2000);
        }
    }, []);

    const handleDismissGreeting = () => {
        setShowGreeting(false);
        localStorage.setItem("hasSeenHelpGreeting", "true");
    };

    const handleHelpClick = () => {
        setShowGreeting(false);
        localStorage.setItem("hasSeenHelpGreeting", "true");
    };

    return (
        <div className="fixed right-4 md:right-6 bottom-24 md:bottom-6 z-40 flex flex-col items-end gap-3">
            {/* Compare Button */}
            <Link
                href="/compare"
                className="group relative flex items-center justify-center w-12 h-12 bg-[#103E34] hover:bg-[#FCB042] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Compare Products"
            >
                <GitCompare className="h-5 w-5" />
                <span className="absolute right-14 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Compare
                </span>
            </Link>

            {/* Help Button with Avatar and Greeting */}
            <div className="relative flex items-center gap-3">
                {/* Greeting Message - positioned beside the button */}
                {showGreeting && (
                    <div className="relative bg-white rounded-lg shadow-xl p-3 animate-in slide-in-from-right">
                        <button
                            onClick={handleDismissGreeting}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-10"
                            aria-label="Close"
                        >
                            <X className="h-3 w-3" />
                        </button>
                        <p className="text-sm text-gray-800 font-medium whitespace-nowrap pr-2">How can I help you?</p>
                    </div>
                )}

                {/* Help Button */}
                <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleHelpClick}
                    className="group relative flex items-center justify-center w-12 h-12 bg-[#103E34] hover:bg-[#FCB042] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ring-2 ring-white"
                    aria-label="Chat on WhatsApp"
                >
                    {/* Avatar Image */}
                    <img
                        src="/customer_support_avatar.png"
                        alt="Customer Support"
                        className="w-full h-full object-cover"
                    />
                    <span className="absolute right-14 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Chat with us
                    </span>
                </a>
            </div>
        </div>
    );
}
