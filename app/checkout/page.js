"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Truck, Store, CreditCard, Banknote, Info, CheckSquare, MapPin } from "lucide-react";

export default function CheckoutPage() {
    const { cart, cartTotal } = useCart();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        division: "",
        district: "",
        upazila: "",
        postCode: "",
        address: "",
        paymentMethod: "cod",
        deliveryMethod: "courier"
    });
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const districts = {
        dhaka: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
        chittagong: ["Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati"],
        sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
        khulna: ["Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
        rajshahi: ["Bogra", "Chapainawabganj", "Joypurhat", "Naogaon", "Natore", "Pabna", "Rajshahi", "Sirajganj"],
        rangpur: ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
        barisal: ["Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
        mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"]
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            // Reset district if division changes
            if (name === 'division') {
                return { ...prev, [name]: value, district: "" };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreedToTerms) {
            alert("Please agree to the Terms and Conditions");
            return;
        }
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
        <main className="min-h-screen flex flex-col bg-background py-8 md:py-12">
            <div className="container max-w-[1600px] mx-auto px-4">
                <Link href="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
                    <ArrowLeft className="h-4 w-4" /> Back to Cart
                </Link>

                <h1 className="text-3xl font-bold text-primary mb-8">Confirm your order</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Delivery Info & Methods */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-foreground mb-6">Delivery Information</h2>
                            <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Full Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Enter full name"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Phone Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter phone number"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Division <span className="text-red-500">*</span></label>
                                    <select
                                        name="division"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-muted-foreground"
                                        value={formData.division}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select your division</option>
                                        <option value="dhaka">Dhaka</option>
                                        <option value="chittagong">Chittagong</option>
                                        <option value="sylhet">Sylhet</option>
                                        <option value="khulna">Khulna</option>
                                        <option value="rajshahi">Rajshahi</option>
                                        <option value="rangpur">Rangpur</option>
                                        <option value="barisal">Barisal</option>
                                        <option value="mymensingh">Mymensingh</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">District <span className="text-red-500">*</span></label>
                                    <select
                                        name="district"
                                        required
                                        disabled={!formData.division}
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select your city</option>
                                        {formData.division && districts[formData.division]?.map((district) => (
                                            <option key={district} value={district.toLowerCase()}>{district}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Upazila <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="upazila"
                                        placeholder="Enter your area/upazila"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        value={formData.upazila}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Post Code</label>
                                    <input
                                        type="text"
                                        name="postCode"
                                        placeholder="Enter Post Code"
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        value={formData.postCode}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Address <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="For ex: House: 23, Road: 24, Block: B"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Payment Method */}
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-4">Payment Method</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:shadow-md h-[140px] ${formData.paymentMethod === 'cod' ? 'border-[#FCB042] bg-[#FCB042]/5 ring-1 ring-[#FCB042]' : 'border-border bg-card'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            className="hidden"
                                            checked={formData.paymentMethod === 'cod'}
                                            onChange={handleInputChange}
                                        />
                                        <div className="p-2 bg-orange-100 rounded-full text-[#FCB042]">
                                            <Banknote className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs font-bold text-center">Cash on Delivery</span>
                                    </label>

                                    <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:shadow-md h-[140px] ${formData.paymentMethod === 'online' ? 'border-[#FCB042] bg-[#FCB042]/5 ring-1 ring-[#FCB042]' : 'border-border bg-card'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="online"
                                            className="hidden"
                                            checked={formData.paymentMethod === 'online'}
                                            onChange={handleInputChange}
                                        />
                                        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                                            <CreditCard className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs font-bold text-center">Online Payment</span>
                                        <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">SSLCOMMERZ</span>
                                    </label>
                                </div>
                            </div>

                            {/* Delivery Method */}
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-4">Delivery Method</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:shadow-md h-[140px] ${formData.deliveryMethod === 'courier' ? 'border-[#FCB042] bg-[#FCB042]/5 ring-1 ring-[#FCB042]' : 'border-border bg-card'}`}>
                                        <input
                                            type="radio"
                                            name="deliveryMethod"
                                            value="courier"
                                            className="hidden"
                                            checked={formData.deliveryMethod === 'courier'}
                                            onChange={handleInputChange}
                                        />
                                        <div className="p-2 bg-gray-100 rounded-full text-gray-700">
                                            <Truck className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs font-bold text-center">Courier Service</span>
                                    </label>

                                    <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:shadow-md h-[140px] ${formData.deliveryMethod === 'pickup' ? 'border-[#FCB042] bg-[#FCB042]/5 ring-1 ring-[#FCB042]' : 'border-border bg-card'}`}>
                                        <input
                                            type="radio"
                                            name="deliveryMethod"
                                            value="pickup"
                                            className="hidden"
                                            checked={formData.deliveryMethod === 'pickup'}
                                            onChange={handleInputChange}
                                        />
                                        <div className="p-2 bg-orange-100 rounded-full text-[#FCB042]">
                                            <Store className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs font-bold text-center">Shop Pickup</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                            {/* Product List */}
                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-3 items-start">
                                        <div className="w-14 h-14 bg-secondary rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden border border-border">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <span className="text-xs text-muted-foreground">Img</span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm line-clamp-2 text-foreground">{item.name}</h4>
                                            <p className="text-xs text-muted-foreground mt-1">{item.quantity} quantity</p>
                                        </div>
                                        <div className="font-bold text-sm">
                                            ৳{(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Coupon */}
                            <div className="mb-6">
                                <label className="text-sm font-bold text-foreground mb-2 block">Apply Coupon</label>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="text"
                                        placeholder="Apply Coupon"
                                        className="w-full sm:flex-1 px-4 py-2 rounded-full border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                    <button className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-black/80 transition-colors whitespace-nowrap">
                                        Apply Coupon
                                    </button>
                                </div>
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 border-t border-border pt-4 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Sub Total ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                                    <span className="font-bold">৳{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Delivery</span>
                                    <div className="flex items-center gap-1 text-orange-500 text-xs">
                                        <Info className="h-3 w-3" />
                                        <span>will be added</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Discount</span>
                                    <span className="font-bold">৳0</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center border-t border-border pt-4 mb-6">
                                <span className="font-bold text-lg text-foreground">Total Amount</span>
                                <span className="font-bold text-xl text-foreground">৳{cartTotal.toLocaleString()}</span>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-start gap-2 mb-6">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm focus:ring-primary checked:border-primary checked:bg-primary"
                                        checked={agreedToTerms}
                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    />
                                    <CheckSquare className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 top-0.5 left-0.5" />
                                </div>
                                <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer select-none">
                                    I have read & agree to the website <Link href="/terms" className="text-[#FCB042] hover:underline">Terms and Conditions</Link>
                                </label>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                className="w-full bg-[#FCB042] text-white py-3.5 rounded-full font-bold hover:bg-[#e5a03d] transition-colors shadow-lg hover:shadow-[#FCB042]/25"
                            >
                                Confirm & Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
