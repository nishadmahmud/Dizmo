"use client";

import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function CartDrawer() {
    const { cart, isDrawerOpen, closeDrawer, removeFromCart, updateQuantity, cartTotal } = useCart();
    const pathname = usePathname();
    const prevPathname = useRef(pathname);

    // Close drawer only when route actually changes
    useEffect(() => {
        if (prevPathname.current !== pathname) {
            closeDrawer();
            prevPathname.current = pathname;
        }
    }, [pathname, closeDrawer]);

    if (!isDrawerOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
                onClick={closeDrawer}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 transform transition-transform duration-300 flex flex-col border-l border-border animate-in slide-in-from-right">
                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/30">
                    <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5" />
                        Your Cart ({cart.length})
                    </h2>
                    <button onClick={closeDrawer} className="p-2 hover:bg-secondary rounded-full text-muted-foreground hover:text-red-500 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                            <ShoppingBag className="h-16 w-16 opacity-20" />
                            <p>Your cart is empty</p>
                            <button onClick={closeDrawer} className="text-primary font-medium hover:underline">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-card p-3 rounded-lg border border-border">
                                {/* Image Placeholder */}
                                {/* Image */}
                                <div className="h-20 w-20 bg-secondary rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-xs text-muted-foreground">Img</span>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-medium text-foreground line-clamp-1">{item.name}</h3>
                                        <p className="text-sm text-primary font-bold">৳{item.price.toLocaleString()}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-3 bg-secondary rounded-full px-2 py-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:text-primary disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:text-primary"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-muted-foreground hover:text-red-500 p-1"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-4 border-t border-border bg-secondary/30 space-y-4">
                        <div className="flex justify-between items-center text-lg font-bold text-primary">
                            <span>Subtotal</span>
                            <span>৳{cartTotal.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">Shipping & taxes calculated at checkout</p>

                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                href="/cart"
                                className="flex items-center justify-center py-3 rounded-lg border border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
                            >
                                View Cart
                            </Link>
                            <Link
                                href="/checkout"
                                className="flex items-center justify-center py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
