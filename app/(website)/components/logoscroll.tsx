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

  // duplicate logos for seamless loop
  const allLogos = [...logos, ...logos];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".logo-item", {
        xPercent: -50,
        repeat: -1,
        duration: 5,
        ease: "linear",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="overflow-hidden bg-[#FCFCFD] w-full py-20">
      <div
        ref={containerRef}
        className="flex gap-20 w-max"
      >
        {allLogos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            className="logo-item w-50 h-auto object-contain"
            alt="logo"
          />
        ))}
      </div>
    </section>
  );
}
