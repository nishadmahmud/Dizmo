"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFullyLoaded, setIsFullyLoaded] = useState(false);
    const productsCache = useRef({});
    const hasFetched = useRef(false);

    // Helper to process raw product data
    const processProducts = (productData, categoryId) => {
        return productData
            .map((product) => {
                // Get the lowest price from imeis if available
                let lowestPrice = parseFloat(product.retails_price);
                if (product.imeis && product.imeis.length > 0) {
                    const prices = product.imeis.map(imei => parseFloat(imei.sale_price));
                    lowestPrice = Math.min(...prices);
                }

                return {
                    id: product.id,
                    name: product.name,
                    price: lowestPrice,
                    originalPrice: parseFloat(product.retails_price),
                    discount: parseFloat(product.discount) || 0,
                    category: categoryId,
                    inStock: product.status === "In stock",
                    image: product.image_path,
                    brand: product.brand_name,
                    stock: product.current_stock,
                    rating: parseFloat(product.review_summary?.average_rating) || 0,
                    reviews: product.review_summary?.total_reviews || 0,
                    slug: product.slug || product.id // Fallback to ID if slug missing
                };
            })
            .filter(product => product.price >= 100); // Filter out invalid prices
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchAllProducts = async () => {
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;
                const categoriesEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORIES;
                const productsEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORY_PRODUCTS;
                const allProductsEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_PRODUCTS;

                // 1. Fetch Categories
                const categoriesResponse = await fetch(`${apiBaseUrl}${categoriesEndpoint}/${storeId}`);
                if (!categoriesResponse.ok) throw new Error("Failed to fetch categories");

                const categoriesData = await categoriesResponse.json();
                if (!categoriesData.success || !categoriesData.data) return;

                const categoryIds = categoriesData.data.map(cat => cat.category_id.toString());

                if (categoryIds.length === 0) {
                    setLoading(false);
                    setIsFullyLoaded(true);
                    return;
                }

                // 2. Fetch First Category Immediately with Pagination (for fast initial load)
                const firstCategoryId = categoryIds[0];
                try {
                    let allFirstCategoryProducts = [];
                    let page = 1;
                    const limit = 20;

                    // Fetch all pages for first category
                    while (true) {
                        const url = `${apiBaseUrl}${productsEndpoint}/${firstCategoryId}?page=${page}&limit=${limit}`;
                        const firstRes = await fetch(url);
                        if (!firstRes.ok) break;

                        const firstData = await firstRes.json();
                        if (!firstData.success || !firstData.data || firstData.data.length === 0) break;

                        allFirstCategoryProducts.push(...firstData.data);

                        // If we got fewer items than limit, we've reached the end
                        if (firstData.data.length < limit) break;

                        page++;
                    }

                    if (allFirstCategoryProducts.length > 0) {
                        const processed = processProducts(allFirstCategoryProducts, firstCategoryId);
                        setProducts(prev => [...prev, ...processed]);
                    }
                } catch (err) {
                    console.error(`Error fetching first category ${firstCategoryId}:`, err);
                } finally {
                    setLoading(false); // Search is usable after first batch
                }

                // 3. Fetch Remaining Categories in Background with Pagination
                const remainingIds = categoryIds.slice(1);

                // Helper function to fetch all pages for a category
                const fetchCategoryWithPagination = async (catId) => {
                    let allProducts = [];
                    let page = 1;
                    const limit = 20;

                    while (true) {
                        try {
                            const url = `${apiBaseUrl}${productsEndpoint}/${catId}?page=${page}&limit=${limit}`;
                            const res = await fetch(url);
                            if (!res.ok) break;

                            const data = await res.json();
                            if (!data.success || !data.data || data.data.length === 0) break;

                            allProducts.push(...data.data);

                            // If we got fewer items than limit, we've reached the end
                            if (data.data.length < limit) break;

                            page++;
                        } catch (e) {
                            console.error(`Error fetching category ${catId} page ${page}:`, e);
                            break;
                        }
                    }

                    return allProducts;
                };

                // Fetch in chunks of 3 to avoid overwhelming the network/browser
                const chunkSize = 3;
                for (let i = 0; i < remainingIds.length; i += chunkSize) {
                    const chunk = remainingIds.slice(i, i + chunkSize);

                    const chunkPromises = chunk.map(async (catId) => {
                        try {
                            const productsData = await fetchCategoryWithPagination(catId);
                            if (productsData.length > 0) {
                                return processProducts(productsData, catId);
                            }
                            return [];
                        } catch (e) {
                            console.error(`Error fetching category ${catId}:`, e);
                            return [];
                        }
                    });

                    const chunkResults = await Promise.all(chunkPromises);
                    const newProducts = chunkResults.flat();

                    if (newProducts.length > 0) {
                        setProducts(prev => {
                            // Filter duplicates just in case
                            const existingIds = new Set(prev.map(p => p.id));
                            const uniqueNew = newProducts.filter(p => !existingIds.has(p.id));
                            return [...prev, ...uniqueNew];
                        });
                    }
                }

                // 4. Fetch from Products Endpoint for Enhanced Brand Data (Optional)
                // Only fetch if the endpoint is configured
                if (allProductsEndpoint) {
                    try {
                        console.log('Fetching from products endpoint for enhanced brand data...');
                        const productsRes = await fetch(`${apiBaseUrl}${allProductsEndpoint}/${storeId}`);

                        if (productsRes.ok) {
                            const productsData = await productsRes.json();

                            if (productsData.success && productsData.data) {
                                // Process products endpoint data (has product.brands object)
                                const enhancedProducts = productsData.data.map(product => {
                                    // Get the lowest price from imeis if available
                                    let lowestPrice = parseFloat(product.retails_price);
                                    if (product.imeis && product.imeis.length > 0) {
                                        const prices = product.imeis.map(imei => parseFloat(imei.sale_price));
                                        lowestPrice = Math.min(...prices);
                                    }

                                    return {
                                        id: product.id,
                                        name: product.name,
                                        price: lowestPrice,
                                        originalPrice: parseFloat(product.retails_price),
                                        discount: parseFloat(product.discount) || 0,
                                        category: product.category_id,
                                        inStock: product.status === "In stock",
                                        image: product.image_path,
                                        brand: product.brands?.name || product.brand_name, // Use brands object if available
                                        brandId: product.brands?.id, // Store brand ID for filtering
                                        stock: product.current_stock,
                                        rating: parseFloat(product.review_summary?.average_rating) || 0,
                                        reviews: product.review_summary?.total_reviews || 0,
                                        slug: product.slug || product.id
                                    };
                                }).filter(product => product.price >= 100);

                                // Merge with existing products, preferring enhanced data
                                setProducts(prev => {
                                    const productMap = new Map(prev.map(p => [p.id, p]));

                                    // Update existing products with enhanced brand data
                                    enhancedProducts.forEach(enhanced => {
                                        if (productMap.has(enhanced.id)) {
                                            // Merge, preferring enhanced brand data
                                            const existing = productMap.get(enhanced.id);
                                            productMap.set(enhanced.id, {
                                                ...existing,
                                                brand: enhanced.brand || existing.brand,
                                                brandId: enhanced.brandId || existing.brandId
                                            });
                                        } else {
                                            // Add new product
                                            productMap.set(enhanced.id, enhanced);
                                        }
                                    });

                                    return Array.from(productMap.values());
                                });

                                console.log('Enhanced brand data loaded from products endpoint');
                            }
                        }
                    } catch (error) {
                        console.warn('Products endpoint not available or failed:', error.message);
                        // Continue even if products endpoint fails - category data is sufficient
                    }
                } else {
                    console.log('Products endpoint not configured, skipping enhanced brand data fetch');
                }

                // 5. Fetch from Offer Endpoints (New Arrivals, Best Deals, Best Sellers)
                const offerEndpoints = [
                    { name: 'New Arrivals', endpoint: process.env.NEXT_PUBLIC_ENDPOINT_NEW_ARRIVALS },
                    { name: 'Best Deals', endpoint: process.env.NEXT_PUBLIC_ENDPOINT_BEST_DEALS },
                    { name: 'Best Sellers', endpoint: process.env.NEXT_PUBLIC_ENDPOINT_BEST_SELLERS }
                ];

                for (const { name, endpoint } of offerEndpoints) {
                    if (!endpoint) {
                        console.log(`${name} endpoint not configured, skipping`);
                        continue;
                    }

                    try {
                        console.log(`Fetching from ${name} endpoint...`);
                        const offerRes = await fetch(`${apiBaseUrl}${endpoint}/${storeId}`);

                        if (offerRes.ok) {
                            const offerData = await offerRes.json();

                            if (offerData.success && offerData.data) {
                                // Handle different response structures (array or nested data.data)
                                const productsData = Array.isArray(offerData.data)
                                    ? offerData.data
                                    : (offerData.data?.data || []);

                                const offerProducts = productsData.map(item => {
                                    // Get the lowest price from imeis if available
                                    let lowestPrice = parseFloat(item.discounted_price || item.retails_price);
                                    if (item.imeis && item.imeis.length > 0) {
                                        const prices = item.imeis.map(imei => parseFloat(imei.sale_price));
                                        lowestPrice = Math.min(...prices);
                                    }

                                    return {
                                        id: item.id,
                                        name: item.name,
                                        price: lowestPrice,
                                        originalPrice: parseFloat(item.retails_price),
                                        discount: parseFloat(item.discount || item.discount_rate) || 0,
                                        category: item.category_id,
                                        inStock: item.status === "In stock",
                                        image: item.image_path,
                                        brand: item.brands?.name || item.brand_name,
                                        brandId: item.brands?.id,
                                        stock: item.current_stock,
                                        rating: parseFloat(item.review_summary?.average_rating) || 0,
                                        reviews: item.review_summary?.total_reviews || 0,
                                        slug: item.slug || item.id
                                    };
                                }).filter(product => product.price >= 100);

                                // Merge with existing products
                                setProducts(prev => {
                                    const productMap = new Map(prev.map(p => [p.id, p]));

                                    offerProducts.forEach(offer => {
                                        if (!productMap.has(offer.id)) {
                                            // Add new product only if not already present
                                            productMap.set(offer.id, offer);
                                        }
                                        // If product exists, keep the existing one (category data is more complete)
                                    });

                                    return Array.from(productMap.values());
                                });

                                console.log(`${name} products loaded: ${offerProducts.length} items`);
                            }
                        }
                    } catch (error) {
                        console.warn(`${name} endpoint failed:`, error.message);
                        // Continue with next endpoint
                    }
                }

                setIsFullyLoaded(true);

            } catch (error) {
                console.error("Error in global product fetch:", error);
                setLoading(false);
                setIsFullyLoaded(true);
            }
        };

        fetchAllProducts();
    }, []);

    // Search function
    const searchProducts = (query) => {
        if (!query || query.trim() === "") return [];
        const lowerQuery = query.toLowerCase().trim();

        return products.filter(product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.brand?.toLowerCase().includes(lowerQuery)
        );
    };

    return (
        <ProductContext.Provider value={{ products, loading, isFullyLoaded, searchProducts }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    return useContext(ProductContext);
}
