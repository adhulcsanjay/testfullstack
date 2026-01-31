"use client";
import { useState, useRef, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


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
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  // Always keep active button in view
  useEffect(() => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

  return (
    <section className="py-24 bg-[#F4F5F6] text-center">
      {/* Heading */}
      <h2 className="text-[2.4rem] lg:text-[3.2rem] leading-tight font-semibold text-[#1F2937]">
        Our Users Feel the <br /> Transformation
      </h2>
      <p className="text-gray-500 text-[1.05rem] max-w-md mx-auto mt-3">
        Real Stories from People Empowered by Personalized Wellness
      </p>

      {/* Main Card */}
      <div className="relative flex items-center justify-center mt-16">
        {/* Left Button */}
        <button
  onClick={prev}
  className="absolute left-[18%] w-16 h-16 border border-gray-500 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
>
  <ArrowBackIosNewIcon fontSize="small" />
</button>
        {/* Card */}
        <div className="bg-white w-[750px] rounded-2xl px-28 py-10">
          <p className="text-gray-700 leading-relaxed text-[1.15rem]">
            “{testimonials[index].message}”
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-12 h-12 bg-[#C98C6B] rounded-full"></div>
            <div className="text-left">
              <p className="font-semibold text-gray-800 text-[1.2rem]">
                {testimonials[index].name}, {testimonials[index].role}
              </p>
              <p className="text-sm text-gray-400">{testimonials[index].tag}</p>
            </div>
          </div>
        </div>

        {/* Right Button */}
        <button
  onClick={next}
  className="absolute right-[18%] w-16 h-16 bg-[#2563EB] rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition"
>
  <ArrowForwardIosIcon fontSize="small" />
</button>
      </div>

      {/* Bottom Buttons Slider */}
      <div className="mt-6 flex justify-center">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar max-w-[750px] py-1"
        >
          {testimonials.map((t, i) => (
            <button
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              onClick={() => setIndex(i)}
              className={`flex items-center gap-3 px-6 py-6 bg-white rounded-2xl min-w-[240px] transition-all border
                ${
                  i === index
                    ? "scale-105"
                    : "border-gray-200 opacity-40"
                }`}
            >
              <div className="w-12 h-12 bg-[#C98C6B] rounded-full"></div>
              <div className="text-left">
                <p className="font-medium text-gray-800 text-[1.2rem]">{t.name}</p>
                <p className="text-[.9rem] text-gray-400">{t.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
