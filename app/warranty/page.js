import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function WarrantyPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="container py-12 flex-1">
                <h1 className="text-4xl font-bold text-primary mb-8 text-center">Warranty Policy</h1>
                <div className="max-w-3xl mx-auto prose prose-lg">
                    <p>Dizmo provides warranty coverage for eligible products purchased directly from us. Please review the terms below.</p>
                    <h3>Coverage</h3>
                    <p>Our warranty covers defects in materials and workmanship under normal use for a specific period from the date of retail purchase by the original end-user purchaser.</p>
                    <h3>Exclusions</h3>
                    <p>This warranty does not apply to:</p>
                    <ul>
                        <li>Damage caused by accident, abuse, misuse, flood, fire, earthquake, or other external causes.</li>
                        <li>Damage caused by operating the product outside the permitted or intended uses described by Dizmo.</li>
                        <li>Damage caused by service (including upgrades and expansions) performed by anyone who is not a representative of Dizmo.</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </main>
    );
}
