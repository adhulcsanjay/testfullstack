import Image from "next/image";
import HeroSection from "./components/hero";
import LogoScroll from "./components/logoscroll";
import Nutrition from "./components/nutrition";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <LogoScroll/>
      <Nutrition/>
    </div>
  );
}
