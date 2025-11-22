"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function BlogSection() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BLOG_BASE_URL;
                const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BLOGS || "/latest-ecommerce-blog-list";
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;

                // Construct URL based on provided logic
                const url = `${baseUrl}${endpoint}/${storeId}`;
                console.log('Fetching blogs from:', url);

                const response = await fetch(url);
                const data = await response.json();

                if (data.success && data.data) {
                    const mappedPosts = data.data.map(post => ({
                        id: post.id,
                        title: post.title,
                        excerpt: post.short_description,
                        image: post.image,
                        author: post.author_name || "Admin",
                        date: new Date(post.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        }),
                        category: "Tech News", // Default category as API might not provide it
                        slug: post.id // Using ID as slug for now since API structure might vary
                    }));
                    setBlogPosts(mappedPosts.slice(0, 4)); // Limit to 4 posts
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <section className="py-12 bg-secondary/30">
                <div className="container">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="h-8 w-48 bg-secondary/50 rounded animate-pulse mb-2" />
                            <div className="h-4 w-64 bg-secondary/50 rounded animate-pulse" />
                        </div>
                        <div className="h-6 w-24 bg-secondary/50 rounded animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-background rounded-xl overflow-hidden h-[350px] animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (blogPosts.length === 0) return null;

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
