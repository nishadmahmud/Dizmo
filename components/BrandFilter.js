"use client";

export default function BrandFilter({ brands, selectedBrand, onBrandChange }) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {/* All Brands Button */}
                <button
                    onClick={() => onBrandChange(null)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all border-2 ${selectedBrand === null
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-white text-foreground border-border hover:border-primary hover:text-primary'
                        }`}
                >
                    All
                </button>

                {/* Brand Pills */}
                {brands.map((brand) => (
                    <button
                        key={brand.id}
                        onClick={() => onBrandChange(brand.id)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all border-2 whitespace-nowrap ${selectedBrand === brand.id
                                ? 'bg-primary text-white border-primary shadow-md'
                                : 'bg-white text-foreground border-border hover:border-primary hover:text-primary'
                            }`}
                    >
                        {brand.name}
                    </button>
                ))}
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
