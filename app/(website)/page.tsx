import Image from "next/image";
import HeroSection from "./components/hero";
import LogoScroll from "./components/logoscroll";
import Nutrition from "./components/nutrition";
import TestimonialSection from "./components/testimonial";
import Faq from "./components/faq"
import Offers from "./components/offer"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <LogoScroll/>
      <Nutrition/>
      <TestimonialSection/>
      <Faq/>
      <Offers/>
    </div>
  );
}
