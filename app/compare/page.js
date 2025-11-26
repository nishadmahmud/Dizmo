import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompareClient from "@/components/CompareClient";

export default function ComparePage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <CompareClient />
            <Footer />
        </main>
    );
}
