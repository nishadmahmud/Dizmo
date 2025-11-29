"use client";

import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
    {
        id: 1,
        title: "Top 10 Smartphones to Buy in 2025",
        excerpt: "Discover the best smartphones that offer exceptional performance, camera quality, and value for money.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=250&fit=crop",
        author: "Tech Team",
        date: "January 15, 2025",
        category: "Phones",
        slug: "top-10-smartphones-2025"
    },
    {
        id: 2,
        title: "MacBook vs Windows Laptop: Which is Better?",
        excerpt: "A comprehensive comparison to help you choose the perfect laptop for your needs and budget.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop",
        author: "Tech Team",
        date: "January 12, 2025",
        category: "Laptops",
        slug: "macbook-vs-windows"
    },
    {
        id: 3,
        title: "Best Wireless Earbuds Under ৳30,000",
        excerpt: "Find the perfect wireless earbuds that deliver premium sound quality without breaking the bank.",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=250&fit=crop",
        author: "Tech Team",
        date: "January 10, 2025",
        category: "Audio",
        slug: "best-wireless-earbuds"
    },
    {
        id: 4,
        title: "Smart Watch Buying Guide 2025",
        excerpt: "Everything you need to know before buying a smartwatch, from features to battery life.",
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=250&fit=crop",
        author: "Tech Team",
        date: "January 8, 2025",
        category: "Watches",
        slug: "smartwatch-buying-guide"
    },
    {
        id: 5,
        title: "Gaming Laptop Buying Guide 2025",
        excerpt: "Find the perfect gaming laptop that delivers high performance for your favorite games.",
        image: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=400&h=250&fit=crop",
        author: "Gaming Expert",
        date: "January 5, 2025",
        category: "Gaming",
        slug: "gaming-laptop-guide"
    },
    {
        id: 6,
        title: "Best Budget Smartphones in Bangladesh",
        excerpt: "Top affordable smartphones that offer great value without compromising on essential features.",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=250&fit=crop",
        author: "Tech Team",
        date: "January 3, 2025",
        category: "Phones",
        slug: "budget-smartphones-bd"
    }
];

export default function BlogPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">

            <div className="container py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Dizmo Blog</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Stay updated with the latest tech news, buying guides, and product reviews from our experts.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
                        >
                            {/* Image */}
                            <Link href={`/blog/${post.slug}`} className="block relative h-48 bg-secondary overflow-hidden flex-shrink-0 group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {post.category}
                                </div>
                            </Link>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                    <div className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{post.date}</span>
                                    </div>
                                </div>

                                <Link href={`/blog/${post.slug}`} className="block">
                                    <h2 className="text-xl font-bold text-primary mb-3 line-clamp-2 hover:text-accent transition-colors">
                                        {post.title}
                                    </h2>
                                </Link>

                                <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow">
                                    {post.excerpt}
                                </p>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all mt-auto"
                                >
                                    Read More <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

        </main>
    );
}
