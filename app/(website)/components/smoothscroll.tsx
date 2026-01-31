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
    // Start at top on every load (prevents loading "from the middle" on refresh/navigation)
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

    // Force Lenis to start at top (in case it read a stale scroll position)
    lenis.scrollTo("top", { immediate: true });

    // Sync Lenis with GSAP ScrollTrigger so scroll-driven animations fire correctly
    lenis.on("scroll", ScrollTrigger.update);

    const onTicker = (time: number) => {
      lenis.raf(time * 1000); // GSAP ticker uses seconds, Lenis uses ms
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
