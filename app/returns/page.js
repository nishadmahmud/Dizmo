import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ReturnsPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="container py-12 flex-1">
                <h1 className="text-4xl font-bold text-primary mb-8 text-center">Return Policy</h1>
                <div className="max-w-3xl mx-auto prose prose-lg">
                    <p>If you are not entirely satisfied with your purchase, we're here to help.</p>
                    <h3>Returns</h3>
                    <p>You have 7 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging.</p>
                    <h3>Refunds</h3>
                    <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your credit card (or original method of payment).</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
