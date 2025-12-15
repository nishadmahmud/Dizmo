"use client";

import { useState } from "react";
import { Package, Search, Clock, CheckCircle2, Truck, MapPin, Phone, User, CreditCard, AlertCircle, Loader2, ShoppingBag } from "lucide-react";
import Image from "next/image";

const API_URL = "https://www.outletexpense.xyz/api/search-web-invoice";
const USER_ID = 265;

// Helper function to get status text and color
const getOrderStatus = (status) => {
    switch (status) {
        case 0:
            return { text: "Pending", color: "text-yellow-600", bgColor: "bg-yellow-100" };
        case 1:
            return { text: "Processing", color: "text-blue-600", bgColor: "bg-blue-100" };
        case 2:
            return { text: "Confirmed", color: "text-green-600", bgColor: "bg-green-100" };
        case 3:
            return { text: "Shipped", color: "text-purple-600", bgColor: "bg-purple-100" };
        case 4:
            return { text: "Delivered", color: "text-green-700", bgColor: "bg-green-200" };
        case 5:
            return { text: "Cancelled", color: "text-red-600", bgColor: "bg-red-100" };
        default:
            return { text: "Unknown", color: "text-gray-600", bgColor: "bg-gray-100" };
    }
};

// Helper function to format date
const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

// Helper function to format currency
const formatCurrency = (amount) => {
    return `৳${parseFloat(amount || 0).toLocaleString()}`;
};

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("");
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTrack = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setOrderData(null);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    invoice_id: orderId.trim(),
                    user_id: USER_ID,
                }),
            });

            const result = await response.json();

            if (result.success && result.data?.data?.length > 0) {
                setOrderData(result.data.data[0]);
            } else {
                setError("Order not found. Please check your Invoice ID and try again.");
            }
        } catch (err) {
            console.error("Error fetching order:", err);
            setError("Failed to fetch order details. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const orderStatus = orderData ? getOrderStatus(orderData.status) : null;

    // Generate timeline based on order status
    const generateTimeline = (order) => {
        if (!order) return [];

        const createdAt = formatDate(order.created_at);
        const status = order.status;

        const timeline = [
            {
                status: "Order Placed",
                date: createdAt,
                completed: true,
                icon: ShoppingBag
            },
            {
                status: "Order Confirmed",
                date: status >= 2 ? createdAt : "Pending",
                completed: status >= 2,
                icon: CheckCircle2
            },
            {
                status: "Processing",
                date: status >= 1 ? createdAt : "Pending",
                completed: status >= 1,
                icon: Clock
            },
            {
                status: "Shipped",
                date: status >= 3 ? "Shipped" : "Pending",
                completed: status >= 3,
                icon: Truck
            },
            {
                status: "Delivered",
                date: status >= 4 ? "Delivered" : "Pending",
                completed: status >= 4,
                icon: Package
            },
        ];

        return timeline;
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
                        Enter your Invoice ID to track your package in real-time.
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
                                placeholder="Enter your Invoice ID (e.g., INV-2025-12-14-75889)"
                                className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Tracking...
                                </>
                            ) : (
                                "Track"
                            )}
                        </button>
                    </form>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="max-w-3xl mx-auto mb-8">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                            <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                {/* Tracking Results */}
                {orderData && (
                    <div className="max-w-4xl mx-auto">
                        {/* Order Info Card */}
                        <div className="bg-card border border-border rounded-xl p-6 mb-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-primary mb-1">
                                        Invoice: {orderData.invoice_id}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Order Date: {formatDate(orderData.created_at)}
                                    </p>
                                </div>
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${orderStatus?.bgColor}`}>
                                    <CheckCircle2 className={`h-5 w-5 ${orderStatus?.color}`} />
                                    <span className={`font-semibold ${orderStatus?.color}`}>
                                        {orderStatus?.text}
                                    </span>
                                </div>
                            </div>

                            {/* Customer & Delivery Info */}
                            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border">
                                {/* Customer Info */}
                                <div>
                                    <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Customer Information
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <p><span className="text-muted-foreground">Name:</span> {orderData.delivery_customer_name || orderData.customer_name}</p>
                                        <p className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            {orderData.delivery_customer_phone || orderData.customer_phone}
                                        </p>
                                    </div>
                                </div>

                                {/* Delivery Info */}
                                <div>
                                    <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Delivery Address
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <p className="whitespace-pre-line">{orderData.delivery_customer_address || "N/A"}</p>
                                        <p><span className="text-muted-foreground">District:</span> {orderData.delivery_district || "N/A"}</p>
                                        <p><span className="text-muted-foreground">Delivery Method:</span> {orderData.delivery_method?.type_name || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="bg-card border border-border rounded-xl p-6 mb-8">
                            <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                Order Items
                            </h3>
                            <div className="space-y-4">
                                {orderData.sales_details?.map((item, index) => (
                                    <div key={index} className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                                        {item.product_info?.image_path && (
                                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                                                <Image
                                                    src={item.product_info.image_path}
                                                    alt={item.product_info.name || "Product"}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-foreground truncate">
                                                {item.product_info?.name || "Product"}
                                            </h4>
                                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                                                <span>Qty: {item.qty}</span>
                                                <span>Price: {formatCurrency(item.price)}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-primary">
                                                {formatCurrency(item.qty * item.price)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="mt-6 pt-4 border-t border-border">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{formatCurrency(orderData.sub_total)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Delivery Fee</span>
                                        <span>{formatCurrency(orderData.delivery_fee)}</span>
                                    </div>
                                    {orderData.discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>-{formatCurrency(orderData.discount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                                        <span>Total</span>
                                        <span className="text-primary">
                                            {formatCurrency((orderData.sub_total || 0) + (orderData.delivery_fee || 0) - (orderData.discount || 0))}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="mt-4 pt-4 border-t border-border">
                                <div className="flex items-center gap-2 text-sm">
                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Payment Method:</span>
                                    <span className="font-medium">{orderData.pay_mode}</span>
                                    <span className={`ml-2 px-2 py-0.5 rounded text-xs ${orderData.transaction_status === "Credit"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-green-100 text-green-700"
                                        }`}>
                                        {orderData.transaction_status === "Credit" ? "Pending Payment" : "Paid"}
                                    </span>
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
                                {generateTimeline(orderData).map((item, index, arr) => {
                                    const IconComponent = item.icon;
                                    return (
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
                                                        <IconComponent className="h-5 w-5" />
                                                    )}
                                                </div>
                                                {index < arr.length - 1 && (
                                                    <div
                                                        className={`w-0.5 h-12 ${item.completed ? "bg-accent" : "bg-border"}`}
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
                                    );
                                })}
                            </div>
                        </div>

                        {/* Seller Info */}
                        {orderData.user_info && (
                            <div className="mt-8 bg-secondary/30 rounded-xl p-6">
                                <h3 className="font-semibold text-primary mb-3">Seller Information</h3>
                                <div className="flex items-center gap-4">
                                    {orderData.user_info.profile_pic && (
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                            <Image
                                                src={orderData.user_info.profile_pic}
                                                alt={orderData.user_info.outlet_name || "Seller"}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-medium">{orderData.user_info.outlet_name}</p>
                                        <p className="text-sm text-muted-foreground">{orderData.user_info.phone}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {!orderData && !loading && !error && (
                    <div className="max-w-2xl mx-auto text-center py-12">
                        <div className="bg-secondary/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                            <Package className="h-12 w-12 text-muted-foreground opacity-50" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Enter Your Invoice ID</h3>
                        <p className="text-muted-foreground">
                            You can find your Invoice ID in the confirmation message or invoice we sent you.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
