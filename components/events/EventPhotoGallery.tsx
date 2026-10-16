"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Expand } from "lucide-react";
import { LightboxModal } from "@/components/ui/LightboxModal";

interface PhotoItem {
  src: string;
  alt: string;
  caption?: string;
}

interface EventPhotoGalleryProps {
  eventTitle: string;
  photos?: PhotoItem[];
}

const DEFAULT_GALLERY: PhotoItem[] = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200",
    alt: "Keynote presentation at ML Bhopal summit",
    caption: "Opening keynote and community technical presentation",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200",
    alt: "Builders collaborating during hands-on code sprint",
    caption: "Developers pair programming on fine-tuning workflows",
  },
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200",
    alt: "Audience engaging in speaker Q&A",
    caption: "Live architecture Q&A session with attendees",
  },
  {
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200",
    alt: "Community closing group photo",
    caption: "Mentors, student leads, and builders at session close",
  },
];

export function EventPhotoGallery({ eventTitle, photos }: EventPhotoGalleryProps) {
  const gallery = photos && photos.length > 0 ? photos : DEFAULT_GALLERY;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-google-blue dark:text-[#60A5FA]" />
          <h2 className="text-lg font-display font-semibold text-ink-primary dark:text-[#F8FAFC]">
            Chronicle & Session Highlights
          </h2>
        </div>
        <span className="text-xs text-ink-secondary font-sans">
          Click any photo to enlarge
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {gallery.map((photo, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => openLightbox(idx)}
            className="group relative aspect-4/3 rounded-card overflow-hidden border border-[#D1D5DB] dark:border-[#334155] bg-gray-100 dark:bg-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue"
            aria-label={`View photo: ${photo.caption || photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand className="w-4 h-4" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={gallery}
        currentIndex={currentIndex}
        onNavigate={setCurrentIndex}
      />
    </section>
  );
}
