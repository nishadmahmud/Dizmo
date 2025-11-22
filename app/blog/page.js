"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Calendar, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BLOG_BASE_URL;
                const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BLOGS || "/latest-ecommerce-blog-list";
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;

                const url = `${baseUrl}${endpoint}/${storeId}`;
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
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        }),
                        category: "Tech News",
                        slug: post.id
                    }));
                    setBlogPosts(mappedPosts);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="container py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Dizmo Blog</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Stay updated with the latest tech news, buying guides, and product reviews from our experts.
                    </p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden h-[400px] animate-pulse">
                                <div className="h-48 bg-secondary/50" />
                                <div className="p-6 space-y-4">
                                    <div className="h-4 bg-secondary/50 rounded w-1/4" />
                                    <div className="h-8 bg-secondary/50 rounded w-3/4" />
                                    <div className="h-4 bg-secondary/50 rounded w-full" />
                                    <div className="h-4 bg-secondary/50 rounded w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Blog Grid */
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
                )}

                {!loading && blogPosts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">No blog posts found</h3>
                        <p className="text-muted-foreground">Check back later for updates.</p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
