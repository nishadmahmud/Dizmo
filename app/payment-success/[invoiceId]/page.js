"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Package, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function PaymentSuccessPage({ params }) {
    const { invoiceId } = params;
    const router = useRouter();
    const { clearCart } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Clear the cart when landing on the success page
        clearCart();
    }, [clearCart]);

    if (!mounted) return null;

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900">Payment Successful</h1>

                <p className="text-gray-600">
                    Thank you for your purchase! Your payment has been processed successfully.
                </p>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Order Invoice ID</p>
                    <p className="text-lg font-mono font-bold text-gray-900">{invoiceId}</p>
                </div>

                <div className="pt-6 border-t border-gray-100 space-y-3">
                    <Link
                        href="/user/orders"
                        className="w-full flex items-center justify-center gap-2 bg-[#103E34] text-white py-3.5 px-4 rounded-xl font-medium hover:bg-[#103E34]/90 transition-colors"
                    >
                        <Package className="h-5 w-5" />
                        Track Order
                    </Link>

                    <Link
                        href="/all"
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3.5 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
