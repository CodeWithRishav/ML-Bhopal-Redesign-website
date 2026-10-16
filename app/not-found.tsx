import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Home, Compass, Search, Calendar, BookOpen } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-20 bg-[#FAFAFA] dark:bg-[#0F172A] transition-colors">
      <Container size="md">
        <div className="relative rounded-2xl bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] p-8 sm:p-14 text-center shadow-card overflow-hidden">
          {/* Google 4-Color Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />

          <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
            {/* 404 Visual Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F0FE] dark:bg-blue-950/40 border border-[#D2E3FC] dark:border-blue-900 text-xs font-semibold text-[#4285F4] dark:text-[#60A5FA] mb-6">
              <Compass className="w-3.5 h-3.5" />
              <span>HTTP 404 — Route Not Located</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] mb-3 tracking-tight">
              Page Not Found
            </h1>

            <p className="text-base text-ink-secondary dark:text-gray-300 font-sans leading-relaxed mb-8">
              The page you are looking for may have been moved, renamed, or is temporarily unavailable. Explore our active community spaces below.
            </p>

            {/* Quick Destination Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8 text-left">
              <Link
                href="/events"
                className="group p-4 rounded-xl border border-[#D1D5DB] dark:border-[#334155] hover:border-[#4285F4] dark:hover:border-[#60A5FA] hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#E8F0FE] dark:bg-blue-950/40 text-[#4285F4] dark:text-[#60A5FA] flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink-primary dark:text-[#F8FAFC] group-hover:text-[#4285F4] dark:group-hover:text-[#60A5FA] transition-colors">
                      Upcoming Events
                    </div>
                    <div className="text-xs text-ink-secondary dark:text-gray-400">
                      Workshops & tech summits
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/resources"
                className="group p-4 rounded-xl border border-[#D1D5DB] dark:border-[#334155] hover:border-[#34A853] dark:hover:border-[#81C995] hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#E6F4EA] dark:bg-green-950/40 text-[#34A853] dark:text-[#81C995] flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink-primary dark:text-[#F8FAFC] group-hover:text-[#34A853] dark:group-hover:text-[#81C995] transition-colors">
                      Knowledge Hub
                    </div>
                    <div className="text-xs text-ink-secondary dark:text-gray-400">
                      Tutorials & code notebooks
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Action Triggers */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <PrimaryButton
                href="/"
                size="md"
                className="w-full sm:w-auto"
                icon={<Home className="w-4 h-4" />}
              >
                Return Home
              </PrimaryButton>

              <SecondaryButton
                href="/contact"
                size="md"
                className="w-full sm:w-auto"
              >
                Contact Support
              </SecondaryButton>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
