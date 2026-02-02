"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HistoryIcon from "@mui/icons-material/History";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchApi } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

type AboutData = { heading: string; paragraph: string };

const DEFAULT_ABOUT: AboutData = {
  heading: "Maximizing Your Health Potential Together",
  paragraph:
    "Your AI-powered health companion transforms the way you approach wellness, making healthy living effortless and personalized.",
};

export default function HeroSection() {
  const [data, setData] = useState<AboutData>(DEFAULT_ABOUT);
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetchApi("api/content/about");
        const d = await r.json();
        setData(d);
      } catch {
        // keep default data
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -48 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 48 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#FCFCFD] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="grid grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-4 items-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28">

        <div ref={leftRef} className="col-span-12 xl:col-span-7">
          <h1 className="text-[1.75rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3.2rem] leading-tight font-semibold text-gray-900">
            {data.heading || DEFAULT_ABOUT.heading}
          </h1>

          <h3 className="mt-6 text-lg font-semibold text-gray-900">
            Smart Nutrition Planning
          </h3>

          <p className="mt-3 max-w-lg text-gray-500 text-[1.05rem] font-medium">
            {data.paragraph || DEFAULT_ABOUT.paragraph}
          </p>

          <button className="mt-8 px-7 py-3 bg-white text-[1.1rem] text-[#23262F] rounded-full font-bold shadow-[0_10px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_80px_rgba(0,0,0,0.15)] hover:bg-gray-100 transition-all duration-300">
            Read More
          </button>
        </div>

        <div ref={rightRef} className="col-span-12 xl:col-span-5 flex justify-center lg:justify-end">
          <div className="relative bg-[#F4F5F6] p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl w-full max-w-xl">
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl w-full">

       
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 font-semibold text-gray-800 text-[1.1rem]">
                  <AccessTimeIcon fontSize="small" />
                  Time Tracker
                </div>

                <button className="flex items-center gap-1 text-sm px-3 py-1 border border-gray-200 rounded-full text-[#23262F] bg-white">
                  <HistoryIcon fontSize="small" />
                  History
                </button>
              </div>

              <div className="bg-[#F4F5F6] rounded-3xl px-4 pb-3 pt-4 flex justify-between items-center shadow-sm">
                <div>
                  <p className="text-sm text-[#1F2937]">Design System</p>
                  <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-bold text-gray-900">
                    10:34:<span className="text-[#2075FF]">00</span>
                  </h2>
                </div>

                <button className="bg-[#2075FF] p-4 rounded-full text-white shadow-md hover:scale-105 transition">
                  <PlayArrowIcon fontSize="large" className="rounded-[1rem]" />
                </button>
              </div>


              <div className="mt-2">
                <h4 className="text-sm font-medium text-gray-600">
                  Previous Tasks
                </h4>

                <div className="flex items-center justify-between bg-white p-1 rounded-xl">
                  <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F1F3F5] rounded-full flex items-center justify-center">
  <Image
    src="/images/loom_symbol.svg.png" 
    alt="Time"
    width={24}
    height={24}
    className="object-contain"
  />
</div>
                    <div>
                      <p className="text-[.9rem] text-[#23262F] font-medium">Loom UI Design System</p>
                      <p className="text-xs text-gray-500">1:20:35</p>
                    </div>
                  </div>
                  <MoreVertIcon className="text-gray-400" />
                </div>

                <div className="flex items-center justify-between bg-white p-1 rounded-xl">
                  <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F1F3F5] rounded-full flex items-center justify-center">
  <Image
    src="/images/loom_symbol.svg.png" 
    alt="Time"
    width={24}
    height={24}
    className="object-contain"
  />
</div>
                    <div>
                      <p className="text-[.9rem] text-[#23262F] font-medium">Loom UI / UX Designer</p>
                      <p className="text-xs text-gray-500">1:45:35</p>
                    </div>
                  </div>
                  <MoreVertIcon className="text-gray-400" />
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
