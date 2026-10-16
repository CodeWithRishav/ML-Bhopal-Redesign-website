"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for diagnostics
    console.error("Runtime error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-20 bg-[#FAFAFA] dark:bg-[#0F172A] transition-colors">
      <Container size="md">
        <div className="relative rounded-2xl bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] p-8 sm:p-14 text-center shadow-card overflow-hidden">
          {/* Google 4-Color Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />

          <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
            {/* Warning Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs font-semibold text-google-red dark:text-red-400 mb-6">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Application Execution Anomaly</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] mb-3 tracking-tight">
              Something went wrong
            </h1>

            <p className="text-sm sm:text-base text-ink-secondary dark:text-gray-300 font-sans leading-relaxed mb-8">
              An unexpected condition interrupted this view. Our team has been notified. You can retry the current operation or return to the main dashboard.
            </p>

            {error.digest && (
              <p className="text-xs font-mono text-gray-400 dark:text-gray-500 mb-6 bg-gray-100 dark:bg-[#0F172A] px-3 py-1 rounded-control border border-gray-200 dark:border-gray-800">
                Digest: {error.digest}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => reset()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-control text-sm font-medium font-sans bg-google-blue hover:bg-google-blue-dark text-white shadow-subtle inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Operation</span>
              </button>

              <SecondaryButton
                href="/"
                size="md"
                className="w-full sm:w-auto"
                icon={<Home className="w-4 h-4" />}
              >
                Return Home
              </SecondaryButton>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
