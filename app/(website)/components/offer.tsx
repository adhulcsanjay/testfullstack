"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Offer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px] xl:h-[900px] bg-[#FCFCFD] overflow-hidden">
        <div className="absolute right-[22rem] top-[10rem] z-10 mt-16 hidden lg:block">
          <Image
            src="/images/Icons (2).png"
            alt="Right top Card"
            width={50}
            height={50}
            className="w-[110px] h-auto"
          />
        </div>
        <div className="absolute left-[22rem] top-[10rem] z-10 mt-16 hidden lg:block">
          <Image
            src="/images/Icons.png"
            alt="left top Card"
            width={50}
            height={50}
            className="w-[110px] h-auto"
          />
        </div>


        <div className="absolute right-[24rem] bottom-[14rem] z-10 mt-16 hidden lg:block">
          <Image
            src="/images/Icons (3).png"
            alt="Right bottom Card"
            width={50}
            height={50}
            className="w-[110px] h-auto"
          />
        </div>
        <div className="absolute left-[24rem] bottom-[14rem] z-10 mt-16 hidden lg:block">
          <Image
            src="/images/Icons (1).png"
            alt="left bottom Card"
            width={50}
            height={50}
            className="w-[110px] h-auto"
          />
        </div>

 
      <Image
        src="/images/Collaboration Background Shape special offer.png"
        alt="offer Background"
        fill
        className="object-contain"
        priority
      />

      <div ref={contentRef} className="relative z-10 w-full flex flex-col items-center justify-center h-full px-4 sm:px-6 py-12 sm:py-16">
      <h3 className="text-gray-600 font-semibold text-sm sm:text-base">SPECIAL LAUNCH OFFER</h3>
      <h2 className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.5rem] text-[#23262F] font-semibold max-w-2xl text-center mt-4 leading-tight">
      Your journey to better health starts now
        </h2>

        <p className="max-w-[35rem] mx-auto text-gray-500 text-base sm:text-[1.1rem] font-medium text-center mt-2">
        Get 50% off your first 3 months when you start your trial today!
        </p>


        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className="flex items-center gap-3 px-6 py-3 bg-white rounded-full hover:bg-gray-200 transition">
            <Image
              src="/images/Logo (1).png"
              alt="App Store"
              width={25}
              height={25}
            />
            <div className="text-left leading-tight">
              <p className="text-[1rem] text-[#23262F] font-bold">App Store</p>
            </div>
          </button>

          <button className="flex items-center gap-3 px-6 py-3 bg-white rounded-full hover:bg-gray-200 transition">
            <Image
              src="/images/Logo (2).png"
              alt="Google Play"
              width={25}
              height={25}
            />
            <div className="text-left leading-tight">
              <p className="text-[1rem] text-[#23262F] font-bold">Google Play</p>
            </div>
          </button>
        </div>
      </div>

    </section>
  );
}
