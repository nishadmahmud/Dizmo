"use client";

import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

    return (
        <main className="min-h-screen flex flex-col bg-background">

            <div className="max-w-6xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-20 bg-secondary/30 rounded-xl">
                        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
                        <Link href="/products" className="text-primary underline hover:text-accent">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Cart Items */}
                        <div className="flex-1 space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 bg-card border border-border rounded-xl">
                                    {/* Image */}
                                    <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="text-xs text-muted-foreground">Img</span>
                                        )}
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-muted-foreground hover:text-red-500"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center gap-3 bg-secondary rounded-full px-3 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:text-primary disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="font-bold w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:text-primary"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <span className="text-xl font-bold text-primary">৳{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-96 h-fit bg-card border border-border rounded-xl p-6 space-y-6">
                            <h3 className="text-xl font-bold text-primary">Order Summary</h3>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">৳{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="font-medium">Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span className="font-medium">Included</span>
                                </div>
                            </div>

                            <div className="border-t border-border pt-4 flex justify-between items-center text-lg font-bold text-primary">
                                <span>Total</span>
                                <span>৳{cartTotal.toLocaleString()}</span>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                            >
                                Proceed to Checkout <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>

        </main>
    );
}
