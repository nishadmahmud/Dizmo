import React from 'react';

export const metadata = {
    title: 'Shipping Policy | Dizmo',
    description: 'Shipping Policy for Dizmo - Delivery timelines, costs, and tracking information.',
};

export default function ShippingPolicy() {
    return (
        <div className="container py-12 md:py-16 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#103E34] border-b pb-4">Shipping Policy</h1>

            <div className="space-y-8 text-gray-700 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">1. Delivery Areas</h2>
                    <p>
                        Dizmo delivers products all across Bangladesh. Whether you are in Dhaka or a remote district, we strive to reach you. We use reputable courier services to ensure your order is delivered safely and on time.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">2. Delivery Timelines</h2>
                    <p className="mb-3">
                        Our standard delivery timelines are as follows:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Inside Dhaka Metro:</strong> 24 - 48 Hours (1-2 Days)</li>
                        <li><strong>Outside Dhaka:</strong> 48 - 96 Hours (2-4 Days)</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">
                        *Note: Delivery times may vary due to unforeseen circumstances such as political unrest, natural disasters, or holidays.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">3. Shipping Costs</h2>
                    <p className="mb-3">
                        Shipping charges are calculated based on your location and the weight of the package.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Inside Dhaka:</strong> BDT 60 - BDT 100 (depending on area)</li>
                        <li><strong>Outside Dhaka:</strong> BDT 100 - BDT 150 (depending on courier and weight)</li>
                    </ul>
                    <p className="mt-2">
                        We may offer <strong>Free Shipping</strong> on select products or order values during promotional campaigns.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">4. Order Tracking</h2>
                    <p>
                        Once your order is dispatched, you will receive a confirmation email or SMS containing a tracking number (if provided by the courier). You can also track your order status directly on our website by visiting the <a href="/track-order" className="text-[#FCB042] hover:underline font-bold">Track Order</a> page.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">5. Cash on Delivery (COD)</h2>
                    <p>
                        We offer Cash on Delivery (COD) for most locations. However, for orders outside Dhaka, we may request a partial advance payment (e.g., delivery charge) to confirm the order and prevent fraudulent returns.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#103E34] mb-3">6. Damaged or Missing Items</h2>
                    <p>
                        If you receive a package that is visibly damaged, please do not accept it from the courier. If you open the package and find damaged or missing items, please contact our customer support immediately (within 24 hours) at <strong>01751 05 32 52</strong> or email us at <strong>dizmo.bd@gmail.com</strong>.
                    </p>
                </section>
            </div>
        </div>
    );
}
