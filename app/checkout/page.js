"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSuccess(true);
            clearCart();
        }, 1500);
    };

    if (isSuccess) {
        return (
            <main className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <div className="bg-green-100 p-6 rounded-full mb-6">
                        <CheckCircle className="h-16 w-16 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-primary mb-4">Order Placed Successfully!</h1>
                    <p className="text-muted-foreground max-w-md mb-8">
                        Thank you for shopping with Dizmo. Your order has been confirmed and will be shipped soon.
                    </p>
                    <a href="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90">
                        Back to Home
                    </a>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="container py-12">
                <h1 className="text-3xl font-bold text-primary mb-8">Fill Gadget & Go</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Checkout Form */}
                    <div className="flex-1">
                        <form onSubmit={handlePlaceOrder} className="space-y-8">
                            {/* Personal Info */}
                            <section className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground border-b pb-2">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name</label>
                                        <input required type="text" className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary outline-none" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Phone Number</label>
                                        <input required type="tel" className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary outline-none" placeholder="+880 1..." />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <input required type="email" className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary outline-none" placeholder="john@example.com" />
                                </div>
                            </section>

                            {/* Shipping Address */}
                            <section className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground border-b pb-2">Shipping Address</h3>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Address</label>
                                    <textarea required className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary outline-none h-24" placeholder="House, Road, Area..." />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">City</label>
                                        <select className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary outline-none">
                                            <option>Dhaka</option>
                                            <option>Chittagong</option>
                                            <option>Sylhet</option>
                                            <option>Khulna</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Postal Code</label>
                                        <input type="text" className="w-full p-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary outline-none" placeholder="1234" />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Method */}
                            <section className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground border-b pb-2">Payment Method</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50">
                                        <input type="radio" name="payment" defaultChecked className="text-primary focus:ring-primary" />
                                        <span className="font-medium">Cash on Delivery (COD)</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50">
                                        <input type="radio" name="payment" className="text-primary focus:ring-primary" />
                                        <span className="font-medium">Bkash / Nagad / Rocket</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50">
                                        <input type="radio" name="payment" className="text-primary focus:ring-primary" />
                                        <span className="font-medium">Credit / Debit Card</span>
                                    </label>
                                </div>
                            </section>

                            <button type="submit" className="w-full bg-accent text-accent-foreground font-bold py-4 rounded-lg hover:bg-accent/90 transition-colors text-lg shadow-lg">
                                Place Order (৳{cartTotal.toLocaleString()})
                            </button>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="w-full lg:w-96 h-fit bg-secondary/30 p-6 rounded-xl border border-border">
                        <h3 className="text-lg font-bold text-primary mb-4">Your Order</h3>
                        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-3 text-sm">
                                    <div className="w-12 h-12 bg-white rounded border border-border flex items-center justify-center flex-shrink-0">
                                        <span className="text-[10px] text-muted-foreground">Img</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium line-clamp-2">{item.name}</p>
                                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold">৳{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-border pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>৳{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Shipping</span>
                                <span>৳100</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg text-primary pt-2 border-t border-border mt-2">
                                <span>Total</span>
                                <span>৳{(cartTotal + 100).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
