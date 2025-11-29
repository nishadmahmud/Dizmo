import React from 'react';

export const metadata = {
    title: 'EMI Policy | Dizmo',
    description: 'EMI Policy for Dizmo - Learn about Equated Monthly Installment options, eligible banks, and terms.',
};

export default function EMIPolicy() {
    return (
        <div className="container py-12 md:py-16 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#103E34] border-b pb-4">EMI Policy</h1>

            <div className="space-y-8 text-gray-700 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">1. What is EMI?</h2>
                    <p>
                        EMI (Equated Monthly Installment) is a payment option that allows you to pay for your purchase in easy monthly installments using your credit card. Dizmo offers EMI facilities for eligible products and banks to make your shopping experience more affordable and convenient.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">2. Eligibility Criteria</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>EMI is available only for purchases made with eligible credit cards issued by our partner banks.</li>
                        <li>The minimum order value to avail EMI is BDT 5,000 (or as specified by the bank).</li>
                        <li>Debit cards and prepaid cards are generally not eligible for EMI unless explicitly stated.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">3. Partner Banks</h2>
                    <p className="mb-3">
                        We support EMI from a wide range of leading banks in Bangladesh, including but not limited to:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-medium text-gray-600">
                        <div className="p-3 bg-gray-50 rounded border border-gray-200">City Bank (Amex/Visa)</div>
                        <div className="p-3 bg-gray-50 rounded border border-gray-200">Eastern Bank Ltd (EBL)</div>
                        <div className="p-3 bg-gray-50 rounded border border-gray-200">BRAC Bank</div>
                        <div className="p-3 bg-gray-50 rounded border border-gray-200">Standard Chartered</div>
                        <div className="p-3 bg-gray-50 rounded border border-gray-200">Dutch-Bangla Bank (DBBL)</div>
                        <div className="p-3 bg-gray-50 rounded border border-gray-200">Mutual Trust Bank (MTB)</div>
                        <div className="p-3 bg-gray-50 rounded border border-gray-200">Prime Bank</div>
                        <div className="p-3 bg-gray-50 rounded border border-gray-200">Dhaka Bank</div>
                        <div className="p-3 bg-gray-50 rounded border border-gray-200">Premier Bank</div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">4. EMI Tenure and Interest</h2>
                    <p className="mb-3">
                        You can choose from various tenure options depending on your bank and the offer available:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>3 Months:</strong> 0% Interest (on select products/banks)</li>
                        <li><strong>6 Months:</strong> 0% Interest (on select products/banks)</li>
                        <li><strong>9 Months:</strong> Low interest rate applies</li>
                        <li><strong>12 Months:</strong> Low interest rate applies</li>
                        <li><strong>18 - 36 Months:</strong> Standard bank interest rates apply</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500 italic">
                        *Note: 0% EMI is subject to specific promotional offers and may not be available for all products or banks at all times.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">5. Processing Fees</h2>
                    <p>
                        Some banks may charge a nominal processing fee or convenience fee for EMI transactions. This fee is charged directly by the bank and will appear on your credit card statement. Dizmo does not charge any additional fee for EMI unless specified.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">6. Cancellation and Refunds</h2>
                    <p>
                        If you cancel an order placed with EMI, the refund will be processed to your credit card. However, the bank may still charge the EMI processing fee or interest for the period the amount was blocked. The reversal of the EMI plan is at the sole discretion of the issuing bank.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">7. How to Avail EMI</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Select your desired product and proceed to checkout.</li>
                        <li>Choose "Online Payment" or "SSLCommerz" as your payment method.</li>
                        <li>On the payment gateway page, select the "EMI" tab.</li>
                        <li>Choose your bank and desired tenure.</li>
                        <li>Enter your credit card details and complete the transaction.</li>
                    </ol>
                </section>
            </div>
        </div>
    );
}
