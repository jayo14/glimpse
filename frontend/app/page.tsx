import Navbar from "@/components/landing-page/Navbar";
import Hero from "@/components/landing-page/Hero";
import FeatureGrid from "@/components/landing-page/FeatureGrid";
import WhyTrust from "@/components/landing-page/WhyTrust";
import ScreenshotsCarousel from "@/components/landing-page/ScreenshotsCarousel";
import Pricing from "@/components/landing-page/Pricing";
import CTABanner from "@/components/landing-page/CTABanner";
import Testimonials from "@/components/landing-page/Testimonials";
import FAQ from "@/components/landing-page/FAQ";
import Footer from "@/components/landing-page/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-950 font-sans antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
        <WhyTrust />
        <ScreenshotsCarousel />
        <Pricing />
        <CTABanner />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
