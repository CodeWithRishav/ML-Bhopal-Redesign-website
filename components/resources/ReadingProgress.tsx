"use client";

import React, { useEffect, useState } from "react";

export function ReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentProgress = window.scrollY;
          const scrollHeight = document.body.scrollHeight - window.innerHeight;
          if (scrollHeight > 0) {
            const nextPercent = Number(((currentProgress / scrollHeight) * 100).toFixed(1));
            setCompletion((prev) => (Math.abs(prev - nextPercent) >= 0.2 ? nextPercent : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuenow={Math.round(completion)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50 pointer-events-none"
    >
      <div
        className="h-full bg-google-blue transition-all duration-75 ease-out shadow-[0_0_8px_rgba(26,115,232,0.6)]"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}
