"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

gsap.registerPlugin(ScrollTrigger);


const testimonials = [
  {
    name: "Ava L.",
    role: "Marketing Executive",
    tag: "Empowered by AI Wellness Journeys",
    message:
      "I’ve tried countless health apps, but none come close to this. The AI truly understands my needs—it suggested daily routines and nutrition tips that actually fit my lifestyle. Within weeks, I felt more energized, slept better, and became more mindful. It’s like having a personal wellness coach in my pocket.",
  },
  { name: "Namo Serlina", role: "CEO Delego", tag: "Wellness Partner", message: "This platform transformed my routine." },
  { name: "John Carter", role: "Fitness Trainer", tag: "Verified User", message: "Best wellness AI ever." },
  { name: "Emily Stone", role: "Designer", tag: "Verified User", message: "Simple and powerful." },
  { name: "Michael Ray", role: "Developer", tag: "Verified User", message: "Highly personalized and smart." },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  useEffect(() => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          delay: 0.12,
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
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#F4F5F6] text-center px-4 sm:px-6">

      <h2 ref={headingRef} className="text-[1.75rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3.2rem] leading-tight font-semibold text-[#1F2937]">
        Our Users Feel the <br /> Transformation
      </h2>
      <p className="text-gray-500 text-sm sm:text-[1.05rem] max-w-md mx-auto mt-3">
        Real Stories from People Empowered by Personalized Wellness
      </p>

      <div className="relative flex items-center justify-center mt-10 sm:mt-12 md:mt-16 gap-2 sm:gap-4">

        <button
          onClick={prev}
          className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-gray-500 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </button>

        <div ref={cardRef} className="bg-white w-full max-w-[750px] rounded-2xl px-4 sm:px-8 md:px-16 lg:px-28 py-8 sm:py-10">
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-[1.05rem] lg:text-[1.15rem]">
            “{testimonials[index].message}”
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#C98C6B] rounded-full shrink-0"></div>
            <div className="text-left min-w-0">
              <p className="font-semibold text-gray-800 text-sm sm:text-base md:text-[1.2rem] truncate">
                {testimonials[index].name}, {testimonials[index].role}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">{testimonials[index].tag}</p>
            </div>
          </div>
        </div>


        <button
          onClick={next}
          className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#2563EB] rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition"
        >
          <ArrowForwardIosIcon fontSize="small" />
        </button>
      </div>


      <div className="mt-6 flex justify-center px-2">
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-6 overflow-x-auto no-scrollbar w-full max-w-[750px] py-1"
        >
          {testimonials.map((t, i) => (
            <button
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              onClick={() => setIndex(i)}
              className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-4 sm:py-6 bg-white rounded-2xl min-w-[180px] sm:min-w-[220px] md:min-w-[240px] transition-all border shrink-0
                ${
                  i === index
                    ? "scale-105"
                    : "border-gray-200 opacity-40"
                }`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#C98C6B] rounded-full shrink-0"></div>
              <div className="text-left min-w-0">
                <p className="font-medium text-gray-800 text-sm sm:text-base md:text-[1.2rem]">{t.name}</p>
                <p className="text-xs sm:text-[.9rem] text-gray-400">{t.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
