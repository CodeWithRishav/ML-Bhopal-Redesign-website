import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Community Inquiries",
  description:
    "Connect with the ML Bhopal organizing committee for event sponsorship, partnership proposals, keynote nominations, hackathons, or general community questions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact ML Bhopal — Inquiries & Partnerships",
    description:
      "Get in touch with the ML Bhopal team for sponsorship, speaking opportunities, college chapters, or community collaborations.",
    url: "https://mlbhopal.tech/contact",
    type: "website",
    images: [
      {
        url: "/posters/build-with-ai-agents-banner.png",
        width: 1200,
        height: 630,
        alt: "Contact ML Bhopal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact ML Bhopal — Inquiries & Partnerships",
    description:
      "Get in touch with the ML Bhopal team for sponsorship, speaking opportunities, college chapters, or community collaborations.",
    images: ["/posters/build-with-ai-agents-banner.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
