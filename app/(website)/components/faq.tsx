"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { fetchApi } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

type FaqItem = { _id?: string; question: string; answer: string };

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "What features does the AI Health Assistant offer?",
    answer:
      "Our AI Health Assistant provides personalized wellness plans, health tracking, AI coaching, nutrition guidance, and lifestyle recommendations tailored to your goals.",
  },
  {
    question: "Is the app customizable to my needs?",
    answer:
      "Yes. You can customize goals, routines, reminders, diet preferences, and health priorities to match your lifestyle.",
  },
  {
    question: "How does the free trial work?",
    answer:
      "You get full access during the trial period. You can cancel anytime before billing starts.",
  },
];

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FaqItem[]>(DEFAULT_FAQS);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetchApi("api/faqs");
        const list = await r.json();
        setFaqs(Array.isArray(list) && list.length ? list : DEFAULT_FAQS);
      } catch {
        // keep default
      }
    }
    load();
  }, []);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

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
        listRef.current,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          delay: 0.1,
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

  // GSAP accordion animation
  useEffect(() => {
    contentRefs.current.forEach((el, i) => {
      if (!el) return;

      if (openIndex === i) {
        gsap.to(el, {
          height: el.scrollHeight,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        });
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
      }
    });
  }, [openIndex]);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#FCFCFD] text-center px-4 sm:px-6">

      <h2 ref={headingRef} className="text-[1.75rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3.2rem] leading-tight font-semibold text-[#1F2937]">
        Frequently Asked <br /> Questions
      </h2>

      <p className="text-gray-500 text-sm sm:text-[1.05rem] max-w-md mx-auto mt-3">
        Get answers to common questions about our AI health <br className="hidden sm:block" />
        assistant app
      </p>

      <div ref={listRef} className="max-w-5xl mx-auto mt-10 sm:mt-12 md:mt-16 border-t border-gray-200 px-2 sm:px-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-gray-200 py-4 sm:py-6">
   
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-start sm:items-center justify-between text-left gap-2"
            >
              <span
                className={`text-base sm:text-lg md:text-xl lg:text-[2rem] font-medium transition flex-1 min-w-0 ${
                  openIndex === i ? "text-[#3772FF]" : "text-[#111827]"
                }`}
              >
                {faq.question}
              </span>

              <span className="text-xl sm:text-2xl md:text-[2.5rem] font-light text-gray-600 shrink-0 ml-2">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>


            <div
              ref={(el) => {
                contentRefs.current[i] = el;
              }}
              className="overflow-hidden h-0 opacity-0"
            >
              <p className="mt-4 text-gray-500 text-sm sm:text-base md:text-lg lg:text-[1.5rem] leading-relaxed text-left">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
