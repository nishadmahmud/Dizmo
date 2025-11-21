import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoryIcons from "@/components/CategoryIcons";
import FlashSale from "@/components/FlashSale";
import FeaturedProducts from "@/components/FeaturedProducts";
import OfferTabs from "@/components/OfferTabs";
import BrandShowcase from "@/components/BrandShowcase";
import NewArrivals from "@/components/NewArrivals";
import TrendingProducts from "@/components/TrendingProducts";
import TopRated from "@/components/TopRated";
import SpecialBanner from "@/components/SpecialBanner";
import BlogSection from "@/components/BlogSection";
import HelpTab from "@/components/HelpTab";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-1">
        <HeroSection />
        <CategoryIcons />
        <FlashSale />
        <FeaturedProducts />
        <OfferTabs />
        <BrandShowcase />
        <NewArrivals />
        <TrendingProducts />
        <TopRated />
        <SpecialBanner />
        <BlogSection />
      </div>

      <Footer />

      {/* Floating Widgets */}
      <HelpTab />
    </main>
  );
}
