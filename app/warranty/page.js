import React from 'react';

export const metadata = {
    title: 'Warranty Policy & Terms | DIZMO',
    description: 'DIZMO Warranty Policy & Terms and Conditions - Comprehensive coverage details for all products including DIZMO Care+, Parts Warranty, and Extended Warranty plans.',
};

export default function WarrantyPolicy() {
    return (
        <div className="container py-12 md:py-16 max-w-5xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#103E34] border-b-2 border-[#FCB042] pb-4">
                DIZMO Warranty Policy & Terms and Conditions
            </h1>

            <div className="space-y-8 text-gray-700 leading-relaxed">
                {/* Introduction */}
                <section className="bg-gradient-to-r from-[#103E34]/5 to-[#FCB042]/5 p-6 rounded-lg border-l-4 border-[#103E34]">
                    <p className="text-base">
                        DIZMO is committed to providing customers with top-notch service and reliable product support. This warranty policy outlines the coverage, terms, and conditions for all warranty and service plans offered by DIZMO.
                    </p>
                    <p className="mt-4 font-semibold text-[#103E34]">
                        DIZMO all products have 15 days instant replacement guarantee for any hardware issues & Up to 24 months Service warranty (No Parts).
                    </p>
                </section>

                {/* 1. Parts Warranty */}
                <section className="border-l-4 border-[#FCB042] pl-6">
                    <h2 className="text-2xl font-bold text-[#103E34] mb-4">1. Parts Warranty</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Eligibility</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Available for all smartphones and gadgets purchased from DIZMO.</li>
                                <li>Can be added at the time of purchase by paying 4.75% to 7.99% of the product price (Depending on model).</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Coverage</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Internal and external parts replacement (excluding fire, water, and physical damage).</li>
                                <li>Display issues, battery problems, motherboard, and camera failures.</li>
                                <li>Full repair or replacement of parts during the warranty period.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Exclusions</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Fire, water, camera red/pink dot or accidental/physical damage.</li>
                                <li>Unauthorised software modifications or repairs.</li>
                                <li>Accessories (charger, cable, earphones, etc.).</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Service Process</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Customers must present the original box with the product at a DIZMO service center.</li>
                                <li>Repairs/replacements are completed within 1–21 working days depending on parts availability.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 2. DIZMO Care+ (Apple) */}
                <section className="border-l-4 border-[#FCB042] pl-6">
                    <h2 className="text-2xl font-bold text-[#103E34] mb-4">2. DIZMO Care+ (Exclusive for Apple Products)</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Eligibility</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Offered only for Apple products (iPhone, iPad, MacBook).</li>
                                <li>Can be added at purchase by paying 4.75% of product price.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Coverage</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Hardware issues including logic board, screen (green line), or internal failures.</li>
                                <li>Brand-new product replacement (One Time) for covered hardware issues within 3–10 days.</li>
                                <li>Faster processing compared to free warranty (up to 12 weeks).</li>
                                <li>Free repairs for software issues affecting performance.</li>
                                <li>Maintains best resale/exchange value with new replacement.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Exclusions</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Fire, water, camera red/pink dot or accidental/physical damage.</li>
                                <li>Unauthorised repairs or alterations.</li>
                                <li>Accessories like chargers and cables.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Service Process</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Customers must bring device + box (no need for accessories).</li>
                                <li>Replacements are completed within promised time.</li>
                                <li>Replacement devices carry the remainder of the original DIZMO Care+ warranty.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 3. DIZMO Care+ (Android) */}
                <section className="border-l-4 border-[#FCB042] pl-6">
                    <h2 className="text-2xl font-bold text-[#103E34] mb-4">3. DIZMO Care+ (For Android, Tab & Laptop)</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Eligibility</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Available for all Android phones, tablets, and laptops.</li>
                                <li>Can be added by paying 6.99% (Flat Display) or 9.99% (Curved Display) of product price.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Coverage</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Covers hardware issues including logic board, green line screen issues, and internal failures.</li>
                                <li>Brand-new product replacement (One Time) for covered hardware issues within 3–5 days.</li>
                                <li>Faster than standard warranty (up to 3 weeks).</li>
                                <li>Free repairs for software issues affecting performance.</li>
                                <li>Better resale/exchange value with new replacements.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Exclusions & Process</h3>
                            <p>Same as Apple Care+</p>
                        </div>
                    </div>
                </section>

                {/* 4. Gadget Extended Warranty */}
                <section className="border-l-4 border-[#FCB042] pl-6">
                    <h2 className="text-2xl font-bold text-[#103E34] mb-4">4. Gadget Extended Warranty</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Eligibility</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Available for gadgets such as smartwatches, headphones, speakers, and accessories.</li>
                                <li>Can be added at the time of purchase with additional fee.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Coverage</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>All gadgets come with 03 days regular replacement warranty and you can extend it up to 12 months for continued replacement coverage (UnOfficial Products).</li>
                                <li>Covers gadget performance issues, internal components, and battery.</li>
                                <li>Repair or replacement of faulty parts.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Exclusions</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Physical damage, fire, or water.</li>
                                <li>Cosmetic wear & tear.</li>
                                <li>Unauthorised modifications.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Service Process</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Customers must provide original box.</li>
                                <li>Repairs/replacements within 3–21 working days.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 5. DIZMO Screen Care+ */}
                <section className="border-l-4 border-[#FCB042] pl-6">
                    <h2 className="text-2xl font-bold text-[#103E34] mb-4">5. DIZMO Screen Care+</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Eligibility</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Available for all smartphones.</li>
                                <li>Can be added at the time of purchase by paying 6% to 10% of the product price (Depending on model).</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Coverage</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>345 Days (1 Years) one-time display replacement.</li>
                                <li>Covers non-physical display issues (e.g., green line, dead pixels).</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Exclusions</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Physical damage (drops, cracks, pressure).</li>
                                <li>Unauthorised repairs or alterations.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#103E34] mb-2">Service Process</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Device + original box required.</li>
                                <li>Display replacement within 3–10 working days.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Short Overview */}
                <section className="bg-[#103E34] text-white p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 text-[#FCB042]">Short Overview: DIZMO Warranty & Replacement Policy</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">For DIZMO Care+ Products:</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Customers are eligible for a one-time brand-new device replacement.</li>
                                <li>If the device is in stock, replacement will be provided instantly.</li>
                                <li>If out of stock, replacement will be given within 3 to 10 working days.</li>
                                <li>Fire, water, camera red/pink dot or accidental/physical damage are not covered under DIZMO Care+.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">For Apple Products without DIZMO Care+:</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>1 year official Apple warranty is provided free of cost.</li>
                                <li>Apple warranty claims may take 6 to 12 weeks depending on customs and flight schedules.</li>
                                <li>Apple accessories such as adapter, wired EarPods, cable, and MagSafe charger come with a 1 year replacement warranty.</li>
                                <li>Apple warranty can be claimed globally from any official Apple service center.</li>
                                <li>Cosmetic damage, physical damage, liquid damage, electric shock and software issues are not covered under warranty.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">For Parts Warranty Products:</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>DIZMO will repair the product free of charge, including necessary parts.</li>
                                <li>Warranty will be void if there is physical damage, broken display, bending, scratches, dents, burns, electric shock, liquid damage, or rooting.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">For Service Warranty Products:</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Only free service is provided, parts are not included.</li>
                                <li>If any parts are required, the customer must provide them or purchase from DIZMO Care.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">For Official Warranty Products:</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Warranty can be claimed from any official service center in Bangladesh.</li>
                                <li>DIZMO does not provide warranty support for official warranty products.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* General Terms and Conditions */}
                <section className="border-l-4 border-[#103E34] pl-6">
                    <h2 className="text-2xl font-bold text-[#103E34] mb-4">General Terms and Conditions (Applicable to All Products)</h2>

                    <ul className="list-disc pl-5 space-y-2">
                        <li>For any model, colour or storage change within 30 days, 20%-25% deduction (imported) or 30%-40% deduction (official) will be applied from the current price.</li>
                        <li>Software bugs, update problems, third-party app bugs and gaming bugs are not covered under warranty.</li>
                        <li>Accidental damage is not covered by the replacement guarantee.</li>
                        <li>In-box accessories do not come with any warranty.</li>
                        <li>Liquid damage is not covered under warranty.</li>
                        <li>Customers must check the product properly before leaving the store. DIZMO will not accept complaints for cosmetic dents, scratches, waterproof issues, or externally serviced products after delivery.</li>
                        <li>Phones from the USA, UK, and Canada may be blacklisted or have update delays. DIZMO only provides hardware warranty for these phones. No replacement will be given for blacklist issues.</li>
                    </ul>

                    <p className="mt-4 italic text-sm text-gray-600">
                        Note: This is a system-generated invoice and does not require any signature.
                    </p>
                </section>

                {/* General Terms & Conditions (For All Plans) */}
                <section className="border-l-4 border-[#FCB042] pl-6">
                    <h2 className="text-2xl font-bold text-[#103E34] mb-4">General Terms & Conditions (For All Plans)</h2>

                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>UV Glass Disclaimer:</strong> If a UV glass is applied to the phone, any damage will not be covered under warranty.</li>
                        <li><strong>Warranty Activation:</strong> Must be activated at the time of purchase. Customer must retain original box.</li>
                        <li><strong>Authorized Repairs:</strong> Only DIZMO service centers are valid. Unauthorized repair voids warranty.</li>
                        <li><strong>Data Loss Disclaimer:</strong> Customers should back up data, DIZMO is not responsible for loss.</li>
                        <li><strong>Non-Transferable:</strong> Warranty valid only for original purchaser.</li>
                        <li><strong>No Liability for Additional Damages:</strong> DIZMO not liable for indirect or consequential loss.</li>
                        <li><strong>Final Decision:</strong> DIZMO reserves the right to final judgment on warranty claims.</li>
                    </ul>
                </section>

                {/* How to Claim Your Warranty */}
                <section className="bg-gradient-to-r from-[#FCB042]/10 to-[#103E34]/10 p-6 rounded-lg border-2 border-[#103E34]">
                    <h2 className="text-2xl font-bold text-[#103E34] mb-4">How to Claim Your Warranty</h2>

                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Visit any DIZMO service center with device, Original Box and valid photo ID.</li>
                        <li>Service team will diagnose and confirm warranty eligibility.</li>
                        <li>Repair/replacement completed within the promised timeframe.</li>
                        <li>Device returned to customer at the service center.</li>
                    </ol>
                </section>

                {/* Service Center Information */}
                <section>
                    <h2 className="text-2xl font-bold text-[#103E34] mb-4">DIZMO Service Center</h2>
                    <div className="bg-gray-50 p-6 rounded-lg border-2 border-[#FCB042]">
                        <p className="font-bold text-[#103E34] text-lg mb-2">DIZMO Service Center</p>
                        <p><strong>Address:</strong> Level: 4, Block: B, Shop:028A & 028B</p>
                        <p>Jamuna Future Park, Dhaka, Bangladesh</p>
                        <p className="mt-2"><strong>Phone:</strong> 01751 05 32 52</p>
                        <p><strong>Hours:</strong> 11:00 AM - 8:00 PM (Closed on Tuesdays)</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
