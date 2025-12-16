"use client";

import { useState } from "react";
import { ShieldCheck, MapPin, CreditCard, Truck, Star, Share2, Plus, Minus, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductInfo({ product, onColorChange, selectedColorProp, selectedCarePlans }) {
    const [selectedStorage, setSelectedStorage] = useState(product.variants?.storage?.[0]?.id || null);
    const [selectedColor, setSelectedColor] = useState(selectedColorProp || product.variants?.colors?.[0]?.id || null);
    const [selectedRegion, setSelectedRegion] = useState(product.variants?.regions?.[0]?.id || null);
    // const [selectedCarePlans, setSelectedCarePlans] = useState([]); // Lifted up
    const [quantity, setQuantity] = useState(1);
    const [deliveryMethod, setDeliveryMethod] = useState("delivery");
    // const [emiModalOpen, setEmiModalOpen] = useState(false); // Moved to Extras

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
                (!selectedRegion || i.region === selectedRegion)
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

    // const toggleCarePlan = (planId) => {
    //     setSelectedCarePlans(prev =>
    //         prev.includes(planId)
    //             ? prev.filter(id => id !== planId)
    //             : [...prev, planId]
    //     );
    // };

    const handleAddToCart = () => {
        // Add the main product
        const productWithVariants = {
            ...product,
            selectedVariants: {
                storage: product.variants?.storage?.find(s => s.id === selectedStorage)?.label,
                color: product.variants?.colors?.find(c => c.id === selectedColor)?.label,
                region: product.variants?.regions?.find(r => r.id === selectedRegion)?.label,
            },
            price: getCurrentPrice(), // Just the product price, not including care plans
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

            {/* Core Specifications */}
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
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">Storage</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.variants.storage.map((storage) => (
                            <button
                                key={storage.id}
                                onClick={() => handleStorageChange(storage.id)}
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
            {product.variants?.colors?.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">Color</h3>
                    <div className="flex flex-wrap gap-3">
                        {availableColors.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => {
                                    setSelectedColor(color.id);
                                    if (onColorChange) onColorChange(color.id);
                                }}
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
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Region Variant Selector */}
            {product.variants?.regions?.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">Region</h3>
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
