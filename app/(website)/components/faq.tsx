"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const faqs = [
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
    question: "How accurate is the AI health tracking?",
    answer:
      "Experience the future of personalized health and wellness before everyone else. Join our exclusive early access program and help shape the future of AI-powered health coaching.",
  },
  {
    question: "Do I need any special equipment?",
    answer:
      "No special equipment is required. The AI works with your device and optional wearable integrations.",
  },
  {
    question: "How does the free trial work?",
    answer:
      "You get full access during the trial period. You can cancel anytime before billing starts.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(2);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  // GSAP animation
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
    <section className="py-28 bg-[#FCFCFD] text-center">
      {/* Heading */}
      <h2 className="text-[2.4rem] lg:text-[3.2rem] leading-tight font-semibold text-[#1F2937]">
        Frequently Asked <br /> Questions
      </h2>

      <p className="text-gray-500 text-[1.05rem] max-w-md mx-auto mt-3">
        Get answers to common questions about our AI health <br />
        assistant app
      </p>

      {/* FAQ Container */}
      <div className="max-w-5xl mx-auto mt-16 border-t border-gray-200">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-gray-200 py-6">
            {/* Question */}
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between text-left"
            >
              <span
                className={`text-[2rem] font-medium transition ${
                  openIndex === i ? "text-[#3772FF]" : "text-[#111827]"
                }`}
              >
                {faq.question}
              </span>

              <span className="text-[2.5rem] font-light text-gray-600">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>

            {/* Answer Wrapper (GSAP Controlled) */}
            <div
              ref={(el) => {
                contentRefs.current[i] = el;
              }}
              className="overflow-hidden h-0 opacity-0"
            >
              <p className="mt-4 text-gray-500 text-[1.5rem] leading-relaxed text-left">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
