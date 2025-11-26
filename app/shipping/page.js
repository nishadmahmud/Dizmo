import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShippingPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="container py-12 flex-1">
                <h1 className="text-4xl font-bold text-primary mb-8 text-center">Shipping Policy</h1>
                <div className="max-w-3xl mx-auto prose prose-lg">
                    <p>We are committed to delivering your order accurately, in good condition, and always on time.</p>
                    <h3>Delivery Areas</h3>
                    <p>We currently ship to addresses within Bangladesh. Please ensure your area is serviceable before placing an order.</p>
                    <h3>Delivery Time</h3>
                    <p>Standard delivery time is 2-5 business days. However, this may vary depending on your location and product availability.</p>
                    <h3>Shipping Charges</h3>
                    <p>Shipping charges are calculated based on the weight of your order and your location. The final shipping cost will be displayed at checkout.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
