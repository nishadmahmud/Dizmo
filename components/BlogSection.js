"use client";

import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

const blogPosts = [
    {
        id: 1,
        title: "Top 10 Smartphones to Buy in 2025",
        excerpt: "Discover the best smartphones that offer exceptional performance, camera quality, and value for money.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=250&fit=crop",
        author: "Tech Team",
        date: "Jan 15, 2025",
        category: "Phones",
        slug: "top-10-smartphones-2025"
    },
    {
        id: 2,
        title: "MacBook vs Windows Laptop: Which is Better?",
        excerpt: "A comprehensive comparison to help you choose the perfect laptop for your needs and budget.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop",
        author: "Tech Team",
        date: "Jan 12, 2025",
        category: "Laptops",
        slug: "macbook-vs-windows"
    },
    {
        id: 3,
        title: "Best Wireless Earbuds Under ৳30,000",
        excerpt: "Find the perfect wireless earbuds that deliver premium sound quality without breaking the bank.",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=250&fit=crop",
        author: "Tech Team",
        date: "Jan 10, 2025",
        category: "Audio",
        slug: "best-wireless-earbuds"
    },
    {
        id: 4,
        title: "Smart Watch Buying Guide 2025",
        excerpt: "Everything you need to know before buying a smartwatch, from features to battery life.",
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=250&fit=crop",
        author: "Tech Team",
        date: "Jan 8, 2025",
        category: "Watches",
        slug: "smartwatch-buying-guide"
    }
];

export default function BlogSection() {
    return (
        <section className="py-12 bg-secondary/30">
            <div className="container">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Latest from Our Blog</h2>
                        <p className="text-sm md:text-base text-muted-foreground">Tech news, reviews, and buying guides</p>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden md:flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                    >
                        View All Posts
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group bg-background rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/30 flex flex-col h-full"
                        >
                            {/* Blog Image */}
                            <div className="relative h-48 bg-secondary overflow-hidden flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {post.category}
                                </div>
                            </div>

                            {/* Blog Content */}
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                                    {post.excerpt}
                                </p>

                                {/* Meta Info */}
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                                    <div className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-6 flex justify-center md:hidden">
                    <Link
                        href="/blog"
                        className="px-6 py-2 rounded-full border border-primary text-primary font-medium text-sm hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                    >
                        View All Posts <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
