import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="container py-12 flex-1">
                <h1 className="text-4xl font-bold text-primary mb-8 text-center">Privacy Policy</h1>
                <div className="max-w-3xl mx-auto prose prose-lg">
                    <p>At Dizmo, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
                    <h3>Information We Collect</h3>
                    <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                    <ul>
                        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
                        <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                    </ul>
                    <h3>Use of Your Information</h3>
                    <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. We may use information collected about you via the Site to:</p>
                    <ul>
                        <li>Create and manage your account.</li>
                        <li>Process your orders and deliver products.</li>
                        <li>Email you regarding your account or order.</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </main>
    );
}
