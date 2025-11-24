"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";

export default function CategoryFilters({
    priceRange,
    onPriceChange,
    availability,
    onAvailabilityChange,
    selectedColors,
    onColorChange,
    availableColors,
    onClearFilters,
    isMobile = false,
    onClose
}) {
    const [expandedSections, setExpandedSections] = useState({
        price: true,
        availability: true,
        color: true
    });

    // Local state for price range
    const [localPrice, setLocalPrice] = useState(priceRange);
    const sliderTrackRef = useRef(null);
    const [activeThumb, setActiveThumb] = useState(null); // 'min' or 'max' or null
    const localPriceRef = useRef(localPrice);

    // Sync local state with prop when prop changes
    useEffect(() => {
        setLocalPrice(priceRange);
    }, [priceRange]);

    // Keep ref in sync for event handlers
    useEffect(() => {
        localPriceRef.current = localPrice;
    }, [localPrice]);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handlePriceCommit = () => {
        onPriceChange(localPriceRef.current);
    };

    const handleMinChange = (e) => {
        const value = Number(e.target.value);
        setLocalPrice(prev => ({ ...prev, min: value }));
    };

    const handleMaxChange = (e) => {
        const value = Number(e.target.value);
        setLocalPrice(prev => ({ ...prev, max: value }));
    };

    // Custom Slider Logic
    useEffect(() => {
        if (activeThumb) {
            document.body.style.userSelect = 'none';
            document.body.style.webkitUserSelect = 'none';
        } else {
            document.body.style.userSelect = '';
            document.body.style.webkitUserSelect = '';
        }

        if (!activeThumb) return;

        const handleMove = (clientX) => {
            if (!sliderTrackRef.current) return;
            const rect = sliderTrackRef.current.getBoundingClientRect();
            const percentage = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
            const value = Math.round(percentage * 200000); // Max price is 200000

            setLocalPrice(prev => {
                if (activeThumb === 'min') {
                    // Ensure min doesn't cross max (with 100 buffer)
                    const newValue = Math.min(value, prev.max - 100);
                    return { ...prev, min: newValue };
                } else {
                    // Ensure max doesn't cross min (with 100 buffer)
                    const newValue = Math.max(value, prev.min + 100);
                    return { ...prev, max: newValue };
                }
            });
        };

        const handleMouseMove = (e) => handleMove(e.clientX);
        const handleTouchMove = (e) => handleMove(e.touches[0].clientX);

        const handleUp = () => {
            setActiveThumb(null);
            handlePriceCommit();
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleUp);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleUp);
        };
    }, [activeThumb]); // Dependencies: only activeThumb to attach/detach. handlePriceCommit uses ref.


    const FilterSection = ({ title, section, children }) => (
        <div className="border-b border-border pb-4">
            <button
                onClick={() => toggleSection(section)}
                className="w-full flex items-center justify-between py-2 text-left font-semibold text-foreground hover:text-primary transition-colors"
            >
                <span>{title}</span>
                {expandedSections[section] ? (
                    <ChevronUp className="h-4 w-4" />
                ) : (
                    <ChevronDown className="h-4 w-4" />
                )}
            </button>
            {expandedSections[section] && (
                <div className="mt-3 space-y-3">
                    {children}
                </div>
            )}
        </div>
    );

    const filterContent = (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">Filters</h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onClearFilters}
                        className="px-3 py-1.5 text-xs font-medium bg-secondary hover:bg-primary hover:text-white text-foreground rounded-lg transition-colors"
                    >
                        Reset
                    </button>
                    {isMobile && (
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-secondary rounded-full transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Price Range Filter */}
            <FilterSection title="PRICE RANGE" section="price">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            value={localPrice.min}
                            onChange={handleMinChange}
                            onBlur={() => onPriceChange(localPrice)}
                            onKeyDown={(e) => e.key === 'Enter' && onPriceChange(localPrice)}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Min"
                        />
                        <span className="text-muted-foreground">-</span>
                        <input
                            type="number"
                            value={localPrice.max}
                            onChange={handleMaxChange}
                            onBlur={() => onPriceChange(localPrice)}
                            onKeyDown={(e) => e.key === 'Enter' && onPriceChange(localPrice)}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Max"
                        />
                    </div>

                    {/* Custom Dual Range Slider */}
                    <div
                        className="relative h-6 mb-4 select-none touch-none cursor-pointer"
                        ref={sliderTrackRef}
                        onMouseDown={(e) => {
                            e.preventDefault(); // Prevent text selection
                            // Allow clicking on track to jump to position
                            if (e.target === sliderTrackRef.current || e.target.classList.contains('bg-secondary') || e.target.classList.contains('bg-primary')) {
                                const rect = sliderTrackRef.current.getBoundingClientRect();
                                const percentage = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
                                const value = Math.round(percentage * 200000);

                                // Determine which thumb is closer
                                const distMin = Math.abs(value - localPrice.min);
                                const distMax = Math.abs(value - localPrice.max);

                                if (distMin < distMax) {
                                    setLocalPrice(prev => ({ ...prev, min: Math.min(value, prev.max - 100) }));
                                    setActiveThumb('min');
                                } else {
                                    setLocalPrice(prev => ({ ...prev, max: Math.max(value, prev.min + 100) }));
                                    setActiveThumb('max');
                                }
                            }
                        }}
                    >
                        {/* Track Background */}
                        <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-secondary rounded-full -translate-y-1/2"></div>

                        {/* Active Track Range */}
                        <div
                            className="absolute top-1/2 h-1.5 bg-primary rounded-full -translate-y-1/2 pointer-events-none"
                            style={{
                                left: `${(localPrice.min / 200000) * 100}%`,
                                right: `${100 - (localPrice.max / 200000) * 100}%`
                            }}
                        ></div>

                        {/* Min Thumb */}
                        <div
                            className={`absolute top-1/2 w-4 h-4 bg-primary rounded-full -translate-y-1/2 -translate-x-1/2 cursor-grab shadow-md hover:scale-110 transition-transform z-20 ${activeThumb === 'min' ? 'cursor-grabbing scale-110' : ''}`}
                            style={{ left: `${(localPrice.min / 200000) * 100}%` }}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setActiveThumb('min');
                            }}
                            onTouchStart={(e) => {
                                e.stopPropagation();
                                setActiveThumb('min');
                            }}
                        ></div>

                        {/* Max Thumb */}
                        <div
                            className={`absolute top-1/2 w-4 h-4 bg-primary rounded-full -translate-y-1/2 -translate-x-1/2 cursor-grab shadow-md hover:scale-110 transition-transform z-20 ${activeThumb === 'max' ? 'cursor-grabbing scale-110' : ''}`}
                            style={{ left: `${(localPrice.max / 200000) * 100}%` }}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setActiveThumb('max');
                            }}
                            onTouchStart={(e) => {
                                e.stopPropagation();
                                setActiveThumb('max');
                            }}
                        ></div>
                    </div>
                </div>
            </FilterSection>

            {/* Availability Filter */}
            <FilterSection title="AVAILABILITY" section="availability">
                <div className="space-y-2">
                    {['all', 'in-stock', 'pre-order'].map((option) => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="radio"
                                name="availability"
                                value={option}
                                checked={availability === option}
                                onChange={(e) => onAvailabilityChange(e.target.value)}
                                className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                            />
                            <span className="text-sm text-foreground group-hover:text-primary transition-colors capitalize">
                                {option === 'all' ? 'All Products' : option === 'in-stock' ? 'In Stock' : 'Pre-Order'}
                            </span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Color Filter */}
            {availableColors.length > 0 && (
                <FilterSection title="COLOR" section="color">
                    <div className="flex flex-wrap gap-2">
                        {availableColors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => onColorChange(color.name)}
                                className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${selectedColors.includes(color.name)
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:border-primary/50'
                                    }`}
                                title={color.name}
                            >
                                <div
                                    className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                                    style={{ backgroundColor: color.code }}
                                />
                                <span className="text-xs font-medium">{color.name}</span>
                            </button>
                        ))}
                    </div>
                </FilterSection>
            )}


        </div>
    );

    // Mobile: Render as modal
    if (isMobile) {
        return (
            <>
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
                <div className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-background z-50 overflow-y-auto p-6 shadow-xl">
                    {filterContent}
                </div>
            </>
        );
    }

    // Desktop: Render as sidebar
    return (
        <div className="sticky top-32 bg-card border border-border rounded-xl p-6 shadow-sm">
            {filterContent}
        </div>
    );
}
