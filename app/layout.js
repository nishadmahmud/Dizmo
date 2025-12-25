import { Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/CartDrawer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import FloatingActions from "@/components/FloatingActions";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Dizmo - Premium Gadget Shop",
  description: "Authentic Mobile, Laptop & Gadget Shop in BD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <ProductProvider>
              <Navbar />
              {children}
              <Footer />
              <CartDrawer />
              <FloatingActions />
            </ProductProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
