"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, LogOut, CreditCard, Package, Clock, CheckCircle, Truck, XCircle, Loader2, Edit2, Save, X } from "lucide-react";

export default function ProfilePage() {
    const { user, isAuthenticated, loading, logout } = useAuth();
    const router = useRouter();

    // Orders state
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("1");

    // Edit profile state
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editError, setEditError] = useState("");
    const [editSuccess, setEditSuccess] = useState("");
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile_number: "",
        address: ""
    });

    const orderTabs = [
        { type: "1", label: "Order Processing", icon: Clock },
        { type: "2", label: "Order Completed", icon: CheckCircle },
        { type: "3", label: "Delivery Processing", icon: Truck },
        { type: "4", label: "Delivery Completed", icon: Package },
        { type: "5", label: "Cancelled", icon: XCircle },
    ];

    // Initialize form data when user loads
    useEffect(() => {
        if (user) {
            const nameParts = (user.name || "").split(" ");
            setFormData({
                first_name: nameParts[0] || "",
                last_name: nameParts.slice(1).join(" ") || "",
                email: user.email || "",
                mobile_number: user.mobile_number || "",
                address: user.address || ""
            });
        }
    }, [user]);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [loading, isAuthenticated, router]);

    // Fetch orders when tab changes or user loads
    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.id) return;

            setOrdersLoading(true);
            try {
                const response = await fetch("https://www.outletexpense.xyz/api/customer-order-list", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        type: activeTab,
                        customer_id: user.id,
                        limit: "10"
                    })
                });

                const data = await response.json();
                if (data.success && data.data?.data) {
                    setOrders(data.data.data);
                } else {
                    setOrders([]);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                setOrders([]);
            } finally {
                setOrdersLoading(false);
            }
        };

        if (user?.id) {
            fetchOrders();
        }
    }, [user?.id, activeTab]);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setEditError("");
    };

    const handleSaveProfile = async () => {
        setEditError("");
        setEditSuccess("");
        setSaving(true);

        try {
            const response = await fetch("https://www.outletexpense.xyz/api/customer/update-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: user.id,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    mobile_number: formData.mobile_number,
                    address: formData.address
                })
            });

            const data = await response.json();

            if (data.success) {
                setEditSuccess("Profile updated successfully!");
                setIsEditing(false);

                // Update localStorage with new user data
                const updatedUser = { ...user, ...data.data };
                localStorage.setItem("dizmo_user", JSON.stringify(updatedUser));

                // Reload page to reflect changes
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                setEditError(data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setEditError("Something went wrong. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-secondary/30">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </main>
        );
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <main className="min-h-screen bg-secondary/30 py-8 px-4">
            <div className="container max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-background rounded-2xl shadow-lg border border-border overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-[#103E34] to-[#1a5c4a] p-6 text-white">
                        <div className="flex items-center justify-between">
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
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                            >
                                {isEditing ? <X className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* User Info - View Mode */}
                    {!isEditing ? (
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

                            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg md:col-span-2">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Address</p>
                                    <p className="font-medium text-sm">{user.address || "Not provided"}</p>
                                </div>
                            </div>

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
                    ) : (
                        /* User Info - Edit Mode */
                        <div className="p-6 space-y-4">
                            {editError && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                    {editError}
                                </div>
                            )}
                            {editSuccess && (
                                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
                                    {editSuccess}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-foreground block mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground block mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground block mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground block mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="mobile_number"
                                    value={formData.mobile_number}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground block mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <button
                                onClick={handleSaveProfile}
                                disabled={saving}
                                className="w-full bg-[#103E34] text-white font-medium py-3 rounded-lg hover:bg-[#103E34]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* My Orders */}
                <div className="bg-background rounded-2xl shadow-lg border border-border overflow-hidden mb-6">
                    <div className="p-4 border-b border-border">
                        <h2 className="font-bold text-lg text-[#103E34]">My Orders</h2>
                    </div>

                    {/* Order Tabs */}
                    <div className="flex overflow-x-auto border-b border-border">
                        {orderTabs.map((tab) => (
                            <button
                                key={tab.type}
                                onClick={() => setActiveTab(tab.type)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.type
                                        ? "border-[#103E34] text-[#103E34]"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <tab.icon className="h-4 w-4" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Orders List */}
                    <div className="p-4">
                        {ordersLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : orders.length > 0 ? (
                            <div className="space-y-3">
                                {orders.map((order, idx) => (
                                    <div key={order.id || idx} className="p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium">Order #{order.invoice_no || order.id}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {order.created_at ? new Date(order.created_at).toLocaleDateString() : ''}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                {order.total_items || 0} item(s)
                                            </span>
                                            <span className="font-bold text-[#103E34]">
                                                ৳{parseFloat(order.total || 0).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                                <p className="text-muted-foreground">No orders found in this category.</p>
                                <p className="text-sm text-muted-foreground/70">Orders will appear here once you make a purchase.</p>
                            </div>
                        )}
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
