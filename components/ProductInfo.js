"use client";

import { useState } from "react";
import { ShieldCheck, MapPin, CreditCard, Truck, Star, Share2, Plus, Minus, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductInfo({ product }) {
    const [selectedStorage, setSelectedStorage] = useState(product.variants?.storage?.[0]?.id || null);
    const [selectedColor, setSelectedColor] = useState(product.variants?.colors?.[0]?.id || null);
    const [selectedRegion, setSelectedRegion] = useState(product.variants?.regions?.[0]?.id || null);
    const [selectedCarePlans, setSelectedCarePlans] = useState([]);
    const [deliveryMethod, setDeliveryMethod] = useState("delivery");
    const [emiModalOpen, setEmiModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart();
    const router = useRouter();

    // Calculate current price based on selected storage
    const getCurrentPrice = () => {
        if (!product.variants?.storage) return product.price;
        const storage = product.variants.storage.find(s => s.id === selectedStorage);
        return storage?.price || product.price;
    };

    // Calculate total with care plans
    const getTotalPrice = () => {
        let total = getCurrentPrice();
        selectedCarePlans.forEach(planId => {
            const plan = product.carePlans?.find(p => p.id === planId);
            if (plan) total += plan.price;
        });
        return total;
    };

    const toggleCarePlan = (planId) => {
        setSelectedCarePlans(prev =>
            prev.includes(planId)
                ? prev.filter(id => id !== planId)
                : [...prev, planId]
        );
    };

    const handleAddToCart = () => {
        const productWithVariants = {
            ...product,
            selectedVariants: {
                storage: product.variants?.storage?.find(s => s.id === selectedStorage)?.label,
                color: product.variants?.colors?.find(c => c.id === selectedColor)?.label,
                region: product.variants?.regions?.find(r => r.id === selectedRegion)?.label,
            },
            carePlans: selectedCarePlans.map(id => product.carePlans?.find(p => p.id === id)?.name),
            price: getTotalPrice(),
        };
        addToCart(productWithVariants, quantity);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push("/checkout");
    };

    const currentPrice = getCurrentPrice();
    const totalPrice = getTotalPrice();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="bg-accent/10 text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                        {product.stock || "In Stock"}
                    </span>
                    <div className="flex gap-2 text-muted-foreground">
                        <button className="hover:text-primary"><Share2 className="h-5 w-5" /></button>
                    </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-primary">{product.name}</h1>
                <div className="flex items-center gap-2 text-sm">
                    <div className="flex text-accent">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                    </div>
                    <span className="text-muted-foreground">(12 Reviews)</span>
                </div>
            </div>

            {/* Price */}
            <div className="space-y-1 border-t border-b border-border py-4">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-primary">৳{totalPrice.toLocaleString()}</span>
                    {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">৳{product.originalPrice.toLocaleString()}</span>
                    )}
                </div>
                <p className="text-xs text-muted-foreground">Price includes VAT</p>
            </div>

            {/* Storage Variant Selector */}
            {product.variants?.storage && (
                <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Storage</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.variants.storage.map((storage) => (
                            <button
                                key={storage.id}
                                onClick={() => setSelectedStorage(storage.id)}
                                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedStorage === storage.id
                                    ? "border-primary bg-primary text-white"
                                    : "border-border hover:border-primary/50"
                                    }`}
                            >
                                <div>{storage.label}</div>
                                <div className="text-xs opacity-80">৳{storage.price.toLocaleString()}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Color Variant Selector */}
            {product.variants?.colors && (
                <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Color</h3>
                    <div className="flex flex-wrap gap-3">
                        {product.variants.colors.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => setSelectedColor(color.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${selectedColor === color.id
                                    ? "border-primary ring-2 ring-primary"
                                    : "border-border hover:border-primary/50"
                                    }`}
                            >
                                <div
                                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                    style={{ backgroundColor: color.hex }}
                                />
                                <span className="text-sm font-medium">{color.label}</span>
                                {selectedColor === color.id && <Check className="h-4 w-4 text-primary" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Region Variant Selector */}
            {product.variants?.regions && (
                <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Region</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {product.variants.regions.map((region) => (
                            <button
                                key={region.id}
                                onClick={() => setSelectedRegion(region.id)}
                                className={`px-3 py-2 rounded-lg border text-sm transition-all ${selectedRegion === region.id
                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                    : "border-border hover:border-primary/50"
                                    }`}
                            >
                                <div className="font-medium">{region.label}</div>
                                <div className="text-xs text-muted-foreground">{region.description}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* EMI Option */}
            <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                            <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold text-primary">EMI Available</p>
                            <p className="text-xs text-muted-foreground">Starting from ৳{Math.round(currentPrice / 12).toLocaleString()}/mo</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setEmiModalOpen(!emiModalOpen)}
                        className="text-sm font-medium text-primary underline hover:text-primary/80"
                    >
                        View Plans
                    </button>
                </div>

                {emiModalOpen && (
                    <div className="mt-4 pt-4 border-t border-border text-sm">
                        <h4 className="font-bold mb-2">EMI Plans (0% Interest)</h4>
                        <ul className="space-y-1 text-muted-foreground">
                            <li className="flex justify-between"><span>3 Months</span> <span>৳{Math.round(currentPrice / 3).toLocaleString()}/mo</span></li>
                            <li className="flex justify-between"><span>6 Months</span> <span>৳{Math.round(currentPrice / 6).toLocaleString()}/mo</span></li>
                            <li className="flex justify-between"><span>12 Months</span> <span>৳{Math.round(currentPrice / 12).toLocaleString()}/mo</span></li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Dizmo Care Plans */}
            {product.carePlans && product.carePlans.length > 0 && (
                <div className="space-y-3">
                    <h3 className="font-semibold text-primary flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-accent" />
                        Dizmo Care+ Protection
                    </h3>
                    <div className="space-y-2">
                        {product.carePlans.map((plan) => (
                            <label
                                key={plan.id}
                                className={`cursor-pointer border p-3 rounded-lg flex items-start gap-3 transition-all ${selectedCarePlans.includes(plan.id)
                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                    : "border-border hover:border-primary/50"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCarePlans.includes(plan.id)}
                                    onChange={() => toggleCarePlan(plan.id)}
                                    className="mt-1"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <span className="font-medium block">{plan.name}</span>
                                        <span className="text-sm font-bold text-primary">+৳{plan.price.toLocaleString()}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground block mt-1">{plan.description}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Delivery Method */}
            <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Delivery Method</h3>
                <div className="flex gap-3">
                    <button
                        onClick={() => setDeliveryMethod("delivery")}
                        className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-all ${deliveryMethod === "delivery"
                            ? "border-primary bg-primary text-white"
                            : "border-border hover:border-primary/50"
                            }`}
                    >
                        <Truck className="h-5 w-5" />
                        <span className="text-sm font-medium">Home Delivery</span>
                    </button>
                    <button
                        onClick={() => setDeliveryMethod("pickup")}
                        className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-all ${deliveryMethod === "pickup"
                            ? "border-primary bg-primary text-white"
                            : "border-border hover:border-primary/50"
                            }`}
                    >
                        <MapPin className="h-5 w-5" />
                        <span className="text-sm font-medium">Store Pickup</span>
                    </button>
                </div>
                {deliveryMethod === "pickup" && (
                    <div className="text-sm text-accent-foreground bg-accent/10 p-3 rounded-lg">
                        Available at: <strong>Bashundhara City, Level 4</strong>. Ready in 2 hours.
                    </div>
                )}
            </div>

            {/* Quantity & Actions */}
            <div className="flex items-center gap-3 pt-4">
                {/* Quantity Selector */}
                <div className="flex items-center border border-border rounded-full">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:text-primary disabled:opacity-50"
                        disabled={quantity <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-bold w-8 text-center">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:text-primary"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-secondary text-primary border border-primary/20 hover:bg-primary/5 font-bold py-3 rounded-full transition-colors"
                >
                    Add to Cart
                </button>
                <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-3 rounded-full transition-colors shadow-lg shadow-accent/20"
                >
                    Buy Now
                </button>
            </div>

            {/* Warranty Badge */}
            {product.warranty && (
                <div className="text-center text-sm text-muted-foreground border-t border-border pt-4">
                    <ShieldCheck className="h-5 w-5 inline mr-2 text-accent" />
                    {product.warranty}
                </div>
            )}
        </div>
    );
}
