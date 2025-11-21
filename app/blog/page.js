import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Calendar, User } from "lucide-react";

export default function BlogPage() {
    const blogPosts = [
        {
            id: 1,
            title: "Top 10 Gadgets to Watch in 2025",
            excerpt: "Discover the most anticipated tech releases coming this year, from smartphones to smart home devices.",
            date: "January 15, 2025",
            author: "Tech Team",
            image: "/placeholder-blog-1.jpg",
            category: "Tech News"
        },
        {
            id: 2,
            title: "How to Choose the Perfect Smartphone",
            excerpt: "A comprehensive guide to selecting the right phone based on your needs, budget, and preferences.",
            date: "January 10, 2025",
            author: "Dizmo Expert",
            image: "/placeholder-blog-2.jpg",
            category: "Buying Guide"
        },
        {
            id: 3,
            title: "Wireless Earbuds Comparison 2025",
            excerpt: "We compare the latest wireless earbuds from top brands to help you make an informed decision.",
            date: "January 5, 2025",
            author: "Audio Specialist",
            image: "/placeholder-blog-3.jpg",
            category: "Reviews"
        },
    ];

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="container py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-4">Dizmo Blog</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Stay updated with the latest tech news, buying guides, and product reviews from our experts.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Image Placeholder */}
                            <div className="h-48 bg-secondary flex items-center justify-center">
                                <FileText className="h-16 w-16 text-muted-foreground opacity-20" />
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">
                                        {post.category}
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold text-primary mb-3 line-clamp-2">
                                    {post.title}
                                </h2>

                                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between text-xs text-muted-foreground">
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
                        </article>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
