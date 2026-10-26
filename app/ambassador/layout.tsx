import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus Ambassador Program — Student AI Leaders",
  description:
    "Represent ML Bhopal at your college campus. Establish a campus chapter, organize hands-on AI workshops, connect students with industry mentors, and lead applied machine learning learning.",
  alternates: {
    canonical: "/ambassador",
  },
  openGraph: {
    title: "Campus Ambassador Program — Lead AI at Your College | ML Bhopal",
    description:
      "Establish an ML Bhopal Campus Chapter at your college. Organize technical workshops, hackathons, and connect students with industry mentors.",
    url: "https://mlbhopal.tech/ambassador",
    type: "website",
    images: [
      {
        url: "/posters/ml-bhopal-banner.png",
        width: 1200,
        height: 630,
        alt: "ML Bhopal Campus Ambassador Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus Ambassador Program — Lead AI at Your College | ML Bhopal",
    description:
      "Establish an ML Bhopal Campus Chapter at your college. Organize technical workshops, hackathons, and connect students with industry mentors.",
    images: ["/posters/ml-bhopal-banner.png"],
  },
};

export default function AmbassadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
