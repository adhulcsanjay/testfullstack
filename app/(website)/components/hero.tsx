"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import gsap from "gsap";
import { fetchApi } from "@/lib/api";

type HeroData = { title: string; subtitle: string; image: string };

const DEFAULT_HERO: HeroData = {
  title: "Your AI Health Coach",
  subtitle:
    "Transform your wellness journey with personalized AI-powered guidance that adapts to your unique needs.",
  image: "/images/Group 1171275467.png",
};

export default function Hero() {
  const [data, setData] = useState<HeroData>(DEFAULT_HERO);
  const sectionRef = useRef<HTMLElement>(null);
  const bgShapeRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const mainPhoneRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetchApi("api/content/hero");
        const d = await r.json();
        setData(d);
      } catch {
        // keep default data
      }
    }
    load();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Images: start hidden, animate in
      gsap.set([bgShapeRef.current, leftCardRef.current, mainPhoneRef.current, rightCardRef.current], {
        opacity: 0,
      });
      gsap.set(leftCardRef.current, { x: -80 });
      gsap.set(mainPhoneRef.current, { scale: 0.85, y: 20 });
      gsap.set(rightCardRef.current, { x: 80 });

      tl.to(bgShapeRef.current, { opacity: 1, duration: 0.6 })
        .to(leftCardRef.current, { opacity: 1, x: 0, duration: 0.6 }, "-=0.3")
        .to(mainPhoneRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.65 }, "-=0.5")
        .to(rightCardRef.current, { opacity: 1, x: 0, duration: 0.6 }, "-=0.5");

      // Text & CTA: start below, fade in
      gsap.set([avatarsRef.current, headingRef.current, subtextRef.current, buttonsRef.current], {
        opacity: 0,
        y: 32,
      });
      tl.to(avatarsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
        .to(subtextRef.current, { opacity: 1, y: 0, duration: 0.45 }, "-=0.35")
        .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F9FAFB] relative overflow-hidden">
      <div className="absolute bottom-[-200px] sm:bottom-[-300px] left-1/2 -translate-x-1/2 w-[300px] h-[200px] sm:w-[500px] sm:h-[350px] lg:w-[600px] lg:h-[400px] bg-[#B3AAFF] rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] opacity-40"></div>
      <div className="absolute left-4 sm:left-16 lg:left-32 top-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-[#70D9FF] rounded-full blur-[60px] sm:blur-[80px] lg:blur-[120px] opacity-40"></div>
      <div className="absolute right-4 sm:right-16 lg:right-32 top-1/4 w-[200px] h-[150px] sm:w-[300px] sm:h-[250px] lg:w-[400px] lg:h-[300px] bg-[#FFE5AA] rounded-full blur-[60px] sm:blur-[80px] lg:blur-[120px] opacity-40"></div>

      <div className="relative flex justify-center pb-20 lg:pb-32">
        <div ref={bgShapeRef} className="absolute inset-0 flex justify-center z-0">
          <Image
            src="/images/Collaboration Background Shape.png"
            alt="Hero Background"
            width={1920}
            height={500}
            className="object-cover w-full h-auto"
            priority
          />
        </div>

        <div ref={leftCardRef} className="absolute left-10 top-1/2 -translate-y-1/2 z-10 mt-16 hidden lg:block">
          <Image
            src="/images/Frame 1707482516.png"
            alt="Left Card"
            width={500}
            height={500}
            className="w-[500px] h-auto"
          />
        </div>

        <div ref={mainPhoneRef} className="relative z-20">
          <Image
            src={data.image || "/images/Group 1171275467.png"}
            alt="Main Phone"
            width={500}
            height={500}
            className="h-auto w-[260px] sm:w-[360px] md:w-[420px] lg:w-[500px] mt-8 lg:mt-8 rounded-2xl "
          />
        </div>

        <div ref={rightCardRef} className="absolute right-10 top-1/2 -translate-y-1/2 z-10 mt-16 hidden lg:block">
          <Image
            src="/images/Group 1171275392.png"
            alt="Right Card"
            width={500}
            height={500}
            className="w-[500px] h-auto"
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center pb-24 gap-4 relative px-4 sm:px-8">
        <div ref={avatarsRef} className="flex items-center gap-2 sm:gap-3">
          <AvatarGroup
            max={3}
            sx={{
              "& .MuiAvatar-root": {
                width: 40,
                height: 40,
                border: "1px solid white",
                "@media (min-width: 640px)": { width: 48, height: 48 },
                "@media (min-width: 1024px)": { width: 54, height: 54 },
              },
            }}
          >
            <Avatar src="/images/avatar (1).png" />
            <Avatar src="/images/avatar.png" />
            <Avatar src="/images/avatar (2).png" />
          </AvatarGroup>

          <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-lg font-semibold text-gray-800">
            <span className="text-lg sm:text-xl lg:text-2xl font-bold">59,182</span>
            <span className="text-gray-600 text-xs sm:text-base">Happy Users</span>
          </div>
        </div>

        <h2 ref={headingRef} className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.5rem] text-[#23262F] font-bold text-center mt-4">
          {data.title || DEFAULT_HERO.title}
        </h2>

        <p ref={subtextRef} className="max-w-[35rem] mx-auto text-gray-500 text-base sm:text-[1.1rem] font-medium text-center mt-2">
          {data.subtitle || DEFAULT_HERO.subtitle}
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 mt-6">
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
