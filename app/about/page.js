"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Award, Users, Globe, ArrowRight, ShieldCheck, Truck, Headphones, Target, Lightbulb, Heart, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

// Store images
const storeImages = {
    storeFront: "https://lh3.googleusercontent.com/p/AF1QipPtgI7i501SL0pqmYWKJKFkezULjr4Tpuz8Th81=w408-h306-k-no",
    happyCustomer: "https://scontent.fdac178-1.fna.fbcdn.net/v/t39.30808-6/598006029_122146142450704421_8632810897370606840_n.jpg?stp=cp6_dst-jpg_p526x296_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IxFDuDfSOxwQ7kNvwE3hOyu&_nc_oc=AdkV6JofoHgI7CPj-y6oSHQAUJtGMKeW-HT6bcnAlHRUAdqPvjjV1EWwlac9Xwcxwq8&_nc_zt=23&_nc_ht=scontent.fdac178-1.fna&_nc_gid=t_5Uu4VMvXxDB0VM6pjuTQ&oh=00_AfncWt2xZuXSzNR57BbeBddOey3455tGTYXgFcYcFH6h6A&oe=6947181D"
};


export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            {/* Hero Section - Text Only */}
            <section className="py-12 md:py-20 bg-secondary/30 flex items-center justify-center">
                <div className="container text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up text-primary">
                        Empowering Your Digital Lifestyle
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in-up delay-100 leading-relaxed">
                        Dizmo is Bangladesh's premier destination for authentic gadgets, premium accessories, and cutting-edge technology. We are dedicated to bringing the world's best tech right to your doorstep.
                    </p>
                </div>
            </section>

            {/* Who We Are & Our Journey */}
            <section className="py-12 bg-background">
                <div className="container max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 border-l-4 border-primary pl-4">
                                Who We Are
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                                <p className="mb-6">
                                    Dizmo is more than just a gadget shop; we are a collective of tech enthusiasts, geeks, and visionaries dedicated to redefining the electronics retail landscape in Bangladesh. Founded in 2024, we identified a significant gap in the market: the lack of a reliable, transparent, and customer-centric source for authentic international tech products.
                                </p>
                                <p>
                                    We started with a simple promise: to sell only what we would use ourselves. This philosophy has guided every decision we make, from our curated product selection to our rigorous quality control processes. Today, Dizmo stands as a beacon of trust for thousands of customers who refuse to compromise on quality.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                unoptimized
                                src={storeImages.storeFront}
                                alt="DIZMO Store Front"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
                            <Image
                                unoptimized
                                src={storeImages.happyCustomer}
                                alt="Happy DIZMO Customer"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 border-l-4 border-primary pl-4">
                                Our Journey
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                                <p className="mb-6">
                                    Our journey began in a small room with a handful of products and a big dream. We faced the challenges of a saturated market filled with counterfeits and unreliable warranties. Instead of competing on price alone, we chose to compete on integrity. We built direct relationships with authorized distributors and established a supply chain that guarantees authenticity.
                                </p>
                                <p>
                                    Over the years, we have expanded our catalog to include everything from the latest flagship smartphones and high-performance laptops to smart home ecosystems and audiophile-grade sound systems. But our core mission remains unchanged: to empower our customers with technology that enhances their lives.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-12 bg-secondary/20">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Target className="h-8 w-8 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                To bridge the gap between technology and people by providing authentic, high-quality electronics at competitive prices, backed by a service experience that builds lasting trust and empowers our customers to achieve more.
                            </p>
                        </div>
                        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Lightbulb className="h-8 w-8 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                To become Bangladesh's most trusted and innovative retail platform for consumer electronics, setting the standard for authenticity, customer service, and technological accessibility in the region.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-12 bg-background">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            These principles guide every interaction we have and every product we sell.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="text-center p-6">
                            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Integrity First</h3>
                            <p className="text-muted-foreground">
                                We believe in honesty and transparency. We never sell refurbished items as new, and we always honor our warranty commitments.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Customer Obsession</h3>
                            <p className="text-muted-foreground">
                                Our customers are at the heart of everything we do. We go the extra mile to ensure your shopping experience is seamless and satisfying.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Quality Excellence</h3>
                            <p className="text-muted-foreground">
                                We are relentless in our pursuit of quality. Every product in our inventory is vetted to meet our high standards of performance and durability.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="py-12 bg-secondary/10">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Visit our store or reach out to us directly.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-card border border-border p-6 rounded-xl flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                            <p className="text-muted-foreground text-sm">
                                Level: 4, Block: B, Shop:028A & 028B<br />
                                Jamuna Future Park, Dhaka, Bangladesh
                            </p>
                        </div>

                        <div className="bg-card border border-border p-6 rounded-xl flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Call Us</h3>
                            <p className="text-muted-foreground text-sm mb-1">
                                Emergency: 01751 05 32 52
                            </p>
                            <p className="text-muted-foreground text-sm">
                                WhatsApp: 01710 42 54 54
                            </p>
                        </div>

                        <div className="bg-card border border-border p-6 rounded-xl flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <Clock className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Opening Hours</h3>
                            <p className="text-muted-foreground text-sm">
                                Every Day<br />
                                11.00 am To 9.00 pm
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-12">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Dizmo?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We don't just sell products; we deliver a promise of quality and reliability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <ShieldCheck className="h-10 w-10 text-primary" />,
                                title: "Genuine Products",
                                description: "We guarantee 100% authenticity on all our products, sourced directly from authorized distributors."
                            },
                            {
                                icon: <Award className="h-10 w-10 text-primary" />,
                                title: "Best Prices",
                                description: "Get the most competitive market prices without compromising on quality or service."
                            },
                            {
                                icon: <Truck className="h-10 w-10 text-primary" />,
                                title: "Fast Shipping",
                                description: "We offer lightning-fast delivery across Bangladesh, ensuring your gadgets reach you safely."
                            },
                            {
                                icon: <Headphones className="h-10 w-10 text-primary" />,
                                title: "Expert Support",
                                description: "Our dedicated support team is here to assist you with any queries or technical issues."
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-card border border-border p-8 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1 group">
                                <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-primary text-white">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">10k+</div>
                            <div className="text-primary-foreground/80">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                            <div className="text-primary-foreground/80">Products Available</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">64</div>
                            <div className="text-primary-foreground/80">Districts Covered</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                            <div className="text-primary-foreground/80">Online Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-background text-center">
                <div className="container max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Ready to Upgrade Your Tech?
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">
                        Explore our wide range of premium gadgets and accessories today.
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:gap-3 shadow-lg hover:shadow-primary/25"
                    >
                        Shop Now <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
