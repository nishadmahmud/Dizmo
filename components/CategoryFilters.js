"use client";

import { useState } from "react";
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

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
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
                {isMobile && (
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-secondary rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Price Range Filter */}
            <FilterSection title="PRICE RANGE" section="price">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            value={priceRange.min}
                            onChange={(e) => onPriceChange({ ...priceRange, min: Number(e.target.value) })}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Min"
                        />
                        <span className="text-muted-foreground">-</span>
                        <input
                            type="number"
                            value={priceRange.max}
                            onChange={(e) => onPriceChange({ ...priceRange, max: Number(e.target.value) })}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Max"
                        />
                    </div>

                    {/* Range Slider */}
                    <div className="px-2">
                        <input
                            type="range"
                            min="0"
                            max="200000"
                            step="1000"
                            value={priceRange.min}
                            onChange={(e) => onPriceChange({ ...priceRange, min: Number(e.target.value) })}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer range-slider"
                        />
                        <input
                            type="range"
                            min="0"
                            max="200000"
                            step="1000"
                            value={priceRange.max}
                            onChange={(e) => onPriceChange({ ...priceRange, max: Number(e.target.value) })}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer range-slider mt-2"
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

            {/* Clear Filters Button */}
            <button
                onClick={onClearFilters}
                className="w-full px-4 py-2.5 bg-secondary hover:bg-primary hover:text-white text-foreground font-semibold rounded-lg transition-colors"
            >
                Clear Filters
            </button>
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
