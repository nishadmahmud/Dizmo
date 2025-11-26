import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="container py-12 flex-1">
                <h1 className="text-4xl font-bold text-primary mb-8 text-center">Terms & Conditions</h1>
                <div className="max-w-3xl mx-auto prose prose-lg">
                    <p>Welcome to Dizmo. These terms and conditions outline the rules and regulations for the use of Dizmo's Website.</p>
                    <h3>1. Introduction</h3>
                    <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Dizmo if you do not agree to take all of the terms and conditions stated on this page.</p>
                    <h3>2. License</h3>
                    <p>Unless otherwise stated, Dizmo and/or its licensors own the intellectual property rights for all material on Dizmo. All intellectual property rights are reserved.</p>
                    <h3>3. User Comments</h3>
                    <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Dizmo does not filter, edit, publish or review Comments prior to their presence on the website.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
