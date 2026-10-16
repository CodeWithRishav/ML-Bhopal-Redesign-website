"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Is admission to AI Day completely free?",
    answer: "Yes, 100% free of charge. Supported by Google for Developers and our academic partners, tickets, mentor sessions, and compute access are provided at zero cost to registered attendees.",
  },
  {
    question: "Who can attend AI Day Bhopal?",
    answer: "Developers, university students, researchers, startup founders, and engineering faculty from Central India and beyond are welcome. Learning tracks span foundational AI to advanced LLMOps.",
  },
  {
    question: "What prerequisites or hardware should I bring?",
    answer: "Please bring a laptop with its charger, a valid student or government photo ID, and pre-install Python 3.10+. If participating in the AI-Thon sprint, ensure you have git and Docker installed.",
  },
  {
    question: "How do I claim my verified attendance credential?",
    answer: "Checked-in attendees receive a verifiable digital certificate issued directly through Commudle after the event conclusion, which can be linked directly on LinkedIn.",
  },
  {
    question: "How can college chapters or clubs get involved?",
    answer: "Campus leads can apply through our Campus Ambassador Program to host pre-events, organize bus cohorts, or formalize an institutional MoU with ML Bhopal.",
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
          Everything You Need to Know
        </h2>
        <p className="text-sm text-ink-secondary dark:text-gray-400 mt-1 font-sans">
          Key guidelines on admission, hardware requirements, and team participation.
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
