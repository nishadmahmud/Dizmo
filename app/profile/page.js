"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar, LogOut, CreditCard, Package, Heart, Settings } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const { user, isAuthenticated, loading, logout } = useAuth();
    const router = useRouter();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [loading, isAuthenticated, router]);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-secondary/30">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </main>
        );
    }

    if (!isAuthenticated || !user) {
        return null; // Will redirect
    }

    const menuItems = [
        { icon: Package, label: "My Orders", href: "/orders", description: "View your order history" },
        { icon: Heart, label: "Wishlist", href: "/wishlist", description: "Products you've saved" },
        { icon: MapPin, label: "Addresses", href: "/addresses", description: "Manage delivery addresses" },
        { icon: CreditCard, label: "Payment Methods", href: "/payments", description: "Saved payment options" },
        { icon: Settings, label: "Account Settings", href: "/settings", description: "Update your preferences" },
    ];

    return (
        <main className="min-h-screen bg-secondary/30 py-8 px-4">
            <div className="container max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-background rounded-2xl shadow-lg border border-border overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-[#103E34] to-[#1a5c4a] p-6 text-white">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                                {user.image ? (
                                    <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <User className="h-10 w-10 text-white" />
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{user.name || "Customer"}</h1>
                                <p className="text-white/80 text-sm">Member since {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                                {user.is_member === 1 && (
                                    <span className="inline-block mt-2 px-3 py-1 bg-[#FCB042] text-[#103E34] text-xs font-bold rounded-full">
                                        Premium Member
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Email</p>
                                <p className="font-medium text-sm">{user.email || "Not provided"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Phone</p>
                                <p className="font-medium text-sm">{user.mobile_number || "Not provided"}</p>
                            </div>
                        </div>

                        {user.address && (
                            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg md:col-span-2">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Address</p>
                                    <p className="font-medium text-sm">{user.address}</p>
                                </div>
                            </div>
                        )}

                        {user.wallet_balance && parseFloat(user.wallet_balance) > 0 && (
                            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <CreditCard className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="text-xs text-green-600">Wallet Balance</p>
                                    <p className="font-bold text-green-700">৳{parseFloat(user.wallet_balance).toLocaleString()}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-background rounded-2xl shadow-lg border border-border overflow-hidden mb-6">
                    <div className="p-4 border-b border-border">
                        <h2 className="font-bold text-lg">Quick Actions</h2>
                    </div>
                    <div className="divide-y divide-border">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                    <item.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{item.label}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-4 rounded-xl border border-red-200 flex items-center justify-center gap-2 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </main>
    );
}
