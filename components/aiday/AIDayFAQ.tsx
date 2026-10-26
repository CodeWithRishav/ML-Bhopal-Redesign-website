"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "When and where was AI Day Bhopal 2.0?",
    answer: "Saturday, May 16, 2026, 9:00 AM to 5:00 PM IST, at LNCT Group of Colleges, Bhopal.",
  },
  {
    question: "What was on the AI Day Bhopal 2.0 agenda?",
    answer: "A keynote, talks on AI agents with Google ADK and Gemini, voice AI and Gemma 4 with open models, a product showcase with live demos, and a Buildathon & Prompt War. See the schedule section above for the full run of show.",
  },
  {
    question: "How did registration work?",
    answer: "Registrations were hosted on the ML Bhopal community page on Commudle, which showed 363 registrations for AI Day Bhopal 2.0.",
  },
  {
    question: "When and where was the 2025 edition?",
    answer: "AI Day Bhopal 2025 was held on March 30, 2025 at the Auditorium Hall, Oriental Institute of Science & Technology (OIST), Bhopal.",
  },
  {
    question: "How can I contact ML Bhopal?",
    answer: "Email contact@mlbhopal.tech or message +91 89698 79979 on WhatsApp.",
  },
];

export function AIDayFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="mb-20">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <HelpCircle className="w-4 h-4 text-google-blue dark:text-[#60A5FA]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA]">
            Frequently Asked Questions
          </span>
        </div>
        <h2 id="faq-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC]">
          AI Day Bhopal FAQ
        </h2>
        <p className="text-sm text-ink-secondary dark:text-gray-400 mt-1 font-sans">
          Quick answers about the AI Day editions.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] overflow-hidden shadow-subtle transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-display font-semibold text-base text-ink-primary dark:text-[#F8FAFC] hover:text-google-blue dark:hover:text-[#60A5FA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-ink-secondary dark:text-gray-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-google-blue dark:text-[#60A5FA]" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-ink-secondary dark:text-gray-300 font-sans leading-relaxed border-t border-gray-100 dark:border-gray-800 animate-in fade-in duration-150">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
