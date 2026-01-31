"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LogoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const logos = [
    "/images/Logoscroll.png",
    "/images/Logoscrol2.png",
    "/images/Logoscroll3.png",
    "/images/Logoscroll4.png",
    "/images/Logoscroll5.png",
  ];

 
  const allLogos = [...logos, ...logos];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Animate the container (one element) for smooth, non-jittery loop.
      // Moving by -50% brings the duplicated half into place = seamless repeat.
      gsap.to(el, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none", // truly linear, no easing curve
        force3D: true, // GPU layer, reduces subpixel jitter
        overwrite: "auto",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="overflow-hidden bg-[#FCFCFD] w-full py-12 sm:py-16 md:py-20">
      <div
        ref={containerRef}
        className="flex gap-8 sm:gap-12 md:gap-16 lg:gap-20 w-max will-change-transform"
      >
        {allLogos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            className="logo-item w-24 sm:w-32 md:w-40 lg:w-48 xl:w-[200px] h-auto object-contain"
            alt="logo"
          />
        ))}
      </div>
    </section>
  );
}
