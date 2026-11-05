import Nav from "@/components/nav/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import ScrollStory from "@/components/sections/ScrollStory";
import MortgageCalculator from "@/components/sections/MortgageCalculator";
import MapTeaser from "@/components/sections/MapTeaser";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import LenisProvider from "@/lib/LenisProvider";

export default function Home() {
  return (
    <LenisProvider>
      <Nav />
      <main>
        <Hero />
        <About />
        <FeaturedProperties />
        <ScrollStory />
        <MortgageCalculator />
        <MapTeaser />
        <Contact />
      </main>
      <Footer />
    </LenisProvider>
  );
}
