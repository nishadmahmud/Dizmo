"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem("dizmo_user");
            const savedToken = localStorage.getItem("dizmo_token");

            if (savedUser && savedToken) {
                setUser(JSON.parse(savedUser));
                setToken(savedToken);
            }
        } catch (error) {
            console.error("Error loading auth state:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Login function
    const login = async (email, password) => {
        const storeId = process.env.NEXT_PUBLIC_STORE_ID;

        const response = await fetch("https://www.outletexpense.xyz/api/customer-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                user_id: storeId
            })
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Server error. Please try again later.");
        }

        const data = await response.json();

        if (data.token && data.customer) {
            // Save to state
            setUser(data.customer);
            setToken(data.token);

            // Save to localStorage
            localStorage.setItem("dizmo_user", JSON.stringify(data.customer));
            localStorage.setItem("dizmo_token", data.token);

            return { success: true, user: data.customer };
        } else {
            throw new Error(data.message || "Login failed. Please check your credentials.");
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("dizmo_user");
        localStorage.removeItem("dizmo_token");
    };

    // Check if user is authenticated
    const isAuthenticated = !!user && !!token;

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
