import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

export default async function ProductPage({ params, searchParams }) {
    const { id } = await params;
    const resolvedSearchParams = await searchParams; // Await searchParams in Next.js 15+ if needed, or just use it.
    // Note: In Next.js 13/14 searchParams is an object, in 15 it's a promise. 
    // Assuming 14 based on usage, but let's just destructure it from props if it's not async.
    // Actually, let's keep it simple.

    const categoryParam = resolvedSearchParams?.category;
    const data = await getProduct(id);

    if (!data || !data.success || !data.data) {
        return (
            <main className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <div className="container py-20 text-center">
                    <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                    <p className="text-muted-foreground">The product you are looking for does not exist or has been removed.</p>
                </div>
                <Footer />
            </main>
        );
    }

    const productData = data.data;

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
    const allProductImages = productData.images || [];
    const allImeiImages = imeis
        .map(i => i.image_path)
        .filter(Boolean)
        .filter((img, index, self) => self.indexOf(img) === index); // Remove duplicates

    const allImages = [...allProductImages, ...allImeiImages];

    // Map to ProductInfo expected structure
    const product = {
        id: productData.id,
        name: productData.name,
        price: productData.retails_price || 0, // Base price
        originalPrice: productData.retails_price, // Assuming retail is original
        stock: productData.status || "In Stock",
        warranty: productData.warranty || "Official Warranty", // API doesn't seem to have warranty field in example, using default
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
        carePlans: []
    };

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                <ProductDetailsClient product={product} />

                {/* Variants Grid - Only for Used Phones */}
                {((productData.category_name || productData.category?.name || categoryParam || "").toLowerCase().includes("used phone")) && (
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

            <Footer />
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
