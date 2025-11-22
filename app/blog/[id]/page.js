"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

export default function BlogPostPage() {
    const params = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BLOG_BASE_URL;
                const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BLOGS || "/latest-ecommerce-blog-list";
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;

                // Since we don't have a specific details endpoint, we fetch the list and filter
                // This is a fallback strategy. Ideally, we would have /blog-details/:id
                const url = `${baseUrl}${endpoint}/${storeId}`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.success && data.data) {
                    const foundPost = data.data.find(p => p.id.toString() === params.id);

                    if (foundPost) {
                        setPost({
                            id: foundPost.id,
                            title: foundPost.title,
                            content: foundPost.description, // Assuming 'description' holds the full content
                            image: foundPost.image,
                            author: foundPost.author_name || "Admin",
                            date: new Date(foundPost.created_at).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            }),
                            category: "Tech News"
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching blog post:", error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchBlogPost();
        }
    }, [params.id]);

    if (loading) {
        return (
            <main className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <div className="container py-12 max-w-4xl">
                    <div className="h-8 w-32 bg-secondary/50 rounded animate-pulse mb-8" />
                    <div className="h-12 w-3/4 bg-secondary/50 rounded animate-pulse mb-6" />
                    <div className="h-[400px] w-full bg-secondary/50 rounded-2xl animate-pulse mb-8" />
                    <div className="space-y-4">
                        <div className="h-4 bg-secondary/50 rounded w-full" />
                        <div className="h-4 bg-secondary/50 rounded w-full" />
                        <div className="h-4 bg-secondary/50 rounded w-2/3" />
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    if (!post) {
        return (
            <main className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <div className="container py-20 text-center">
                    <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
                    <p className="text-muted-foreground mb-8">The blog post you are looking for does not exist.</p>
                    <Link href="/blog" className="text-primary hover:underline">
                        Back to Blog
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <article className="flex-1">
                {/* Hero Image */}
                <div className="w-full h-[300px] md:h-[500px] relative bg-secondary">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="container max-w-4xl">
                            <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-bold mb-4">
                                {post.category}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-6 text-white/80 text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container max-w-4xl py-12">
                    <div className="flex items-center justify-between mb-8 border-b border-border pb-8">
                        <Link
                            href="/blog"
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Blog
                        </Link>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                            <Share2 className="h-4 w-4" />
                            Share
                        </button>
                    </div>

                    <div
                        className="prose prose-lg dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>

            <Footer />
        </main>
    );
}
