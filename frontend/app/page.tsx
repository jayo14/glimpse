import Navbar from "@/components/landing-page/Navbar";
import Hero from "@/components/landing-page/Hero";
import Stats from "@/components/landing-page/Stats";
import HowItWorks from "@/components/landing-page/HowItWorks";
import ProductShowcase from "@/components/landing-page/ProductShowcase";
import UseCases from "@/components/landing-page/UseCases";
import Pricing from "@/components/landing-page/Pricing";
import CTABanner from "@/components/landing-page/CTABanner";
import WaitlistSection from "@/components/landing-page/WaitlistSection";
import Footer from "@/components/landing-page/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9f8f6]">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <ProductShowcase />
        <UseCases />
        <Pricing />
        <CTABanner />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}
