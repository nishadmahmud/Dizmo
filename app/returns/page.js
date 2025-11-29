import React from 'react';

export const metadata = {
    title: 'Return Policy | Dizmo',
    description: 'Return Policy for Dizmo - Learn about our return window, eligibility, and refund process.',
};

export default function ReturnPolicy() {
    return (
        <div className="container py-12 md:py-16 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#103E34] border-b pb-4">Return Policy</h1>

            <div className="space-y-8 text-gray-700 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">1. Return Window</h2>
                    <p>
                        We want you to be completely satisfied with your purchase. If you are not happy with your product, you may return it within <strong>3 days</strong> of receiving your order, provided it meets our return eligibility criteria.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">2. Eligibility for Returns</h2>
                    <p className="mb-3">
                        To be eligible for a return, your item must be:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Unused and in the same condition that you received it.</li>
                        <li>In the original packaging with all seals, tags, and accessories intact.</li>
                        <li>Accompanied by the original receipt or proof of purchase.</li>
                    </ul>
                    <p className="mt-2 text-red-600 font-medium">
                        Note: Products that have been used, activated, or damaged by the customer are not eligible for return.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">3. Valid Reasons for Return</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>You received a defective or damaged product.</li>
                        <li>You received the wrong product (different from what was ordered).</li>
                        <li>The product does not match the description on the website.</li>
                        <li>Parts or accessories are missing.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">4. Non-Returnable Items</h2>
                    <p className="mb-3">
                        Certain items cannot be returned, including:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Software or digital products once accessed/activated.</li>
                        <li>Personal hygiene products (e.g., headphones, earbuds) if the seal is broken.</li>
                        <li>Clearance or sale items marked as "Non-Returnable".</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">5. Refund Process</h2>
                    <p className="mb-3">
                        Once your return is received and inspected, we will notify you of the approval or rejection of your refund.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Approved:</strong> If approved, your refund will be processed. A credit will automatically be applied to your credit card or original method of payment within 7-10 business days.</li>
                        <li><strong>Rejected:</strong> If the item does not meet our return criteria, it will be sent back to you at your expense.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">6. Exchanges</h2>
                    <p>
                        We only replace items if they are defective or damaged. If you need to exchange it for the same item, please contact our support team.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">7. Shipping Costs for Returns</h2>
                    <p>
                        You will be responsible for paying for your own shipping costs for returning your item, unless the return is due to our error (e.g., wrong or defective item). Shipping costs are non-refundable.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">8. Contact Us</h2>
                    <p>
                        To initiate a return, please contact us at:
                    </p>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="font-bold text-[#103E34]">Dizmo Returns</p>
                        <p>Email: dizmo.bd@gmail.com</p>
                        <p>Phone: 01751 05 32 52</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
