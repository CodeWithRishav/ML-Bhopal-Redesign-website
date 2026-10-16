import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text || "";
  return text.slice(0, maxLength).trim() + "...";
}

export function getEventImage(type?: string, image?: string, bannerImage?: string): string {
  if (image) return image;
  if (bannerImage) return bannerImage;
  const t = type?.toLowerCase();
  switch (t) {
    case "flagship":
      return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200";
    case "conference":
      return "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200";
    case "hackathon":
      return "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200";
    case "workshop":
      return "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200";
    case "meetup":
    default:
      return "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200";
  }
}
