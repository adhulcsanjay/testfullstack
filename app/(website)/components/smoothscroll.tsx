"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.scrollTo("top", { immediate: true });

    lenis.on("scroll", ScrollTrigger.update);

    const onTicker = (time: number) => {
      lenis.raf(time * 1000); 
    };
    gsap.ticker.add(onTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
