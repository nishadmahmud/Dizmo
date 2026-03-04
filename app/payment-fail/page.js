"use client";

import { XCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentFailPage() {
    const router = useRouter();

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="h-10 w-10 text-red-600" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900">Payment Failed</h1>

                <p className="text-gray-600">
                    We're sorry, but your payment could not be processed. Your order has not been completed.
                </p>

                <div className="bg-red-50 rounded-xl p-4 border border-red-100 text-sm text-red-800">
                    Your cart items have been saved. You can try checking out again with a different payment method.
                </div>

                <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
                    <button
                        onClick={() => router.push('/checkout')}
                        className="w-full flex items-center justify-center gap-2 bg-[#FCB042] text-[#103E34] py-3.5 px-4 rounded-xl font-bold hover:bg-[#FCB042]/90 transition-colors"
                    >
                        <RefreshCcw className="h-5 w-5" />
                        Try Again
                    </button>

                    <Link
                        href="/cart"
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3.5 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Return to Cart
                    </Link>
                </div>
            </div>
        </div>
    );
}
