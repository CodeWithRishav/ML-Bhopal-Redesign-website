import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { BackToTop } from "@/components/ui/BackToTop";
import { RouteProgressBar } from "@/components/layout/RouteProgressBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mlbhopal.tech"),
  title: {
    default: "ML Bhopal — AI/ML Community by Google for Developers",
    template: "%s | ML Bhopal",
  },
  description:
    "Central India's premier community of 3,600+ AI developers, researchers, and student innovators learning, building, and connecting through applied artificial intelligence.",
  keywords: [
    "ML Bhopal",
    "AI Bhopal",
    "Google for Developers",
    "TFUG Bhopal",
    "AI Day Bhopal",
    "Central India AI",
    "Machine Learning",
    "Generative AI",
    "Agentic AI",
    "TensorFlow",
    "PyTorch",
  ],
  authors: [{ name: "ML Bhopal Team", url: "https://mlbhopal.tech" }],
  creator: "ML Bhopal",
  publisher: "ML Bhopal",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ML Bhopal — AI/ML Community by Google for Developers",
    description:
      "Central India's premier community of 3,600+ AI developers, researchers, and student innovators learning, building, and connecting through applied artificial intelligence.",
    url: "https://mlbhopal.tech",
    siteName: "ML Bhopal",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/posters/ml-bhopal-banner.png",
        width: 1200,
        height: 630,
        alt: "ML Bhopal — AI Community by Google for Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ML Bhopal — AI/ML Community by Google for Developers",
    description:
      "Central India's premier community of 3,600+ AI developers, researchers, and student innovators learning, building, and connecting through applied artificial intelligence.",
    site: "@ml_bhopal",
    creator: "@ml_bhopal",
    images: ["/posters/ml-bhopal-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ML Bhopal",
  alternateName: ["TFUG Bhopal", "Machine Learning Bhopal"],
  url: "https://mlbhopal.tech",
  logo: "https://mlbhopal.tech/posters/ml-bhopal-banner.png",
  description:
    "Central India's premier community of 3,600+ AI developers, researchers, and student innovators supported by Google for Developers.",
  foundingDate: "2023",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhopal",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.commudle.com/communities/ml-bhopal",
    "https://luma.com/user/mlbhopal",
    "https://www.linkedin.com/company/ml-bhopal",
    "https://x.com/ml_bhopal",
    "https://github.com/ml-bhopal",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('mlbhopal-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = stored ? stored === 'dark' : prefersDark;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-ink-primary dark:bg-[#0F172A] dark:text-[#F8FAFC] font-sans antialiased selection:bg-google-blue-light selection:text-google-blue dark:selection:bg-[#1A3A6E] dark:selection:text-[#60A5FA] flex flex-col relative overflow-x-hidden transition-colors duration-200">
        <ThemeProvider>
          {/* Schema.org Organization Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />

          {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 px-4 py-2 bg-google-blue text-white text-sm font-medium rounded-control shadow-elevation-2 outline-none ring-2 ring-google-blue-dark"
          >
            Skip to main content
          </a>
          {/* Instant route transition feedback indicator */}
          <Suspense fallback={null}>
            <RouteProgressBar />
          </Suspense>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 relative z-10 focus:outline-none">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
