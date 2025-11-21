"use client";

import { useState } from "react";
import { MessageCircle, Phone, HelpCircle, X } from "lucide-react";

export default function HelpTab() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end">
            {/* Trigger Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary text-white p-3 rounded-l-lg shadow-lg hover:bg-primary/90 transition-all flex flex-col items-center gap-1"
                >
                    <HelpCircle className="h-6 w-6" />
                    <span className="text-xs font-medium writing-mode-vertical">Help</span>
                </button>
            )}

            {/* Expanded Menu */}
            {isOpen && (
                <div className="bg-white border border-border shadow-2xl rounded-l-xl p-4 w-64 mr-0 animate-in slide-in-from-right duration-300">
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                        <h3 className="font-bold text-primary">Need Help?</h3>
                        <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-red-500">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        <a href="#" className="flex items-center gap-3 p-2 hover:bg-secondary rounded-lg transition-colors text-sm">
                            <div className="bg-blue-500 text-white p-2 rounded-full">
                                <MessageCircle className="h-4 w-4" />
                            </div>
                            <span>Chat on Messenger</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 p-2 hover:bg-secondary rounded-lg transition-colors text-sm">
                            <div className="bg-green-500 text-white p-2 rounded-full">
                                <MessageCircle className="h-4 w-4" />
                            </div>
                            <span>Chat on WhatsApp</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 p-2 hover:bg-secondary rounded-lg transition-colors text-sm">
                            <div className="bg-primary text-white p-2 rounded-full">
                                <Phone className="h-4 w-4" />
                            </div>
                            <span>Call Support</span>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
