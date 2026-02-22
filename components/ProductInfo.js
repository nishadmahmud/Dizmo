"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, MapPin, CreditCard, Truck, Star, Share2, Plus, Minus, Check, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductInfo({ product, onColorChange, selectedColorProp, selectedCarePlans, onPriceChange }) {
    const [selectedStorage, setSelectedStorage] = useState(product.variants?.storage?.[0]?.id || null);
    const [selectedColor, setSelectedColor] = useState(selectedColorProp || product.variants?.colors?.[0]?.id || null);
    const [selectedRegion, setSelectedRegion] = useState(product.variants?.regions?.[0]?.id || null);
    const [selectedModel, setSelectedModel] = useState(product.variants?.models?.[0]?.id || null);
    // const [selectedCarePlans, setSelectedCarePlans] = useState([]); // Lifted up
    const [quantity, setQuantity] = useState(1);
    const [deliveryMethod, setDeliveryMethod] = useState("delivery");
    // const [emiModalOpen, setEmiModalOpen] = useState(false); // Moved to Extras
    const [paymentMode, setPaymentMode] = useState('cash');

    const { addToCart } = useCart();
    const router = useRouter();

    // Get available colors for the selected storage
    const getAvailableColors = () => {
        if (!selectedStorage || !product.imeis || product.imeis.length === 0) {
            return product.variants?.colors || [];
        }

        // Find all IMEIs that match the selected storage
        const matchingImeis = product.imeis.filter(i => i.storage === selectedStorage);

        // Get unique colors from those IMEIs
        const availableColorIds = [...new Set(matchingImeis.map(i => i.color).filter(Boolean))];

        // Filter the color variants to only include available ones
        return (product.variants?.colors || []).filter(c => availableColorIds.includes(c.id));
    };

    const availableColors = getAvailableColors();

    // Handle storage change and auto-select appropriate color
    const handleStorageChange = (storageId) => {
        setSelectedStorage(storageId);

        // Get colors available for this storage
        const colorsForStorage = product.imeis
            .filter(i => i.storage === storageId)
            .map(i => i.color)
            .filter(Boolean);

        // If current color is not available for this storage, select the first available one
        if (!colorsForStorage.includes(selectedColor)) {
            const firstAvailableColor = colorsForStorage[0] || null;
            setSelectedColor(firstAvailableColor);
            if (onColorChange && firstAvailableColor) onColorChange(firstAvailableColor);
        }
    };

    // Calculate current price based on selected variants
    const getCurrentPrice = () => {
        // If we have IMEIs (API data), calculate price based on exact combination
        if (product.imeis && product.imeis.length > 0) {
            const match = product.imeis.find(i =>
                (!selectedStorage || i.storage === selectedStorage) &&
                (!selectedColor || i.color === selectedColor) &&
                (!selectedRegion || i.region === selectedRegion) &&
                (!selectedModel || i.model === selectedModel)
            );

            if (match) return match.sale_price;

            // Fallback: find any match with at least storage (primary price driver)
            const storageMatch = product.imeis.find(i => i.storage === selectedStorage);
            if (storageMatch) return storageMatch.sale_price;

            // Final fallback
            return product.price;
        }

        // Legacy/Static data fallback
        if (!product.variants?.storage) return product.price;
        const storage = product.variants.storage.find(s => s.id === selectedStorage);
        return storage?.price || product.price;
    };

    // Calculate total with care plans (selectedCarePlans now contains full plan objects)
    const getTotalPrice = () => {
        let total = getCurrentPrice();
        selectedCarePlans.forEach(plan => {
            if (plan && plan.price) total += plan.price;
        });
        return total;
    };

    // Notify parent whenever the live price changes (variant selection changes)
    useEffect(() => {
        if (onPriceChange) {
            onPriceChange(getCurrentPrice());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStorage, selectedColor, selectedRegion, selectedModel]);

    // const toggleCarePlan = (planId) => {
    //     setSelectedCarePlans(prev =>
    //         prev.includes(planId)
    //             ? prev.filter(id => id !== planId)
    //             : [...prev, planId]
    //     );
    // };

    const handleAddToCart = () => {
        // Find the matching IMEI to get variant ID
        const matchingImei = product.imeis?.find(i =>
            (!selectedStorage || i.storage === selectedStorage) &&
            (!selectedColor || i.color === selectedColor) &&
            (!selectedRegion || i.region === selectedRegion) &&
            (!selectedModel || i.model === selectedModel)
        );

        // Add the main product
        const productWithVariants = {
            ...product,
            selectedVariants: {
                storage: product.variants?.storage?.find(s => s.id === selectedStorage)?.label,
                color: product.variants?.colors?.find(c => c.id === selectedColor)?.label,
                region: product.variants?.regions?.find(r => r.id === selectedRegion)?.label,
                model: product.variants?.models?.find(m => m.id === selectedModel)?.label,
            },
            variantId: matchingImei?.id || null, // IMEI ID as variant ID
            price: getCurrentPrice(), // Just the product price, not including care plans
            minBookingAmount: product.isPhone ? (getCurrentPrice() > 100000 ? 10000 : 5000) : 300,
            image: product.images?.[0] || product.image,
        };
        addToCart(productWithVariants, quantity);

        // Add each selected care plan as a separate cart item
        selectedCarePlans.forEach(plan => {
            if (plan && plan.id && plan.name && plan.price) {
                const carePlanItem = {
                    id: `care_${product.id}_${plan.id}`, // Unique ID for this care plan + product combo
                    name: `${plan.name} - ${product.name}`,
                    price: plan.price,
                    image: '/dizmo_care_icon.png', // Fallback image for care plans
                    isCarePlan: true,
                    parentProductId: product.id,
                    carePlanDetails: {
                        planName: plan.name,
                        planDescription: plan.description || '',
                    }
                };
                addToCart(carePlanItem, quantity);
            }
        });
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push("/checkout");
    };

    const currentPrice = getCurrentPrice();
    const totalPrice = getTotalPrice();

    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="bg-accent/10 text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                        {product.stock || "In Stock"}
                    </span>
                    <div className="flex gap-2 text-muted-foreground">
                        <button
                            onClick={handleShare}
                            className="hover:text-primary transition-colors p-2 rounded-full hover:bg-secondary"
                            title="Copy Link"
                        >
                            {copied ? <Check className="h-5 w-5 text-green-500" /> : <Share2 className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-primary">{product.name}</h1>
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
                {/* Discount Badge */}
                {product.discount > 0 && (
                    <div className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full mb-2">
                        {product.discountType === 'Fixed' ? `-${product.discount.toLocaleString()} Taka` : `-${product.discount}%`}
                    </div>
                )}
                <div className="flex items-baseline gap-3">
                    {product.discount > 0 ? (
                        <>
                            {/* Discounted Price */}
                            <span className="text-2xl font-bold text-primary">
                                ৳{(product.discountType === 'Fixed'
                                    ? totalPrice - product.discount
                                    : Math.round(totalPrice * (1 - product.discount / 100))
                                ).toLocaleString()}
                            </span>
                            {/* Original Price (strikethrough) */}
                            <span className="text-lg text-muted-foreground line-through">
                                ৳{totalPrice.toLocaleString()}
                            </span>
                        </>
                    ) : (
                        <span className="text-2xl font-bold text-primary">৳{totalPrice.toLocaleString()}</span>
                    )}
                </div>
                <p className="text-xs text-muted-foreground">Price includes VAT</p>
            </div>

            {/* Minimum Booking & Purchase Points */}
            {(() => {
                // Calculate Minimum Booking based on product type and price rules
                // Use currentPrice (base product price) to determine booking amount, not total with add-ons
                const price = currentPrice || product.price || 0;
                let minBooking = 300; // Default for non-phones

                if (product.isPhone) {
                    if (price > 100000) {
                        minBooking = 10000;
                    } else {
                        minBooking = 5000;
                    }
                }

                // Calculate Purchase Points: 1 point per 1000 BDT, minimum 10, rounded to nearest 10
                const pointsRaw = Math.max(price / 1000, 10);
                const purchasePoints = Math.round(pointsRaw / 10) * 10;

                return (
                    <div className="grid grid-cols-2 gap-4">
                        {/* Minimum Booking */}
                        <div className="bg-secondary/30 rounded-xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                                <CreditCard className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Minimum Booking</p>
                                <p className="text-lg font-bold text-foreground">{minBooking.toLocaleString()} BDT</p>
                            </div>
                        </div>

                        {/* Purchase Points */}
                        <div className="bg-secondary/30 rounded-xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                                <Gift className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Purchase Points</p>
                                <p className="text-lg font-bold text-foreground">{purchasePoints} Points</p>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Core Specifications */}
            {(() => {
                // Helper to find spec value by name (case-insensitive)
                const getSpec = (name) => {
                    if (Array.isArray(product.specifications)) {
                        return product.specifications.find(s => s.name.toLowerCase() === name.toLowerCase())?.description;
                    }
                    return product.specifications?.[name];
                };

                // Extract core specs
                const displaySize = getSpec('Display Size');
                const displayType = getSpec('Display Type');
                const displayRes = getSpec('Display Resolution');
                const screenDisplay = getSpec('Screen display');
                const display = [displaySize, displayType, displayRes].filter(Boolean).join(', ') || screenDisplay || getSpec('Display');

                const processor = getSpec('Chipset') || getSpec('Processor') || getSpec('CPU');

                const mainCamera = getSpec('Main Camera') || getSpec('Rear Camera');
                const selfieCamera = getSpec('Selfie Camera') || getSpec('Front Camera');
                const camera = [mainCamera ? `${mainCamera} main` : null, selfieCamera ? `${selfieCamera} selfie` : null].filter(Boolean).join(', ');

                const battery = getSpec('Battery Info') || getSpec('Battery') || getSpec('Battery capacity');
                const durability = getSpec('Durability');
                // const features = getSpec('Sensors') || getSpec('Features');

                // Check if we have any core specs to show
                const hasCoreSpecs = display || processor || camera || battery || durability;

                if (!hasCoreSpecs) return null;

                return (
                    <div className="bg-secondary/20 p-4 rounded-lg space-y-2 text-sm">
                        {display && (
                            <div className="flex gap-2">
                                <span className="font-bold min-w-[80px]">Display:</span>
                                <span className="text-muted-foreground">{display}</span>
                            </div>
                        )}
                        {processor && (
                            <div className="flex gap-2">
                                <span className="font-bold min-w-[80px]">Processor:</span>
                                <span className="text-muted-foreground">{processor}</span>
                            </div>
                        )}
                        {camera && (
                            <div className="flex gap-2">
                                <span className="font-bold min-w-[80px]">Camera:</span>
                                <span className="text-muted-foreground">{camera}</span>
                            </div>
                        )}
                        {battery && (
                            <div className="flex gap-2">
                                <span className="font-bold min-w-[80px]">Battery:</span>
                                <span className="text-muted-foreground">{battery}</span>
                            </div>
                        )}
                        {durability && (
                            <div className="flex gap-2">
                                <span className="font-bold min-w-[80px]">Durability:</span>
                                <span className="text-muted-foreground">{durability}</span>
                            </div>
                        )}
                    </div>
                );
            })()}

            {/* Storage Variant Selector */}
            {product.variants?.storage?.length > 0 && (
                <div className="md:space-y-3 bg-white md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none border md:border-0 border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-3 md:mb-0">Storage:</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.variants.storage.map((storage) => (
                            <button
                                key={storage.id}
                                onClick={() => handleStorageChange(storage.id)}
                                className={`px-4 py-2 rounded-full md:rounded-lg border text-sm font-medium transition-all ${selectedStorage === storage.id
                                    ? "border-primary bg-primary text-white"
                                    : "border-border hover:border-primary/50 bg-white md:bg-transparent"
                                    }`}
                            >
                                <span>{storage.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Color Variant Selector */}
            {product.variants?.colors?.length > 0 && (
                <div className="md:space-y-3 bg-white md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none border md:border-0 border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-3 md:mb-0">Color:</h3>
                    <div className="flex flex-wrap gap-2">
                        {availableColors.map((color) => {
                            // Check stock status for this specific color-storage combination
                            const colorStock = product.imeis?.find(i =>
                                i.storage === selectedStorage &&
                                i.color === color.id &&
                                i.in_stock > 0 &&
                                !i.defected
                            );
                            const isOutOfStock = !colorStock;

                            return (
                                <button
                                    key={color.id}
                                    onClick={() => {
                                        if (isOutOfStock) {
                                            alert("This color variant is currently out of stock.");
                                            return;
                                        }
                                        setSelectedColor(color.id);
                                        if (onColorChange) onColorChange(color.id);
                                    }}
                                    className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full md:rounded-lg border transition-all ${selectedColor === color.id
                                        ? "border-primary ring-2 ring-primary bg-primary/5"
                                        : "border-border hover:border-primary/50 bg-white md:bg-transparent"
                                        } ${isOutOfStock ? "opacity-50 grayscale cursor-not-allowed" : ""}`}
                                >
                                    <div
                                        className="w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-white shadow-sm"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    <span className="text-sm font-medium whitespace-nowrap">
                                        {color.label}
                                        {isOutOfStock && <span className="text-xs ml-1 text-red-500">(Out of Stock)</span>}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Region Variant Selector */}
            {product.variants?.regions?.length > 0 && (
                <div className="md:space-y-3 bg-white md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none border md:border-0 border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-3 md:mb-0">Region:</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.variants.regions.map((region) => (
                            <button
                                key={region.id}
                                onClick={() => setSelectedRegion(region.id)}
                                className={`px-3 py-1.5 md:px-3 md:py-2 rounded-full md:rounded-lg border text-sm transition-all ${selectedRegion === region.id
                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                    : "border-border hover:border-primary/50 bg-white md:bg-transparent"
                                    }`}
                            >
                                <span className="font-medium">{region.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Model Variant Selector */}
            {product.have_variant === 1 && product.variants?.models?.length > 0 && (
                <div className="md:space-y-3 bg-white md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none border md:border-0 border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-3 md:mb-0">Model:</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.variants.models.map((model) => (
                            <button
                                key={model.id}
                                onClick={() => setSelectedModel(model.id)}
                                className={`px-3 py-1.5 md:px-3 md:py-2 rounded-full md:rounded-lg border text-sm transition-all ${selectedModel === model.id
                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                    : "border-border hover:border-primary/50 bg-white md:bg-transparent"
                                    }`}
                            >
                                <span className="font-medium">{model.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Payment Mode Selection */}
            {product.discount > 0 && (
                <div className="space-y-3 mb-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-3">
                    {/* Offer Price Option */}
                    <div
                        onClick={() => setPaymentMode('cash')}
                        className={`relative border rounded-xl p-3 cursor-pointer transition-all h-full ${paymentMode === 'cash'
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-border hover:border-gray-300'
                            }`}
                    >
                        <div className="flex items-start gap-3 h-full">
                            <div className={`mt-1 w-5 h-5 min-w-[1.25rem] rounded-full border flex items-center justify-center ${paymentMode === 'cash' ? 'border-primary' : 'border-gray-300'
                                }`}>
                                {paymentMode === 'cash' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                                    <span className="font-bold text-foreground text-sm whitespace-nowrap">Offer Price</span>
                                    <span className="font-bold text-lg md:text-xl text-primary">
                                        ৳{(product.discountType === 'Fixed'
                                            ? totalPrice - product.discount
                                            : Math.round(totalPrice * (1 - product.discount / 100))
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-[11px] md:text-xs text-muted-foreground mt-0.5 line-clamp-1">Cash/Card/MFS Payment</p>
                            </div>
                        </div>
                    </div>

                    {/* Regular Price Option */}
                    <div
                        onClick={() => setPaymentMode('emi')}
                        className={`relative border rounded-xl p-3 cursor-pointer transition-all h-full ${paymentMode === 'emi'
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-border hover:border-gray-300'
                            }`}
                    >
                        <div className="flex items-start gap-3 h-full">
                            <div className={`mt-1 w-5 h-5 min-w-[1.25rem] rounded-full border flex items-center justify-center ${paymentMode === 'emi' ? 'border-primary' : 'border-gray-300'
                                }`}>
                                {paymentMode === 'emi' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                                    <span className="font-bold text-foreground text-sm whitespace-nowrap">Regular Price</span>
                                    <span className="font-bold text-lg md:text-xl text-primary">৳{totalPrice.toLocaleString()}</span>
                                </div>
                                <p className="text-[11px] md:text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                    EMI from {Math.round(totalPrice / 36).toLocaleString()} BDT/mo
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Estimated Delivery */}
            <div className="text-sm font-medium mb-1 pl-1">
                Estimated delivery: <span className="underline">{
                    (product.name || '').toLowerCase().includes('adapter') ||
                        (product.name || '').toLowerCase().includes('adaptar') ||
                        (product.name || '').toLowerCase().includes('cable')
                        ? '0-2 days'
                        : '0-3 days'
                }</span>
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
                    disabled={product.stock?.toLowerCase().includes("out")}
                    className={`flex-1 font-bold py-3 rounded-full transition-colors ${product.stock?.toLowerCase().includes("out")
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200"
                        : "bg-secondary text-primary border border-primary/20 hover:bg-primary/5"
                        }`}
                >
                    Add to Cart
                </button>
                <button
                    onClick={handleBuyNow}
                    disabled={product.stock?.toLowerCase().includes("out")}
                    className={`flex-1 font-bold py-3 rounded-full transition-colors shadow-lg ${product.stock?.toLowerCase().includes("out")
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                        : "bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent/20"
                        }`}
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
