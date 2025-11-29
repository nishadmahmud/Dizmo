"use client";

import { useState } from "react";
import { Package, Search, Clock, CheckCircle2, Truck } from "lucide-react";

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("");
    const [tracking, setTracking] = useState(null);

    const handleTrack = (e) => {
        e.preventDefault();
        // Dummy tracking data
        setTracking({
            orderId: orderId,
            status: "In Transit",
            estimatedDelivery: "January 25, 2025",
            timeline: [
                { status: "Order Placed", date: "Jan 20, 2025 10:30 AM", completed: true },
                { status: "Order Confirmed", date: "Jan 20, 2025 11:00 AM", completed: true },
                { status: "Shipped", date: "Jan 21, 2025 2:00 PM", completed: true },
                { status: "In Transit", date: "Jan 22, 2025 9:00 AM", completed: true },
                { status: "Out for Delivery", date: "Pending", completed: false },
                { status: "Delivered", date: "Pending", completed: false },
            ],
        });
    };

    return (
        <main className="min-h-screen flex flex-col bg-background">

            <div className="container py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                        <Package className="h-5 w-5" />
                        <span className="font-bold">Track Your Order</span>
                    </div>
                    <h1 className="text-4xl font-bold text-primary mb-4">Order Tracking</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Enter your order ID to track your package in real-time.
                    </p>
                </div>

                {/* Search Form */}
                <div className="max-w-2xl mx-auto mb-12">
                    <form onSubmit={handleTrack} className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                placeholder="Enter your order ID (e.g., DZ123456)"
                                className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Track
                        </button>
                    </form>
                </div>

                {/* Tracking Results */}
                {tracking && (
                    <div className="max-w-3xl mx-auto">
                        {/* Order Info Card */}
                        <div className="bg-card border border-border rounded-xl p-6 mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-primary mb-1">Order #{tracking.orderId}</h2>
                                    <p className="text-sm text-muted-foreground">Current Status: <span className="text-accent font-semibold">{tracking.status}</span></p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                        <Clock className="h-4 w-4" />
                                        <span>Estimated Delivery</span>
                                    </div>
                                    <p className="font-bold text-primary">{tracking.estimatedDelivery}</p>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="font-bold text-primary mb-6 flex items-center gap-2">
                                <Truck className="h-5 w-5" />
                                Tracking Timeline
                            </h3>
                            <div className="space-y-6">
                                {tracking.timeline.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center ${item.completed
                                                    ? "bg-accent text-white"
                                                    : "bg-secondary text-muted-foreground"
                                                    }`}
                                            >
                                                {item.completed ? (
                                                    <CheckCircle2 className="h-5 w-5" />
                                                ) : (
                                                    <div className="w-3 h-3 rounded-full border-2 border-current" />
                                                )}
                                            </div>
                                            {index < tracking.timeline.length - 1 && (
                                                <div
                                                    className={`w-0.5 h-12 ${item.completed ? "bg-accent" : "bg-border"
                                                        }`}
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 pb-6">
                                            <h4 className={`font-semibold ${item.completed ? "text-foreground" : "text-muted-foreground"}`}>
                                                {item.status}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">{item.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!tracking && (
                    <div className="max-w-2xl mx-auto text-center py-12">
                        <div className="bg-secondary/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                            <Package className="h-12 w-12 text-muted-foreground opacity-50" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Enter Your Order ID</h3>
                        <p className="text-muted-foreground">
                            You can find your order ID in the confirmation email we sent you.
                        </p>
                    </div>
                )}
            </div>

        </main>
    );
}
