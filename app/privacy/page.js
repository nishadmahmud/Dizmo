import React from 'react';

export const metadata = {
    title: 'Privacy Policy | Dizmo',
    description: 'Privacy Policy for Dizmo - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
    return (
        <div className="container py-12 md:py-16 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#103E34] border-b pb-4">Privacy Policy</h1>

            <div className="space-y-8 text-gray-700 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">1. Introduction</h2>
                    <p>
                        Welcome to Dizmo ("we," "our," or "us"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [dizmo.com] (the "Site") and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">2. Information We Collect</h2>
                    <p className="mb-3">
                        We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.
                        </li>
                        <li>
                            <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
                        </li>
                        <li>
                            <strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">3. Use of Your Information</h2>
                    <p className="mb-3">
                        Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Create and manage your account.</li>
                        <li>Process your orders and deliver the products and services you request.</li>
                        <li>Email you regarding your account or order.</li>
                        <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                        <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
                        <li>Increase the efficiency and operation of the Site.</li>
                        <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                        <li>Notify you of updates to the Site, products, and services.</li>
                        <li>Offer new products, services, and/or recommendations to you.</li>
                        <li>Perform other business activities as needed.</li>
                        <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">4. Disclosure of Your Information</h2>
                    <p className="mb-3">
                        We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                        </li>
                        <li>
                            <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                        </li>
                        <li>
                            <strong>Marketing Communications:</strong> With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">5. Security of Your Information</h2>
                    <p>
                        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">6. Policy for Children</h2>
                    <p>
                        We do not knowingly solicit information from or market to children under the age of 13. If you become aware that any data we have collected is from children under the age of 13, please contact us using the contact information provided below.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">7. Contact Us</h2>
                    <p>
                        If you have questions or comments about this Privacy Policy, please contact us at:
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
