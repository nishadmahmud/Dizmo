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
import PromoBanners from "@/components/PromoBanners";
import FullWidthBanner from "@/components/FullWidthBanner";
import SEOContent from "@/components/SEOContent";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-1 w-full">
        {/* Content wrapper with max-width */}
        <div className="max-w-6xl mx-auto px-0 md:px-4">
          <HeroSection />
          <CategoryIcons />
          <div id="flash-sale" className="scroll-mt-24">
            <FlashSale />
          </div>
          <PromoBanners />
          <FeaturedProducts />
          <OfferTabs />
          <BrandShowcase />
          <NewArrivals />
          <FullWidthBanner />
          {/* <TrendingProducts /> */}
          {/* <TopRated /> */}
          <SpecialBanner />
          <BlogSection />
          <SEOContent />
        </div>
      </div>

      <Footer />


    </main>
  );
}
