import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductTabs from "@/components/ProductTabs";
import OfferTabs from "@/components/OfferTabs";

export default async function ProductPage({ params }) {
    const { id } = await params;

    // Enhanced product data with variants and specifications
    const product = {
        id: id,
        name: "iPhone 15 Pro Max",
        price: 145000,
        originalPrice: 160000,
        stock: "In Stock",
        warranty: "1 Year Apple Warranty",
        description: "The iPhone 15 Pro Max features a strong and lightweight titanium design with a textured matte-glass back. It also features a Ceramic Shield front that's tougher than any smartphone glass. And it's splash, water, and dust resistant.",
        images: [
            "/placeholder-1.jpg",
            "/placeholder-2.jpg",
            "/placeholder-3.jpg",
            "/placeholder-4.jpg",
        ],

        // Variant options
        variants: {
            storage: [
                { id: "256gb", label: "256GB", price: 145000 },
                { id: "512gb", label: "512GB", price: 175000 },
                { id: "1tb", label: "1TB", price: 220000 },
            ],
            colors: [
                { id: "titanium", label: "Natural Titanium", hex: "#8D8D93" },
                { id: "blue", label: "Blue Titanium", hex: "#3A5A7D" },
                { id: "white", label: "White Titanium", hex: "#E8E8E8" },
                { id: "black", label: "Black Titanium", hex: "#2C2C2E" },
            ],
            regions: [
                { id: "intl", label: "International", description: "Nano-SIM + eSIM" },
                { id: "usa", label: "USA", description: "eSIM only" },
                { id: "china", label: "China", description: "Dual Nano-SIM" },
            ],
        },

        // Care plans
        carePlans: [
            {
                id: "ultimate",
                name: "Dizmo Ultimate Care+ 1 year",
                price: 24650,
                description: "New replacement for hardware issues & free parts for accidental damage"
            },
            {
                id: "bundle",
                name: "DC+ & DSC+ Bundle",
                price: 14783,
                description: "1 year brand-new replacement + 730 days display replacement"
            },
            {
                id: "screen",
                name: "Dizmo Screen Care+",
                price: 9850,
                description: "730 days, One time display replacement (excluding physical damage)"
            },
            {
                id: "basic",
                name: "Dizmo Care+ Basic",
                price: 8205,
                description: "1 Year Brand New Replacement Guarantee"
            },
        ],

        // Detailed specifications
        specifications: {
            body: {
                title: "Body",
                specs: {
                    "Dimensions": "159.9 x 76.7 x 8.3 mm (6.30 x 3.02 x 0.33 in)",
                    "Weight": "221 g (7.80 oz)",
                    "Build": "Glass front (Ceramic Shield), titanium frame, textured matte glass back",
                    "SIM": "Nano-SIM and eSIM - International; Dual eSIM with multiple eSIM support - USA; Dual SIM (Nano-SIM, dual stand-by) - China",
                    "Features": "IP68 dust/water resistant (up to 6m for 30 min); Apple Pay (Visa, MasterCard, AMEX certified)",
                }
            },
            display: {
                title: "Display",
                specs: {
                    "Type": "LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision, 1000 nits (typ), 2000 nits (HBM)",
                    "Size": "6.7 inches, 110.2 cm² (~89.8% screen-to-body ratio)",
                    "Resolution": "1290 x 2796 pixels, 19.5:9 ratio (~460 ppi density)",
                    "Protection": "Ceramic Shield glass, Always-On display",
                }
            },
            platform: {
                title: "Platform",
                specs: {
                    "OS": "iOS 17, upgradable to iOS 18",
                    "Chipset": "Apple A17 Pro (3 nm)",
                    "CPU": "Hexa-core (2x3.78 GHz + 4x2.11 GHz)",
                    "GPU": "Apple GPU (6-core graphics)",
                }
            },
            camera: {
                title: "Main Camera",
                specs: {
                    "Triple": "48 MP, f/1.8, 24mm (wide), 1/1.28\", 1.22µm, dual pixel PDAF, sensor-shift OIS; 12 MP, f/2.8, 120mm (periscope telephoto), 1/3.06\", 1.12µm, dual pixel PDAF, 3D sensor-shift OIS, 5x optical zoom; 12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\", 1.4µm, dual pixel PDAF",
                    "Features": "Dual-LED dual-tone flash, HDR (photo/panorama)",
                    "Video": "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, 10‑bit HDR, Dolby Vision HDR (up to 60fps), ProRes, Cinematic mode (4K@30fps), stereo sound rec.",
                }
            },
            selfie: {
                title: "Selfie Camera",
                specs: {
                    "Single": "12 MP, f/1.9, 23mm (wide), 1/3.6\", PDAF; SL 3D, (depth/biometrics sensor)",
                    "Features": "HDR, Cinematic mode (4K@30fps)",
                    "Video": "4K@24/25/30/60fps, 1080p@25/30/60/120fps, gyro-EIS",
                }
            },
            sound: {
                title: "Sound",
                specs: {
                    "Loudspeaker": "Yes, with stereo speakers",
                    "3.5mm jack": "No",
                }
            },
            comms: {
                title: "Communications",
                specs: {
                    "WLAN": "Wi-Fi 802.11 a/b/g/n/ac/6e, dual-band, hotspot",
                    "Bluetooth": "5.3, A2DP, LE",
                    "Positioning": "GPS (L1+L5), GLONASS, GALILEO, BDS, QZSS",
                    "NFC": "Yes",
                    "Radio": "No",
                    "USB": "USB Type-C 3.0, DisplayPort",
                }
            },
            battery: {
                title: "Battery",
                specs: {
                    "Type": "Li-Ion 4441 mAh, non-removable",
                    "Charging": "Wired, PD2.0, 50% in 30 min (advertised); 15W wireless (MagSafe); 7.5W wireless (Qi); 4.5W reverse wired",
                    "Playback": "Up to 29 hours video playback",
                }
            },
            features: {
                title: "Features",
                specs: {
                    "Sensors": "Face ID, accelerometer, gyro, proximity, compass, barometer; Ultra Wideband 2 (UWB) support",
                    "Special": "Emergency SOS via satellite (SMS sending/receiving); Crash detection",
                }
            },
        },
    };

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="container py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left: Image Gallery */}
                    <ProductGallery images={product.images} />

                    {/* Right: Product Info & Actions */}
                    <ProductInfo product={product} />
                </div>

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
