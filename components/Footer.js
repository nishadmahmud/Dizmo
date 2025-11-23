"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#103E34] text-primary-foreground pt-12 pb-6 mt-auto border-t border-primary-foreground/10">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Column 1: Contact & Support - Spans 2 rows on large screens */}
                    <div className="space-y-6 lg:row-span-2">
                        <div>
                            <p className="text-sm text-primary-foreground/80 mb-1">Got Questions ? Call us 24/7!</p>
                            <p className="text-2xl font-bold text-[#FCB042]">01710 42 54 54</p>
                        </div>

                        <div className="space-y-4 text-primary-foreground/80 text-sm">
                            <h4 className="font-bold text-[#FCB042] text-lg">Contact Us</h4>
                            <ul className="space-y-3">
                                <li className="flex gap-3 items-start">
                                    <MapPin className="h-5 w-5 text-[#FCB042] shrink-0 mt-0.5" />
                                    <span>Level: 4, Block: B, Shop:028A & 028B, Jamuna Future Park, Dhaka, Bangladesh</span>
                                </li>
                                <li className="flex gap-3 items-center">
                                    <Phone className="h-5 w-5 text-[#FCB042] shrink-0" />
                                    <span>Emergency: 01751 05 32 52</span>
                                </li>
                                <li className="flex gap-3 items-center">
                                    <Mail className="h-5 w-5 text-[#FCB042] shrink-0" />
                                    <span>dizmo.bd@gmail.com</span>
                                </li>
                                <li className="flex gap-3 items-center">
                                    <Clock className="h-5 w-5 text-[#FCB042] shrink-0" />
                                    <span>Office Time: 11.00 am To 9.00 pm</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 2: Company */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-[#FCB042]">Company</h3>
                        <ul className="space-y-2 text-primary-foreground/80 text-sm">
                            <li><Link href="/about" className="hover:text-[#FCB042] transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-[#FCB042] transition-colors">Careers</Link></li>
                            <li><Link href="/brands" className="hover:text-[#FCB042] transition-colors">Our Brands</Link></li>
                            <li><Link href="/blog" className="hover:text-[#FCB042] transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Policy */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-[#FCB042]">Policy</h3>
                        <ul className="space-y-2 text-primary-foreground/80 text-sm">
                            <li><Link href="/privacy" className="hover:text-[#FCB042] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-[#FCB042] transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/cookies" className="hover:text-[#FCB042] transition-colors">Cookie Policy</Link></li>
                            <li><Link href="/warranty" className="hover:text-[#FCB042] transition-colors">Warranty Policy</Link></li>
                            <li><Link href="/emi" className="hover:text-[#FCB042] transition-colors">EMI Policy</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter & Socials */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold mb-2 text-[#FCB042]">Newsletter</h4>
                            <p className="text-sm text-primary-foreground/80 mb-3">Sign up for get latest news and update</p>
                            <div className="flex flex-col gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white text-black px-3 py-2 rounded text-sm focus:outline-none"
                                />
                                <button className="w-full bg-[#FCB042] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#FCB042]/90 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-3 text-[#FCB042]">Follow Us</h4>
                            <div className="flex gap-3 mb-4">
                                <Link href="https://facebook.com" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-[#FCB042] transition-colors">
                                    <Facebook className="h-4 w-4" />
                                </Link>
                                <Link href="https://instagram.com" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-[#FCB042] transition-colors">
                                    <Instagram className="h-4 w-4" />
                                </Link>
                                <Link href="https://youtube.com" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-[#FCB042] transition-colors">
                                    <Youtube className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Payment Image - Spans 3 columns (Company, Policy, Newsletter) */}
                    <div className="md:col-span-2 lg:col-span-3 flex items-end">
                        <div className="w-full bg-white rounded-lg">
                            <img
                                src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png"
                                alt="Payment Methods"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/60">
                    <p>&copy; {new Date().getFullYear()} Dizmo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
