"use client";

import { useState } from "react";
import { GitCompare, Plus, X, Search, Check, Trash2 } from "lucide-react";
import { useProduct } from "@/context/ProductContext";
import Link from "next/link";

export default function CompareClient() {
    const { searchProducts } = useProduct();
    const [selectedProducts, setSelectedProducts] = useState([null, null, null]);
    const [showSearch, setShowSearch] = useState(false);
    const [activeSlot, setActiveSlot] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleAddClick = (index) => {
        setActiveSlot(index);
        setSearchQuery("");
        setSearchResults([]);
        setShowSearch(true);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 0) {
            const results = searchProducts(query);
            setSearchResults(results.slice(0, 5));
        } else {
            setSearchResults([]);
        }
    };

    const fetchProductDetails = async (id) => {
        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_PRODUCT_DETAIL;
            const res = await fetch(`${apiBaseUrl}${endpoint}/${id}`);
            const data = await res.json();
            if (data.success && data.data) {
                return data.data;
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
        return null;
    };

    const handleSelectProduct = async (product) => {
        // Fetch full details to get specifications
        const fullProduct = await fetchProductDetails(product.id);

        const newSelected = [...selectedProducts];

        if (fullProduct) {
            // Map the fetched data to match our expected structure
            let price = parseFloat(fullProduct.retails_price);
            if (fullProduct.imeis && fullProduct.imeis.length > 0) {
                const prices = fullProduct.imeis.map(imei => parseFloat(imei.sale_price));
                price = Math.min(...prices);
            }

            // Handle images - try image_paths array, then images array, then single image
            let image = product.image; // Fallback to search result image
            if (fullProduct.image_paths && fullProduct.image_paths.length > 0) {
                image = fullProduct.image_paths[0];
            } else if (fullProduct.images && fullProduct.images.length > 0) {
                image = fullProduct.images[0];
            }

            newSelected[activeSlot] = {
                ...fullProduct,
                name: fullProduct.name,
                brand: fullProduct.brand_name,
                price: price,
                image: image,
                rating: parseFloat(fullProduct.review_summary?.average_rating) || 0,
                reviews: fullProduct.review_summary?.total_reviews || 0,
                stock: fullProduct.status || "In Stock",
                inStock: fullProduct.status === "In Stock" || (fullProduct.current_stock > 0),
                specifications: fullProduct.specifications || []
            };
        } else {
            // Fallback to basic info if fetch fails
            newSelected[activeSlot] = product;
        }

        setSelectedProducts(newSelected);
        setShowSearch(false);
    };

    const handleRemoveProduct = (index) => {
        const newSelected = [...selectedProducts];
        newSelected[index] = null;
        setSelectedProducts(newSelected);
    };

    // Helper to get all unique specification keys from selected products
    const getAllSpecKeys = () => {
        const keys = new Set();
        selectedProducts.forEach(p => {
            if (p && p.specifications) {
                if (Array.isArray(p.specifications)) {
                    p.specifications.forEach(spec => keys.add(spec.name));
                } else {
                    Object.values(p.specifications).forEach(category => {
                        if (category.specs) {
                            Object.keys(category.specs).forEach(k => keys.add(k));
                        }
                    });
                }
            }
        });
        return Array.from(keys);
    };

    const getSpecValue = (product, key) => {
        if (!product || !product.specifications) return "-";

        if (Array.isArray(product.specifications)) {
            const spec = product.specifications.find(s => s.name === key);
            return spec ? spec.description : "-";
        } else {
            // Object format
            for (const category of Object.values(product.specifications)) {
                if (category.specs && category.specs[key]) {
                    return category.specs[key];
                }
            }
        }
        return "-";
    };

    const specKeys = getAllSpecKeys();
    const hasProducts = selectedProducts.some(p => p !== null);

    return (
        <div className="container py-12">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                    <GitCompare className="h-5 w-5" />
                    <span className="font-bold">Compare Products</span>
                </div>
                <h1 className="text-4xl font-bold text-primary mb-4">Product Comparison</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Compare specifications, prices, and features of your favorite gadgets side by side.
                </p>
            </div>

            {/* Product Selection Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                {selectedProducts.map((product, index) => (
                    <div key={index} className={`relative ${index === 2 ? 'hidden md:block' : ''}`}>
                        {product ? (
                            <div className="border border-border rounded-xl p-3 md:p-6 flex flex-col items-center text-center h-full bg-card shadow-sm">
                                <button
                                    onClick={() => handleRemoveProduct(index)}
                                    className="absolute top-2 right-2 md:top-4 md:right-4 p-1.5 md:p-2 hover:bg-red-50 text-muted-foreground hover:text-red-500 rounded-full transition-colors"
                                >
                                    <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                                </button>
                                <div className="h-24 md:h-48 w-full mb-2 md:mb-6 flex items-center justify-center">
                                    <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                                </div>
                                <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2 line-clamp-2 leading-tight">{product.name}</h3>
                                <p className="text-primary font-bold text-sm md:text-xl mb-2 md:mb-4">৳{product.price.toLocaleString()}</p>
                                <Link
                                    href={`/products/${product.id}`}
                                    className="px-3 py-1.5 md:px-6 md:py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-xs md:text-sm font-medium w-full md:w-auto"
                                >
                                    View
                                </Link>
                            </div>
                        ) : (
                            <div
                                onClick={() => handleAddClick(index)}
                                className="border-2 border-dashed border-border rounded-xl p-4 md:p-12 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer h-full min-h-[180px] md:min-h-[300px]"
                            >
                                <div className="bg-secondary rounded-full p-3 md:p-6 mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                                    <Plus className="h-6 w-6 md:h-12 md:w-12 text-muted-foreground" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-1 md:mb-2 text-sm md:text-base">Add Product</h3>
                                <p className="text-xs md:text-sm text-muted-foreground hidden md:block">
                                    Click to select a product
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Comparison Table */}
            {hasProducts && (
                <div className="overflow-x-auto border border-border rounded-xl bg-card shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/50">
                                <th className="p-4 border-b border-border font-bold text-muted-foreground w-1/3 md:w-1/4">Feature</th>
                                {selectedProducts.map((product, index) => (
                                    <th key={index} className={`p-4 border-b border-border font-bold w-1/3 md:w-1/4 ${index === 2 ? 'hidden md:table-cell' : ''}`}>
                                        {product ? product.name : `Product ${index + 1}`}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">


                            {/* Dynamic Specifications */}
                            {specKeys.length > 0 && (
                                <>
                                    <tr className="bg-secondary/20">
                                        <td colSpan={4} className="p-4 font-bold text-primary">Specifications</td>
                                    </tr>
                                    {specKeys.map((key) => (
                                        <tr key={key}>
                                            <td className="p-4 font-medium text-muted-foreground">{key}</td>
                                            {selectedProducts.map((p, i) => (
                                                <td key={i} className={`p-4 text-sm ${i === 2 ? 'hidden md:table-cell' : ''}`}>{getSpecValue(p, key)}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Search Modal */}
            {showSearch && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm" onClick={() => setShowSearch(false)}>
                    <div className="bg-background w-full max-w-xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                        <div className="p-4 border-b border-border flex items-center gap-3">
                            <Search className="h-5 w-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="flex-1 bg-transparent outline-none text-lg"
                                autoFocus
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <button onClick={() => setShowSearch(false)} className="p-2 hover:bg-secondary rounded-full">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {searchResults.length > 0 ? (
                                <div className="space-y-1">
                                    {searchResults.map(product => (
                                        <button
                                            key={product.id}
                                            onClick={() => handleSelectProduct(product)}
                                            className="w-full flex items-center gap-4 p-3 hover:bg-secondary rounded-lg transition-colors text-left group"
                                        >
                                            <div className="h-12 w-12 bg-white rounded-md border border-border flex items-center justify-center overflow-hidden">
                                                <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium group-hover:text-primary transition-colors">{product.name}</h4>
                                                <p className="text-sm text-muted-foreground">৳{product.price.toLocaleString()}</p>
                                            </div>
                                            <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center text-muted-foreground">
                                    {searchQuery ? "No products found" : "Type to search..."}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
