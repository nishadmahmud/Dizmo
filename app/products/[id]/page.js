import ProductDetailsClient from "@/components/ProductDetailsClient";
import ProductVariantsGrid from "@/components/ProductVariantsGrid";
import ProductTabs from "@/components/ProductTabs";
import OfferTabs from "@/components/OfferTabs";

async function getProduct(id) {
    try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_PRODUCT_DETAIL;
        const url = `${apiBaseUrl}${endpoint}/${id}`;
        console.log("Fetching Product URL:", url);
        console.log("Product ID:", id);

        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Failed to fetch product');
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

// Fetch categories to look up category name by ID
async function getCategories() {
    try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const categoriesEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORIES;
        const storeId = process.env.NEXT_PUBLIC_STORE_ID;

        const res = await fetch(`${apiBaseUrl}${categoriesEndpoint}/${storeId}`, { cache: 'no-store' });

        if (!res.ok) {
            return [];
        }

        const data = await res.json();
        return data.success && data.data ? data.data : [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export default async function ProductPage({ params, searchParams }) {
    const { id } = await params;
    const resolvedSearchParams = await searchParams;

    const categoryParam = resolvedSearchParams?.category;

    // Fetch product and categories in parallel
    const [data, categories] = await Promise.all([
        getProduct(id),
        getCategories()
    ]);

    if (!data || !data.success || !data.data) {
        return (
            <main className="min-h-screen flex flex-col bg-background">
                <div className="container py-20 text-center">
                    <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                    <p className="text-muted-foreground">The product you are looking for does not exist or has been removed.</p>
                </div>
            </main>
        );
    }

    const productData = data.data;

    // Phone brands list for category detection
    const phoneBrands = [
        'apple', 'samsung', 'xiaomi', 'oneplus', 'google', 'oppo', 'vivo',
        'realme', 'tecno', 'infinix', 'motorola', 'nokia', 'huawei', 'honor',
        'asus', 'sony', 'nothing', 'iqoo', 'redmi', 'poco'
    ];

    // Look up category name from category_id
    let categoryName = categoryParam || "";
    if (productData.category_id && categories.length > 0) {
        const foundCategory = categories.find(cat => cat.category_id === productData.category_id || cat.category_id?.toString() === productData.category_id?.toString());
        if (foundCategory) {
            categoryName = foundCategory.name;
        }
    }
    // Fallback to API-provided category_name if available
    if (!categoryName && productData.category_name) {
        categoryName = productData.category_name;
    }
    if (!categoryName && productData.category?.name) {
        categoryName = productData.category.name;
    }

    // Brand-based detection as final fallback (since API doesn't return category_id)
    if (!categoryName && productData.brand_name) {
        const brandLower = productData.brand_name.toLowerCase();
        if (phoneBrands.includes(brandLower)) {
            categoryName = "Phones";
        }
    }

    // Also check product name for phone keywords as last resort
    if (!categoryName && productData.name) {
        const nameLower = productData.name.toLowerCase();
        if (nameLower.includes('iphone') || nameLower.includes('galaxy') ||
            nameLower.includes('pixel') || nameLower.includes('redmi') ||
            nameLower.includes('oneplus') || nameLower.includes('poco')) {
            categoryName = "Phones";
        }
    }

    console.log("Final categoryName:", categoryName);

    // Process variants from IMEIs
    const imeis = productData.imeis || [];

    // Extract unique options with their color codes
    const uniqueStorage = [...new Set(imeis.map(i => i.storage).filter(Boolean))];

    // For colors, we need to map color name to color_code from the first occurrence
    const colorMap = new Map();
    imeis.forEach(imei => {
        if (imei.color && !colorMap.has(imei.color)) {
            colorMap.set(imei.color, imei.color_code || null);
        }
    });
    const uniqueColors = Array.from(colorMap.keys());

    const uniqueRegions = [...new Set(imeis.map(i => i.region).filter(Boolean))];

    // Organize IMEI images by color
    const imeiImagesByColor = {};
    imeis.forEach(imei => {
        if (imei.color && imei.image_path) {
            if (!imeiImagesByColor[imei.color]) {
                imeiImagesByColor[imei.color] = [];
            }
            imeiImagesByColor[imei.color].push(imei.image_path);
        }
    });

    // Combine product images and all IMEI images
    // Combine product images and all IMEI images
    let allProductImages = [];
    if (Array.isArray(productData.images)) {
        allProductImages = productData.images;
    } else if (typeof productData.images === 'object' && productData.images !== null) {
        allProductImages = Object.values(productData.images);
    }
    const allImeiImages = imeis
        .map(i => i.image_path)
        .filter(Boolean)
        .filter((img, index, self) => self.indexOf(img) === index); // Remove duplicates

    const allImages = [...allProductImages, ...allImeiImages];

    // Map to ProductInfo expected structure
    const product = {
        id: productData.id,
        name: productData.name,
        price: productData.selling_price || productData.retails_price || 0, // Discounted/selling price
        originalPrice: productData.retails_price || 0, // Original retail price
        discount: productData.discount || 0, // Discount value
        discountType: productData.discount_type || 'Percentage', // 'Fixed' or 'Percentage'
        stock: productData.status || "In Stock",
        warranty: productData.warranty || "Official Warranty",
        description: productData.description || productData.short_description || "No description available.",
        images: allImages.length > 0 ? allImages : productData.images || [],
        brand: productData.brand_name,

        // Pass raw IMEIs for advanced logic if needed
        imeis: imeis,

        // IMEI images organized by color for dynamic gallery filtering
        imeiImagesByColor: imeiImagesByColor,

        // Mapped variants
        variants: {
            storage: uniqueStorage.map(s => {
                // Find min price for this storage
                const relevantImeis = imeis.filter(i => i.storage === s);
                const minPrice = Math.min(...relevantImeis.map(i => i.sale_price));
                return {
                    id: s,
                    label: s + (s.includes('GB') || s.includes('TB') ? '' : 'GB'), // Append GB if missing and looks like storage
                    price: minPrice
                };
            }),
            colors: uniqueColors.map(c => {
                const apiColorCode = colorMap.get(c);
                return {
                    id: c,
                    label: c,
                    hex: apiColorCode || getColorHex(c) // Use API color_code if available, fallback to helper
                };
            }),
            regions: uniqueRegions.map(r => ({
                id: r,
                label: r,
                description: getRegionDescription(r)
            }))
        },

        // Specifications (API specifications array)
        specifications: productData.specifications || {},

        // Care plans (API doesn't have this, using empty or static)
        carePlans: [],

        // Category for conditional rendering (resolved from category_id lookup)
        category: categoryName
    };

    return (
        <main className="min-h-screen flex flex-col bg-background">

            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                <ProductDetailsClient product={product} />

                {/* Variants Grid - Only for Used Phones */}
                {categoryName.toLowerCase().includes("used phone") && (
                    <div className="mt-12">
                        <ProductVariantsGrid imeis={product.imeis} product={product} />
                    </div>
                )}

                {/* Specification Tabs */}
                <ProductTabs product={product} />

                {/* Related Products */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-primary mb-6">You Might Also Like</h3>
                    <OfferTabs />
                </div>
            </div>

        </main>
    );
}

// Helper to guess color hex
function getColorHex(colorName) {
    const colors = {
        "Black": "#000000",
        "White": "#FFFFFF",
        "Desert Titanium": "#C5B097",
        "Natural Titanium": "#8D8D93",
        "Blue Titanium": "#3A5A7D",
        "White Titanium": "#E8E8E8",
        "Black Titanium": "#2C2C2E",
        "Blue": "#0000FF",
        "Red": "#FF0000",
        "Green": "#008000",
        "Gold": "#FFD700",
        "Silver": "#C0C0C0",
        "Space Grey": "#4B4B4B",
        "Purple": "#800080",
        "Pink": "#FFC0CB",
        "Yellow": "#FFFF00"
    };
    return colors[colorName] || "#CCCCCC";
}

// Helper for region description
function getRegionDescription(region) {
    const descriptions = {
        "INTL": "International Version",
        "USA": "USA Version (eSIM)",
        "HK": "Hong Kong Version (Dual Nano SIM)",
        "SG": "Singapore Version",
        "UAE": "UAE Version",
        "AUS": "Australia Version",
        "JP": "Japan Version",
        "KR": "Korea Version",
        "EU": "Europe Version",
        "UK": "UK Version",
        "IN": "India Version",
        "VN": "Vietnam Version",
        "TH": "Thailand Version",
        "CN": "China Version",
        "SG/UAE": "Singapore / UAE Version"
    };
    return descriptions[region] || "Standard Version";
}
