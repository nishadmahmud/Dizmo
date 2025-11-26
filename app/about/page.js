import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="container py-12 flex-1">
                <h1 className="text-4xl font-bold text-primary mb-8 text-center">About Us</h1>
                <div className="max-w-3xl mx-auto prose prose-lg">
                    <p>
                        Welcome to Dizmo, your number one source for all things tech. We're dedicated to providing you the very best of electronics, with an emphasis on quality, customer service, and uniqueness.
                    </p>
                    <p>
                        Founded in 2024, Dizmo has come a long way from its beginnings. When we first started out, our passion for eco-friendly and affordable gadgets drove us to start our own business.
                    </p>
                    <p>
                        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
