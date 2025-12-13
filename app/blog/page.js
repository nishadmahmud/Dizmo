"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";

// Dummy blog posts as fallback
const dummyBlogPosts = [
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
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BLOG_BASE_URL;
                const blogsEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_BLOGS;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID || '265';

                // Construct the blog API URL
                const url = `${apiBaseUrl}${blogsEndpoint}/${storeId}`;
                console.log('Fetching blogs from:', url);

                // Try to fetch from blog API
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();

                    // Check if API returned data
                    if (data.success && data.data && data.data.length > 0) {
                        // Map API data to our format
                        const mappedBlogs = data.data.map(blog => {
                            // Extract plain text from HTML description for excerpt
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = blog.description || '';
                            const plainText = tempDiv.textContent || tempDiv.innerText || '';
                            const excerpt = plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');

                            return {
                                id: blog.id,
                                title: blog.title,
                                excerpt: excerpt,
                                description: blog.description, // Keep full HTML for detail page
                                image: blog.image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop",
                                author: "Dizmo Team",
                                date: new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                                category: "News",
                                slug: blog.id.toString()
                            };
                        });
                        setBlogPosts(mappedBlogs);
                    } else {
                        // API returned empty, use dummy data
                        console.log('Blog API returned empty, using dummy data');
                        setBlogPosts(dummyBlogPosts);
                    }
                } else {
                    // API call failed, use dummy data
                    console.log('Blog API call failed, using dummy data');
                    setBlogPosts(dummyBlogPosts);
                }
            } catch (error) {
                // Error occurred, use dummy data
                console.error('Error fetching blogs:', error);
                setBlogPosts(dummyBlogPosts);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

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

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
            </div>

        </main>
    );
}
