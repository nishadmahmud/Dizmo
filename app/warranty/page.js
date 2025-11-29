import React from 'react';

export const metadata = {
    title: 'Warranty Policy | Dizmo',
    description: 'Warranty Policy for Dizmo products - Learn about coverage, exclusions, and claim process.',
};

export default function WarrantyPolicy() {
    return (
        <div className="container py-12 md:py-16 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#103E34] border-b pb-4">Warranty Policy</h1>

            <div className="space-y-8 text-gray-700 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">1. General Warranty Terms</h2>
                    <p>
                        At Dizmo, we are committed to providing high-quality products. Most of our products come with a manufacturer's warranty that covers defects in materials and workmanship under normal use. The warranty period varies by product and brand, as specified on the product page or the warranty card included with your purchase.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">2. Warranty Coverage</h2>
                    <p className="mb-3">
                        The warranty typically covers:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Manufacturing defects in hardware.</li>
                        <li>Malfunctions occurring during normal use within the warranty period.</li>
                        <li>Labor and parts for repairs covered under warranty.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">3. Warranty Exclusions</h2>
                    <p className="mb-3">
                        The warranty does NOT cover:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Accidental damage (drops, spills, cracks).</li>
                        <li>Water damage or liquid ingress (unless the product is explicitly rated for such conditions and used within limits).</li>
                        <li>Cosmetic damage (scratches, dents).</li>
                        <li>Damage caused by unauthorized repairs or modifications.</li>
                        <li>Damage resulting from misuse, abuse, or improper maintenance.</li>
                        <li>Normal wear and tear (e.g., battery degradation over time).</li>
                        <li>Software issues, including viruses or operating system failures caused by third-party software.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">4. How to Claim Warranty</h2>
                    <p className="mb-3">
                        To claim warranty service, please follow these steps:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Contact Support:</strong> Reach out to our customer support team via phone or email with your order number and a description of the issue.</li>
                        <li><strong>Verification:</strong> Our team will troubleshoot the issue and verify warranty eligibility.</li>
                        <li><strong>Return/Visit:</strong> You may be asked to bring the product to our service center or ship it to us. Please ensure the product is securely packaged.</li>
                        <li><strong>Repair/Replacement:</strong> If the defect is covered, we will repair or replace the product at our discretion.</li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">5. Service Center Locations</h2>
                    <p>
                        You can visit our authorized service center at:
                    </p>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="font-bold text-[#103E34]">Dizmo Service Center</p>
                        <p>Level: 4, Block: B, Shop:028A & 028B</p>
                        <p>Jamuna Future Park, Dhaka, Bangladesh</p>
                        <p>Phone: 01751 05 32 52</p>
                        <p>Hours: 11:00 AM - 8:00 PM (Closed on Tuesdays)</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">6. International Warranty</h2>
                    <p>
                        For products with international warranty, you may be able to claim warranty service directly from the manufacturer's authorized service centers in other countries. Please refer to the specific warranty terms provided with your product.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">7. Disclaimer</h2>
                    <p>
                        Dizmo is not responsible for any data loss during the repair process. We strongly recommend backing up your data before submitting any device for service.
                    </p>
                </section>
            </div>
        </div>
    );
}
