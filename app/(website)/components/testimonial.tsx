"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { fetchApi } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

type TestimonialItem = {
  _id?: string;
  name: string;
  role: string;
  message: string;
  tag?: string;
};

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
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
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [index, setIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetchApi("api/testimonials");
        const list = await r.json();
        setTestimonials(Array.isArray(list) && list.length ? list : DEFAULT_TESTIMONIALS);
      } catch {
        // fallback to default
      }
    }
    load();
  }, []);

  const prev = () =>
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

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
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#F4F5F6] text-center px-4 sm:px-6"
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="text-[1.75rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3.2rem]
                   leading-tight font-semibold text-[#1F2937]"
      >
        Our Users Feel the <br /> Transformation
      </h2>

      <p className="text-gray-500 text-sm sm:text-[1.05rem] max-w-md mx-auto mt-3">
        Real Stories from People Empowered by Personalized Wellness
      </p>

      {/* Card + Arrows */}
      <div
        className="relative flex flex-col md:flex-row items-center justify-center
                   mt-10 sm:mt-12 md:mt-16 gap-4 md:gap-2"
      >
        {/* Left Arrow (md+) */}
        <button
          onClick={prev}
          className="hidden md:flex shrink-0 w-12 h-12 md:w-16 md:h-16
                     border border-gray-500 rounded-full items-center justify-center
                     text-gray-500 hover:bg-gray-100 transition"
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </button>

        {/* Testimonial Card */}
        <div
          ref={cardRef}
          className="bg-white w-full max-w-[750px] rounded-2xl
                     px-4 sm:px-8 md:px-16 lg:px-28
                     py-8 sm:py-10"
        >
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-[1.05rem] lg:text-[1.15rem]">
            “{testimonials[index]?.message ?? ""}”
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#C98C6B] rounded-full shrink-0" />
            <div className="text-left min-w-0">
              <p className="font-semibold text-gray-800 text-sm sm:text-base md:text-[1.2rem] truncate">
                {testimonials[index]?.name}
              </p>
              <p className="font-semibold text-[#909DA2] text-sm sm:text-base md:text-[1rem] truncate">
                {testimonials[index]?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Right Arrow (md+) */}
        <button
          onClick={next}
          className="hidden md:flex shrink-0 w-12 h-12 md:w-16 md:h-16
                     bg-[#2563EB] rounded-full items-center justify-center
                     text-white hover:bg-blue-600 transition"
        >
          <ArrowForwardIosIcon fontSize="small" />
        </button>

        {/* Bottom Arrows (< md) */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-4">
          <button
            onClick={prev}
            className="w-12 h-12 border border-gray-500 rounded-full
                       flex items-center justify-center text-gray-500
                       hover:bg-gray-100 transition"
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </button>

          <button
            onClick={next}
            className="w-12 h-12 bg-[#2563EB] rounded-full
                       flex items-center justify-center text-white
                       hover:bg-blue-600 transition"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-6 flex justify-center px-2">
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-6 overflow-x-auto no-scrollbar
                     w-full max-w-[750px] py-1"
        >
          {testimonials.map((t, i) => (
            <button
              key={t._id ?? i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              
              onClick={() => setIndex(i)}
              className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-4 sm:py-6
                          bg-white rounded-2xl min-w-[180px] sm:min-w-[220px] md:min-w-[240px]
                          transition-all border shrink-0
                          ${
                            i === index
                              ? "scale-105"
                              : "border-gray-200 opacity-40"
                          }`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#C98C6B] rounded-full shrink-0" />
              <div className="text-left min-w-0">
                <p className="font-medium text-gray-800 text-sm sm:text-base md:text-[1.2rem]">
                  {t.name.split(",")[0]}
                </p>
                <p className="text-xs sm:text-[.9rem] text-gray-400">
                  {t.role.split(" ")[0]}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
