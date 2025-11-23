import { Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import CartDrawer from "@/components/CartDrawer";

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
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <CartProvider>
          <ProductProvider>
            {children}
            <CartDrawer />
          </ProductProvider>
        </CartProvider>
      </body>
    </html>
  );
}
