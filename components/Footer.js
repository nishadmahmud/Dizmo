import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground mt-auto">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold tracking-tight">
                            DIZMO<span className="text-accent">™</span>
                        </h3>
                        <p className="text-sm text-primary-foreground/80 leading-relaxed">
                            Your one-stop shop for authentic mobile phones, laptops, and premium gadgets in Bangladesh.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-accent transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-accent transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-accent transition-colors">
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-accent">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-white/90">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white/90">Contact</Link></li>
                            <li><Link href="/blog" className="hover:text-white/90">Blog</Link></li>
                            <li><Link href="/careers" className="hover:text-white/90">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="font-semibold mb-4 text-accent">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/help" className="hover:text-white/90">Help Center</Link></li>
                            <li><Link href="/terms" className="hover:text-white/90">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" className="hover:text-white/90">Privacy Policy</Link></li>
                            <li><Link href="/returns" className="hover:text-white/90">Returns & Refunds</Link></li>
                            <li><Link href="/emi" className="hover:text-white/90">EMI Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4 text-accent">Contact Us</h4>
                        <ul className="space-y-2 text-sm text-primary-foreground/80">
                            <li>Level 4, Bashundhara City</li>
                            <li>Dhaka, Bangladesh</li>
                            <li className="pt-2">+880 1234-567890</li>
                            <li>support@dizmo.com</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/60">
                    <p>&copy; {new Date().getFullYear()} Dizmo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
