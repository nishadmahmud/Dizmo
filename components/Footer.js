"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#103E34] text-primary-foreground pt-12 pb-6 mt-auto border-t border-primary-foreground/10">
            <div className="container">
                <Link href="/" className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-white tracking-tight">
                        DIZMO<span className="text-[#FCB042]">™</span>
                    </span>
                </Link>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: Contact & Support - Spans 2 rows on large screens */}
                    <div className="space-y-6 lg:row-span-2">


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
                                <li className="flex gap-3 items-center">
                                    <MessageCircle className="h-5 w-5 text-[#FCB042] shrink-0" />
                                    <a href="https://wa.me/8801710425454" target="_blank" rel="noopener noreferrer" className="hover:text-[#FCB042] transition-colors">
                                        WhatsApp: 01710 42 54 54
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 2: Company */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-[#FCB042]">Company</h3>
                        <ul className="space-y-2 text-primary-foreground/80 text-sm">
                            <li><Link href="/categories" className="hover:text-[#FCB042] transition-colors">Products</Link></li>
                            <li><Link href="/about" className="hover:text-[#FCB042] transition-colors">About Us</Link></li>
                            <li><Link href="/blog" className="hover:text-[#FCB042] transition-colors">Blog</Link></li>
                            <li><Link href="/offers" className="hover:text-[#FCB042] transition-colors">Offers</Link></li>
                            <li><Link href="/track-order" className="hover:text-[#FCB042] transition-colors">Track Order</Link></li>
                            <li><Link href="/compare" className="hover:text-[#FCB042] transition-colors">Compare Products</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Policy */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-[#FCB042]">Policy</h3>
                        <ul className="space-y-2 text-primary-foreground/80 text-sm">
                            <li><Link href="/privacy" className="hover:text-[#FCB042] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-[#FCB042] transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/warranty" className="hover:text-[#FCB042] transition-colors">Warranty Policy</Link></li>
                            <li><Link href="/emi" className="hover:text-[#FCB042] transition-colors">EMI Policy</Link></li>
                            <li><Link href="/shipping" className="hover:text-[#FCB042] transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="hover:text-[#FCB042] transition-colors">Return Policy</Link></li>
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
                                <Link href="https://www.facebook.com/Dizmo.bd/" target="_blank" rel="noopener noreferrer" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-[#FCB042] transition-colors">
                                    <Facebook className="h-4 w-4" />
                                </Link>
                                <Link href="https://www.instagram.com/dizmo.bd/" target="_blank" rel="noopener noreferrer" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-[#FCB042] transition-colors">
                                    <Instagram className="h-4 w-4" />
                                </Link>
                                <Link href="https://www.youtube.com/@Dizmo-bd" target="_blank" rel="noopener noreferrer" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-[#FCB042] transition-colors">
                                    <Youtube className="h-4 w-4" />
                                </Link>
                                <Link href="https://www.tiktok.com/@dizmo.bd" target="_blank" rel="noopener noreferrer" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-[#FCB042] transition-colors">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.36-3.96 1.84-6.13 1.31-2.23-.53-4.1-2.18-4.93-4.33-.86-2.2-.58-4.78.77-6.73 1.36-1.96 3.66-3.14 6.03-3.08v3.99c-1.28.03-2.52.62-3.28 1.66-.79 1.09-.93 2.56-.37 3.78.58 1.26 1.95 2.1 3.32 2.11 1.41.01 2.72-.9 3.23-2.24.52-1.37.23-2.94-.74-4.01-.25-.28-.55-.51-.87-.71V.02z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Payment Image - Spans 3 columns (Company, Policy, Newsletter) */}
                <div className="md:col-span-2 lg:col-span-3 flex items-end mb-8">
                    <div className="w-full bg-white rounded-lg">
                        <img
                            src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-03.png"
                            alt="Payment Methods"
                            className="w-full h-auto object-contain"
                        />
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
