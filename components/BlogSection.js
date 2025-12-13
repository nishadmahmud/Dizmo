"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function BlogSection() {
    const [blogPosts, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);

                // Use fallback values if env variables are undefined
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BLOG_BASE_URL || 'https://www.outletexpense.xyz/api';
                const blogsEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_BLOGS || '/latest-ecommerce-blog-list';
                const storeId = process.env.NEXT_PUBLIC_STORE_ID || '265';

                const url = `${apiBaseUrl}${blogsEndpoint}/${storeId}`;
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();

                    if (data.success && data.data && data.data.length > 0) {
                        // Map and take only first 4 blogs for homepage
                        const mappedBlogs = data.data.slice(0, 4).map(blog => {
                            // Extract plain text from HTML description for excerpt
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = blog.description || '';
                            const plainText = tempDiv.textContent || tempDiv.innerText || '';
                            const excerpt = plainText.substring(0, 100) + (plainText.length > 100 ? '...' : '');

                            return {
                                id: blog.id,
                                title: blog.title,
                                excerpt: excerpt,
                                image: blog.image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop",
                                author: "Dizmo Team",
                                date: new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                                category: "News",
                                slug: blog.id.toString()
                            };
                        });
                        setBlogs(mappedBlogs);
                    }
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Don't show section if no blogs
    if (!loading && blogPosts.length === 0) {
        return null;
    }

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

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-background rounded-xl overflow-hidden border border-border animate-pulse">
                                <div className="h-48 bg-secondary" />
                                <div className="p-5 space-y-3">
                                    <div className="h-4 bg-secondary rounded w-3/4" />
                                    <div className="h-4 bg-secondary rounded w-full" />
                                    <div className="h-4 bg-secondary rounded w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
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
                )}

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
