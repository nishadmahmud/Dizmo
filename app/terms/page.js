import React from 'react';

export const metadata = {
    title: 'Terms & Conditions | Dizmo',
    description: 'Terms and Conditions for using Dizmo services and website.',
};

export default function TermsAndConditions() {
    return (
        <div className="container py-12 md:py-16 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#103E34] border-b pb-4">Terms & Conditions</h1>

            <div className="space-y-8 text-gray-700 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">1. Agreement to Terms</h2>
                    <p>
                        These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Dizmo ("we," "us" or "our"), concerning your access to and use of the [dizmo.com] website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site"). You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms and Conditions. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS AND CONDITIONS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">2. Intellectual Property Rights</h2>
                    <p>
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of Bangladesh, foreign jurisdictions, and international conventions. The Content and the Marks are provided on the Site "AS IS" for your information and personal use only. Except as expressly provided in these Terms and Conditions, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">3. User Representations</h2>
                    <p className="mb-3">
                        By using the Site, you represent and warrant that:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>All registration information you submit will be true, accurate, current, and complete.</li>
                        <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                        <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
                        <li>You are not a minor in the jurisdiction in which you reside.</li>
                        <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
                        <li>You will not use the Site for any illegal or unauthorized purpose.</li>
                        <li>Your use of the Site will not violate any applicable law or regulation.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">4. Products</h2>
                    <p>
                        We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products. All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">5. Purchases and Payment</h2>
                    <p>
                        We accept the following forms of payment: Visa, Mastercard, American Express, Mobile Banking (Bkash, Nagad, Rocket), and Cash on Delivery. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update your account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in Bangladeshi Taka (BDT).
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">6. Return and Refund Policy</h2>
                    <p>
                        Please review our Return Policy posted on the Site prior to making any purchases.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">7. Prohibited Activities</h2>
                    <p>
                        You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">8. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and defined following the laws of Bangladesh. Dizmo and yourself irrevocably consent that the courts of Bangladesh shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">9. Contact Us</h2>
                    <p>
                        In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                    </p>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="font-bold text-[#103E34]">Dizmo</p>
                        <p>Level: 4, Block: B, Shop:028A & 028B</p>
                        <p>Jamuna Future Park, Dhaka, Bangladesh</p>
                        <p>Email: dizmo.bd@gmail.com</p>
                        <p>Phone: 01751 05 32 52</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
