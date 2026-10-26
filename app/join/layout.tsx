import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Core Team — Volunteer Opportunities",
  description:
    "Become a community organizer or volunteer with ML Bhopal. Help coordinate developer meetups, manage hackathons, lead technical workshops, and empower 3,600+ AI builders.",
  alternates: {
    canonical: "/join",
  },
  openGraph: {
    title: "Join the Core Team — Volunteer with ML Bhopal",
    description:
      "Become a community organizer or volunteer with ML Bhopal. Help coordinate developer meetups, manage hackathons, and lead technical workshops.",
    url: "https://mlbhopal.tech/join",
    type: "website",
    images: [
      {
        url: "/posters/ml-bhopal-banner.png",
        width: 1200,
        height: 630,
        alt: "Join ML Bhopal Core Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the Core Team — Volunteer with ML Bhopal",
    description:
      "Become a community organizer or volunteer with ML Bhopal. Help coordinate developer meetups, manage hackathons, and lead technical workshops.",
    images: ["/posters/ml-bhopal-banner.png"],
  },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
