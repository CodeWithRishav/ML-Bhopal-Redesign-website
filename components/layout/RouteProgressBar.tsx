"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Lightweight, zero-dependency Route Navigation Progress Bar.
 * Provides instant 0ms visual feedback at the top of the viewport when clicking internal links,
 * eliminating the "did I click?" perception lag without blocking rendering or tearing down the DOM.
 */
export function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startProgress = useCallback(() => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    setLoading(true);
    setProgress(25);

    timerRef.current = setTimeout(() => {
      setProgress(65);
      timerRef.current = setTimeout(() => {
        setProgress(85);
      }, 200);
    }, 100);
  }, []);

  const completeProgress = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setProgress(100);
    resetTimerRef.current = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 200);
  }, []);

  // When pathname or searchParams change, navigation is complete
  useEffect(() => {
    completeProgress();
  }, [pathname, searchParams, completeProgress]);

  // Intercept click on internal links for 0ms immediate feedback
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");
      const download = target.getAttribute("download");

      // Ignore external, non-http, target=_blank, download, or hash-only links
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        targetAttr === "_blank" ||
        download !== null ||
        (href.startsWith("http") && !href.startsWith(window.location.origin))
      ) {
        return;
      }

      // Check if it's the exact same URL
      const currentUrl = window.location.pathname + window.location.search;
      if (href === currentUrl) return;

      // Start transition feedback immediately
      startProgress();
    };

    document.addEventListener("click", handleDocumentClick, { capture: true, passive: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      if (timerRef.current) clearTimeout(timerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [startProgress]);

  if (!loading && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[2.5px] bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-google-blue via-google-red via-google-yellow to-google-green transition-all ease-out shadow-[0_0_8px_rgba(26,115,232,0.8)]"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? "150ms" : "250ms",
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}
