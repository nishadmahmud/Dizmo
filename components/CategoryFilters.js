"use client";

import { useState, useEffect } from "react";
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

    // Local state for price range to ensure smooth dragging
    const [localPrice, setLocalPrice] = useState(priceRange);

    // Sync local state with prop when prop changes (e.g. clear filters)
    useEffect(() => {
        setLocalPrice(priceRange);
    }, [priceRange]);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handlePriceCommit = () => {
        onPriceChange(localPrice);
    };

    const handleMinChange = (e) => {
        const value = Number(e.target.value);
        setLocalPrice(prev => ({ ...prev, min: value }));
    };

    const handleMaxChange = (e) => {
        const value = Number(e.target.value);
        setLocalPrice(prev => ({ ...prev, max: value }));
    };

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
                            onBlur={handlePriceCommit}
                            onKeyDown={(e) => e.key === 'Enter' && handlePriceCommit()}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Min"
                        />
                        <span className="text-muted-foreground">-</span>
                        <input
                            type="number"
                            value={localPrice.max}
                            onChange={handleMaxChange}
                            onBlur={handlePriceCommit}
                            onKeyDown={(e) => e.key === 'Enter' && handlePriceCommit()}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Max"
                        />
                    </div>

                    {/* Dual Range Slider */}
                    <div className="relative h-6 mb-4">
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

                        {/* Min Slider */}
                        <input
                            type="range"
                            min="0"
                            max="200000"
                            step="100"
                            value={localPrice.min}
                            onChange={(e) => {
                                const val = Math.min(Number(e.target.value), localPrice.max - 100);
                                setLocalPrice(prev => ({ ...prev, min: val }));
                            }}
                            onMouseUp={handlePriceCommit}
                            onTouchEnd={handlePriceCommit}
                            className="absolute top-1/2 left-0 w-full -translate-y-1/2 appearance-none bg-transparent pointer-events-none
                                [&::-webkit-slider-thumb]:appearance-none
                                [&::-webkit-slider-thumb]:w-4
                                [&::-webkit-slider-thumb]:h-4
                                [&::-webkit-slider-thumb]:rounded-full
                                [&::-webkit-slider-thumb]:bg-primary
                                [&::-webkit-slider-thumb]:cursor-grab
                                [&::-webkit-slider-thumb]:pointer-events-auto
                                [&::-webkit-slider-thumb]:shadow-md
                                [&::-webkit-slider-thumb]:hover:scale-110
                                [&::-webkit-slider-thumb]:transition-transform
                                [&::-webkit-slider-thumb]:relative
                                [&::-webkit-slider-thumb]:z-20
                                [&::-moz-range-thumb]:w-4
                                [&::-moz-range-thumb]:h-4
                                [&::-moz-range-thumb]:rounded-full
                                [&::-moz-range-thumb]:bg-primary
                                [&::-moz-range-thumb]:border-0
                                [&::-moz-range-thumb]:cursor-grab
                                [&::-moz-range-thumb]:pointer-events-auto
                                [&::-moz-range-thumb]:shadow-md
                                [&::-moz-range-thumb]:hover:scale-110
                                [&::-moz-range-thumb]:transition-transform
                                [&::-moz-range-thumb]:relative
                                [&::-moz-range-thumb]:z-20"
                            style={{ zIndex: localPrice.min > 100000 ? 20 : 10 }}
                        />

                        {/* Max Slider */}
                        <input
                            type="range"
                            min="0"
                            max="200000"
                            step="100"
                            value={localPrice.max}
                            onChange={(e) => {
                                const val = Math.max(Number(e.target.value), localPrice.min + 100);
                                setLocalPrice(prev => ({ ...prev, max: val }));
                            }}
                            onMouseUp={handlePriceCommit}
                            onTouchEnd={handlePriceCommit}
                            className="absolute top-1/2 left-0 w-full -translate-y-1/2 appearance-none bg-transparent pointer-events-none
                                [&::-webkit-slider-thumb]:appearance-none
                                [&::-webkit-slider-thumb]:w-4
                                [&::-webkit-slider-thumb]:h-4
                                [&::-webkit-slider-thumb]:rounded-full
                                [&::-webkit-slider-thumb]:bg-primary
                                [&::-webkit-slider-thumb]:cursor-grab
                                [&::-webkit-slider-thumb]:pointer-events-auto
                                [&::-webkit-slider-thumb]:shadow-md
                                [&::-webkit-slider-thumb]:hover:scale-110
                                [&::-webkit-slider-thumb]:transition-transform
                                [&::-webkit-slider-thumb]:relative
                                [&::-webkit-slider-thumb]:z-20
                                [&::-moz-range-thumb]:w-4
                                [&::-moz-range-thumb]:h-4
                                [&::-moz-range-thumb]:rounded-full
                                [&::-moz-range-thumb]:bg-primary
                                [&::-moz-range-thumb]:border-0
                                [&::-moz-range-thumb]:cursor-grab
                                [&::-moz-range-thumb]:pointer-events-auto
                                [&::-moz-range-thumb]:shadow-md
                                [&::-moz-range-thumb]:hover:scale-110
                                [&::-moz-range-thumb]:transition-transform
                                [&::-moz-range-thumb]:relative
                                [&::-moz-range-thumb]:z-20"
                            style={{ zIndex: localPrice.max < 100000 ? 20 : 10 }}
                        />
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
