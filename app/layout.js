import { Outfit } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://www.dizmo.com.bd"),
  title: "DIZMO - Premium Apple Products ReSeller",
  description: "Authentic Mobile, Laptop & Gadget Shop in BD",
  openGraph: {
    title: "DIZMO - Premium Apple Products ReSeller",
    description: "Authentic Mobile, Laptop & Gadget Shop in BD",
    url: "/",
    siteName: "Dizmo",
    images: [
      {
        url: "/dizmo.jpg",
        width: 1200,
        height: 630,
        alt: "DIZMO - Premium Apple Products ReSeller",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIZMO - Premium Apple Products ReSeller",
    description: "Authentic Mobile, Laptop & Gadget Shop in BD",
    images: ["/dizmo.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '929769362841496');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${outfit.variable} antialiased`}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=929769362841496&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
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
