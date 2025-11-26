import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EMIPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="container py-12 flex-1">
                <h1 className="text-4xl font-bold text-primary mb-8 text-center">EMI Policy</h1>
                <div className="max-w-3xl mx-auto prose prose-lg">
                    <p>Dizmo offers Easy Monthly Installment (EMI) plans for eligible purchases. This allows you to pay for your products over a period of time.</p>
                    <h3>Eligibility</h3>
                    <p>EMI plans are available for orders above a certain value. You must have a credit card from one of our partner banks to avail of this facility.</p>
                    <h3>Tenure Options</h3>
                    <p>We offer EMI tenures of 3, 6, 9, and 12 months. The interest rate (if any) depends on the bank and the tenure selected.</p>
                    <h3>Processing</h3>
                    <p>EMI transactions are processed by our payment gateway partner. Please ensure your card has sufficient limit for the full purchase amount.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
