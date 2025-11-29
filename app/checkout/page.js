"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
    const { cart, cartTotal } = useCart();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        paymentMethod: "cod"
    });
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate order placement
        setTimeout(() => {
            setOrderPlaced(true);
        }, 1500);
    };

    if (orderPlaced) {
        return (
            <main className="min-h-screen flex flex-col bg-background">
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-card border border-border rounded-xl p-8 text-center space-y-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-primary">Order Placed Successfully!</h1>
                        <p className="text-muted-foreground">
                            Thank you for your purchase. Your order has been received and is being processed.
                        </p>
                        <Link
                            href="/"
                            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col bg-background">

            <div className="max-w-6xl mx-auto px-4 py-12">
                <Link href="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
                    <ArrowLeft className="h-4 w-4" /> Back to Cart
                </Link>

                <h1 className="text-3xl font-bold text-primary mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Checkout Form */}
                    <div className="space-y-8">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-bold text-primary mb-6">Shipping Information</h2>
                            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <textarea
                                        name="address"
                                        required
                                        rows="3"
                                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-bold text-primary mb-6">Payment Method</h2>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === "cod"}
                                        onChange={handleInputChange}
                                        className="text-primary focus:ring-primary"
                                    />
                                    <span className="font-medium">Cash on Delivery</span>
                                </label>
                                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="online"
                                        checked={formData.paymentMethod === "online"}
                                        onChange={handleInputChange}
                                        className="text-primary focus:ring-primary"
                                    />
                                    <span className="font-medium">Online Payment (SSLCommerz)</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="h-fit bg-card border border-border rounded-xl p-6 space-y-6">
                        <h3 className="text-xl font-bold text-primary">Your Order</h3>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="text-xs text-muted-foreground">Img</span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                                        <div className="flex justify-between mt-1 text-sm">
                                            <span className="text-muted-foreground">Qty: {item.quantity}</span>
                                            <span className="font-bold">৳{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-border pt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">৳{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="font-medium">Calculated at next step</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t border-border">
                                <span>Total</span>
                                <span>৳{cartTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>

        </main>
    );
}
