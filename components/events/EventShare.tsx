"use client";

import React, { useState, useRef, useEffect } from "react";
import { Share2, Check, Copy, ChevronDown, ExternalLink } from "lucide-react";

interface EventShareProps {
  title: string;
  url?: string;
  description?: string;
  className?: string;
}

export function EventShare({ title, url, description, className = "" }: EventShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [shareUrl, setShareUrl] = useState(url || "");

  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [url]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleShareClick = async () => {
    // If mobile native share is available, try it first
    if (typeof navigator !== "undefined" && navigator.share && window.innerWidth < 768) {
      try {
        await navigator.share({
          title,
          text: `Join ${title} by ML Bhopal!`,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to dropdown
      }
    }
    setIsOpen(!isOpen);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    } catch {
      // Fallback
    }
  };

  const shareText = `Check out "${title}" hosted by ML Bhopal:`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className={`relative inline-block text-left ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={handleShareClick}
        className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium font-sans text-ink-primary dark:text-[#F8FAFC] bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] rounded-control hover:bg-[#FAFAFA] dark:hover:bg-[#1E293B] hover:border-google-blue dark:hover:border-[#60A5FA] shadow-subtle transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Share event"
      >
        <Share2 className="w-3.5 h-3.5 text-google-blue dark:text-[#60A5FA]" />
        <span>Share</span>
        <ChevronDown className={`w-3.5 h-3.5 text-ink-secondary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-48 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-elevation-2 z-30 py-1 divide-y divide-gray-100 dark:divide-gray-800 animate-in fade-in zoom-in-95 duration-150">
          <div className="py-1">
            <button
              type="button"
              onClick={copyToClipboard}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-ink-primary dark:text-[#F8FAFC] hover:bg-gray-50 dark:hover:bg-[#1E293B] transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-google-green" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-ink-secondary" />
                )}
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </div>
            </button>
          </div>

          <div className="py-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3.5 py-2 text-xs text-ink-primary dark:text-[#F8FAFC] hover:bg-gray-50 dark:hover:bg-[#1E293B] transition-colors"
            >
              <span>WhatsApp</span>
              <ExternalLink className="w-3 h-3 text-ink-secondary" />
            </a>

            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3.5 py-2 text-xs text-ink-primary dark:text-[#F8FAFC] hover:bg-gray-50 dark:hover:bg-[#1E293B] transition-colors"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-ink-secondary" />
            </a>

            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3.5 py-2 text-xs text-ink-primary dark:text-[#F8FAFC] hover:bg-gray-50 dark:hover:bg-[#1E293B] transition-colors"
            >
              <span>X (Twitter)</span>
              <ExternalLink className="w-3 h-3 text-ink-secondary" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
