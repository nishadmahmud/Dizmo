import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Smartphone, Laptop, Watch, Headphones, Tablet, Camera, Gamepad, Plug, Monitor, HardDrive, Speaker, Battery } from "lucide-react";

const categories = [
    { name: "Phones", icon: Smartphone, color: "bg-blue-100 text-blue-600" },
    { name: "Laptops", icon: Laptop, color: "bg-purple-100 text-purple-600" },
    { name: "Watches", icon: Watch, color: "bg-orange-100 text-orange-600" },
    { name: "Audio", icon: Headphones, color: "bg-red-100 text-red-600" },
    { name: "Tablets", icon: Tablet, color: "bg-green-100 text-green-600" },
    { name: "Cameras", icon: Camera, color: "bg-yellow-100 text-yellow-600" },
    { name: "Gaming", icon: Gamepad, color: "bg-indigo-100 text-indigo-600" },
    { name: "Accessories", icon: Plug, color: "bg-teal-100 text-teal-600" },
    { name: "Monitors", icon: Monitor, color: "bg-cyan-100 text-cyan-600" },
    { name: "Storage", icon: HardDrive, color: "bg-gray-100 text-gray-600" },
    { name: "Speakers", icon: Speaker, color: "bg-pink-100 text-pink-600" },
    { name: "Power Banks", icon: Battery, color: "bg-lime-100 text-lime-600" },
];

export default function CategoriesPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="container py-12">
                <h1 className="text-3xl font-bold text-primary mb-8 text-center">Browse Categories</h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            href={`/categories/${cat.name.toLowerCase()}`}
                            className="group bg-card border border-border rounded-xl p-8 flex flex-col items-center gap-4 hover:shadow-lg transition-all hover:border-primary/50"
                        >
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                                <cat.icon className="h-10 w-10" />
                            </div>
                            <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
