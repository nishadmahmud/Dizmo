"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle, Truck, Store, CreditCard, Banknote, Info, CheckSquare, MapPin, ShieldCheck, Loader2, User, Phone, Mail, Home } from "lucide-react";
import AddressSelect from "@/components/AddressSelect";

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();

    // Address state using AddressSelect
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cityId, setCityId] = useState(null);
    const [zoneId, setZoneId] = useState(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        paymentMethod: "cod",
        deliveryMethod: "courier"
    });
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [invoiceId, setInvoiceId] = useState("");
    const [deliveryFee, setDeliveryFee] = useState(0);

    // Load saved details on mount
    useEffect(() => {
        const savedDetails = localStorage.getItem("dizmoCheckoutDetails");
        if (savedDetails) {
            try {
                const parsed = JSON.parse(savedDetails);
                setFormData(prev => ({
                    ...prev,
                    fullName: parsed.fullName || prev.fullName,
                    phone: parsed.phone || prev.phone,
                    email: parsed.email || prev.email,
                    address: parsed.address || prev.address,
                }));
                if (parsed.district) setSelectedDistrict(parsed.district);
                if (parsed.city) setSelectedCity(parsed.city);
            } catch (e) {
                console.error("Failed to parse saved checkout details", e);
            }
        }
    }, []);

    // Update delivery fee based on selection
    useEffect(() => {
        if (!selectedDistrict && !selectedCity) {
            setDeliveryFee(0);
            return;
        }

        let fee = 130; // Default: Outside Dhaka

        if (
            selectedCity === "Demra" ||
            selectedCity?.includes("Savar") ||
            selectedDistrict === "Gazipur" ||
            selectedCity?.includes("Keraniganj")
        ) {
            fee = 90;
        } else if (selectedDistrict === "Dhaka") {
            fee = 70;
        } else {
            fee = 130;
        }

        // Free delivery for pickup
        if (formData.deliveryMethod === 'pickup') {
            fee = 0;
        }

        setDeliveryFee(fee);
    }, [selectedDistrict, selectedCity, formData.deliveryMethod]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreedToTerms) {
            alert("Please agree to the Terms and Conditions");
            return;
        }

        if (!selectedDistrict || !selectedCity) {
            alert("Please select both District and Area");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty");
            return;
        }

        // Phone number validation for Bangladesh
        const phoneRegex = /^01[3-9]\d{8}$/;
        if (!phoneRegex.test(formData.phone)) {
            alert("Please enter a valid 11-digit Bangladeshi phone number");
            return;
        }

        setIsSubmitting(true);
        setError("");

        // Save details to Local Storage
        try {
            const detailsToSave = {
                fullName: formData.fullName,
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
                district: selectedDistrict,
                city: selectedCity
            };
            localStorage.setItem("dizmoCheckoutDetails", JSON.stringify(detailsToSave));
        } catch (error) {
            console.error("Failed to save checkout details", error);
        }

        try {
            const storeId = process.env.NEXT_PUBLIC_STORE_ID;

            // Construct full address string
            const fullAddress = `${formData.address}, ${selectedCity}, ${selectedDistrict}`;

            // Build product array
            const productArray = cart.map(item => ({
                product_id: item.id,
                variant_id: item.variantId || null, // IMEI ID
                model: item.selectedVariants?.model || null,
                qty: item.quantity,
                price: item.price,
                mode: 1,
                size: 1,
                sales_id: parseInt(storeId)
            }));

            // Construct payload
            const payload = {
                pay_mode: formData.paymentMethod === 'cod' ? 'Cash' : 'Online',
                paid_amount: formData.paymentMethod === 'cod' ? 0 : cartTotal + deliveryFee,
                user_id: parseInt(storeId),
                sub_total: cartTotal,
                vat: 0,
                tax: 0,
                discount: 0,
                product: productArray,
                delivery_method_id: formData.deliveryMethod === 'courier' ? 1 : 2,
                delivery_info_id: 1,
                delivery_customer_name: formData.fullName,
                delivery_customer_address: fullAddress,
                delivery_customer_phone: formData.phone,
                delivery_fee: deliveryFee,
                variants: [],
                imeis: [null],
                created_at: new Date().toISOString(),
                customer_id: null,
                customer_name: formData.fullName,
                customer_phone: formData.phone,
                sales_id: parseInt(storeId),
                wholeseller_id: 1,
                status: 3,
                city_id: cityId ? parseInt(String(cityId).replace(/\D/g, '')) : null,
                zone_id: zoneId ? parseInt(String(zoneId).replace(/\D/g, '')) : null,
            };

            const response = await fetch('https://www.outletexpense.xyz/api/public/ecommerce-save-sales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const contentType = response.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const textResponse = await response.text();
                console.error('Server returned non-JSON response:', textResponse.substring(0, 500));
                throw new Error('Server error. Please try again later.');
            }

            if (data.success === false) {
                throw new Error(data.message || 'Failed to place order. Please try again.');
            }

            if (!response.ok) {
                throw new Error(data.message || 'Failed to place order. Please try again.');
            }

            if (data.data?.invoice_id) {
                setInvoiceId(data.data.invoice_id);
            }

            clearCart();
            setOrderPlaced(true);
        } catch (err) {
            console.error('Order placement error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
                        {invoiceId && (
                            <div className="bg-secondary/50 rounded-lg p-4">
                                <p className="text-sm text-muted-foreground">Your Invoice ID</p>
                                <p className="text-lg font-bold text-foreground">{invoiceId}</p>
                            </div>
                        )}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/track-order"
                                className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                            >
                                Track Order
                            </Link>
                            <Link
                                href="/"
                                className="inline-block bg-secondary text-foreground px-6 py-3 rounded-lg font-bold hover:bg-secondary/80 transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    const grandTotal = cartTotal + deliveryFee;

    return (
        <main className="min-h-screen flex flex-col bg-gray-50 py-8 md:py-12">
            <div className="container max-w-[1600px] mx-auto px-4">
                <Link href="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                    <ArrowLeft className="h-4 w-4" /> Back to Cart
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Complete your order by providing your delivery and payment details.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Delivery Info & Methods */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Delivery Information Section */}
                        <section className="rounded-xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
                            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-gray-900">Delivery Address</h2>
                                    <p className="text-xs text-gray-500">Where should we send your order?</p>
                                </div>
                            </div>

                            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <User className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="fullName"
                                                required
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="John Doe"
                                                className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FCB042] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FCB042] transition-all"
                                                style={{ fontSize: '16px' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="01XXXXXXXXX"
                                                className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FCB042] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FCB042] transition-all"
                                                style={{ fontSize: '16px' }}
                                            />
                                        </div>
                                        {formData.phone && !/^01[3-9]\d{8}$/.test(formData.phone) && (
                                            <p className="text-xs text-red-500">Invalid phone number format.</p>
                                        )}
                                        <p className="text-xs text-gray-400">Format: 01XXXXXXXXX (11 digits, starting with 01)</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Email <span className="text-gray-400 font-normal">(Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="email@example.com"
                                            className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FCB042] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FCB042] transition-all"
                                            style={{ fontSize: '16px' }}
                                        />
                                    </div>
                                </div>

                                {/* Address Select */}
                                <div className="space-y-2">
                                    <AddressSelect
                                        selectedDistrict={selectedDistrict}
                                        setSelectedDistrict={setSelectedDistrict}
                                        selectedCity={selectedCity}
                                        setSelectedCity={setSelectedCity}
                                        cityId={cityId}
                                        setCityId={setCityId}
                                        zoneId={zoneId}
                                        setZoneId={setZoneId}
                                    />
                                </div>

                                {/* Detailed Address */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Detailed Address</label>
                                    <div className="relative">
                                        <textarea
                                            name="address"
                                            required
                                            rows={3}
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Street address, house number, landmarks..."
                                            className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-3 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FCB042] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FCB042] transition-all"
                                            style={{ fontSize: '16px' }}
                                        />
                                    </div>
                                </div>
                            </form>
                        </section>

                        {/* Payment & Delivery Methods */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Payment Method */}
                            <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600">
                                        <CreditCard className="h-4 w-4" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900">Payment Method</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:shadow-md h-[120px] ${formData.paymentMethod === 'cod' ? 'border-[#FCB042] bg-[#FCB042]/5 ring-1 ring-[#FCB042]' : 'border-gray-200 bg-white'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            className="hidden"
                                            checked={formData.paymentMethod === 'cod'}
                                            onChange={handleInputChange}
                                        />
                                        <div className="p-2 bg-orange-100 rounded-full text-[#FCB042]">
                                            <Banknote className="h-5 w-5" />
                                        </div>
                                        <span className="text-xs font-bold text-center">Cash on Delivery</span>
                                    </label>

                                    <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:shadow-md h-[120px] ${formData.paymentMethod === 'online' ? 'border-[#FCB042] bg-[#FCB042]/5 ring-1 ring-[#FCB042]' : 'border-gray-200 bg-white'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="online"
                                            className="hidden"
                                            checked={formData.paymentMethod === 'online'}
                                            onChange={handleInputChange}
                                        />
                                        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                                            <CreditCard className="h-5 w-5" />
                                        </div>
                                        <span className="text-xs font-bold text-center">Online Payment</span>
                                        <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">SSLCOMMERZ</span>
                                    </label>
                                </div>
                            </section>

                            {/* Delivery Method */}
                            <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                                        <Truck className="h-4 w-4" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900">Delivery Method</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:shadow-md h-[120px] ${formData.deliveryMethod === 'courier' ? 'border-[#FCB042] bg-[#FCB042]/5 ring-1 ring-[#FCB042]' : 'border-gray-200 bg-white'}`}>
                                        <input
                                            type="radio"
                                            name="deliveryMethod"
                                            value="courier"
                                            className="hidden"
                                            checked={formData.deliveryMethod === 'courier'}
                                            onChange={handleInputChange}
                                        />
                                        <div className="p-2 bg-gray-100 rounded-full text-gray-700">
                                            <Truck className="h-5 w-5" />
                                        </div>
                                        <span className="text-xs font-bold text-center">Courier Service</span>
                                    </label>

                                    <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:shadow-md h-[120px] ${formData.deliveryMethod === 'pickup' ? 'border-[#FCB042] bg-[#FCB042]/5 ring-1 ring-[#FCB042]' : 'border-gray-200 bg-white'}`}>
                                        <input
                                            type="radio"
                                            name="deliveryMethod"
                                            value="pickup"
                                            className="hidden"
                                            checked={formData.deliveryMethod === 'pickup'}
                                            onChange={handleInputChange}
                                        />
                                        <div className="p-2 bg-orange-100 rounded-full text-[#FCB042]">
                                            <Store className="h-5 w-5" />
                                        </div>
                                        <span className="text-xs font-bold text-center">Shop Pickup</span>
                                    </label>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            {/* Product List */}
                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-3 items-start">
                                        <div className="w-14 h-14 bg-gray-50 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-100">
                                            {item.isCarePlan ? (
                                                <div className="w-full h-full bg-black flex items-center justify-center">
                                                    <ShieldCheck className="h-6 w-6 text-[#FCB042]" />
                                                </div>
                                            ) : item.image ? (
                                                <Image unoptimized src={item.image} alt={item.name} width={56} height={56} className="h-full w-full object-cover" />
                                            ) : (
                                                <span className="text-xs text-muted-foreground">Img</span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm line-clamp-2 text-gray-900">{item.name}</h4>
                                            {item.isCarePlan && (
                                                <span className="inline-block text-[10px] bg-black text-white px-1.5 py-0.5 rounded mt-1">Dizmo Care</span>
                                            )}
                                            <p className="text-xs text-gray-500 mt-1">{item.quantity} × ৳{item.price.toLocaleString()}</p>
                                        </div>
                                        <div className="font-bold text-sm text-gray-900">
                                            ৳{(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Coupon */}
                            <div className="mb-6">
                                <label className="text-sm font-bold text-gray-900 mb-2 block">Apply Coupon</label>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="text"
                                        placeholder="Apply Coupon"
                                        className="w-full sm:flex-1 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-[#FCB042] focus:border-[#FCB042]"
                                        style={{ fontSize: '16px' }}
                                    />
                                    <button className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-black/80 transition-colors whitespace-nowrap">
                                        Apply Coupon
                                    </button>
                                </div>
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 border-t border-gray-100 pt-4 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Sub Total ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                                    <span className="font-bold text-gray-900">৳{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Delivery ({selectedCity ? (
                                            selectedCity === "Demra" || selectedCity?.includes("Savar") || selectedDistrict === "Gazipur" || selectedCity?.includes("Keraniganj")
                                                ? "Special Area"
                                                : selectedDistrict === "Dhaka"
                                                    ? "Inside Dhaka"
                                                    : "Outside Dhaka"
                                        ) : "Select address"})
                                    </span>
                                    <span className="font-bold text-gray-900">
                                        {deliveryFee > 0 ? `৳${deliveryFee}` : (formData.deliveryMethod === 'pickup' ? 'Free' : '-')}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Discount</span>
                                    <span className="font-bold text-gray-900">৳0</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center border-t border-gray-100 pt-4 mb-6">
                                <span className="font-bold text-lg text-gray-900">Total Amount</span>
                                <span className="font-bold text-xl text-gray-900">৳{grandTotal.toLocaleString()}</span>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-start gap-2 mb-6">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm focus:ring-[#FCB042] checked:border-[#FCB042] checked:bg-[#FCB042]"
                                        checked={agreedToTerms}
                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    />
                                    <CheckSquare className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 top-0.5 left-0.5" />
                                </div>
                                <label htmlFor="terms" className="text-xs text-gray-500 cursor-pointer select-none">
                                    I have read & agree to the website <Link href="/terms" className="text-[#FCB042] hover:underline">Terms and Conditions</Link>
                                </label>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={isSubmitting || cart.length === 0}
                                className="w-full bg-[#FCB042] text-white py-3.5 rounded-full font-bold hover:bg-[#e5a03d] transition-colors shadow-lg hover:shadow-[#FCB042]/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Placing Order...
                                    </>
                                ) : (
                                    'Confirm & Place Order'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
