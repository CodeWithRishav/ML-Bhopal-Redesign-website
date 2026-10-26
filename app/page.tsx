import React from "react";
import { HomeHero } from "@/components/home/HomeHero";
import { CommunityMetrics } from "@/components/home/CommunityMetrics";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { CampaignsSpotlight } from "@/components/home/CampaignsSpotlight";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { AIDaySpotlight } from "@/components/home/AIDaySpotlight";
import { CommunityPeople } from "@/components/home/CommunityPeople";
import { CampusPrograms } from "@/components/home/CampusPrograms";
import { ResourcesPreview } from "@/components/home/ResourcesPreview";
import { EcosystemPartners } from "@/components/home/EcosystemPartners";
import { FinalCTA } from "@/components/home/FinalCTA";
import {
  getActiveCampaigns,
  getUpcomingEvents,
  getPastEvents,
  getTeamMembers,
  getPartners,
  getResources,
} from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "ML Bhopal — AI/ML Community by Google for Developers",
  },
  description:
    "Central India's premier community of 3,600+ AI developers, researchers, and student innovators learning, building, and connecting through applied artificial intelligence.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ML Bhopal — AI/ML Community by Google for Developers",
    description:
      "Central India's premier community of 3,600+ AI developers, researchers, and student innovators learning, building, and connecting through applied artificial intelligence.",
    url: "https://mlbhopal.tech",
    type: "website",
    images: [
      {
        url: "/posters/ml-bhopal-banner.png",
        width: 1200,
        height: 630,
        alt: "ML Bhopal AI Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ML Bhopal — AI/ML Community by Google for Developers",
    description:
      "Central India's premier community of 3,600+ AI developers, researchers, and student innovators learning, building, and connecting through applied artificial intelligence.",
    images: ["/posters/ml-bhopal-banner.png"],
  },
};

export default function HomePage() {
  const campaigns = getActiveCampaigns();
  const upcomingEvents = getUpcomingEvents();
  const recentEvents = getPastEvents().slice(0, 3);
  const team = getTeamMembers();
  const partners = getPartners();
  const resources = getResources();

  return (
    <>
      {/* 1. Hero */}
      <HomeHero />

      {/* 2. Community Metrics */}
      <CommunityMetrics />

      {/* 3. What We Do */}
      <WhatWeDo />

      {/* 4. Current Campaigns (Data-driven) */}
      <CampaignsSpotlight campaigns={campaigns} />

      {/* 5. Upcoming & Recent Events (Data-driven) */}
      <UpcomingEvents upcomingEvents={upcomingEvents} recentEvents={recentEvents} />

      {/* 6. AI Day 2.0 Summit Spotlight */}
      <AIDaySpotlight />

      {/* 7. Community & Leadership */}
      <CommunityPeople team={team} />

      {/* 8. Campus Programs & Ambassadors */}
      <CampusPrograms />

      {/* 9. Developer Resources & Roadmaps */}
      <ResourcesPreview resources={resources} />

      {/* 10. Ecosystem & Academic Partners */}
      <EcosystemPartners partners={partners} />

      {/* 11. Final Conversion CTA */}
      <FinalCTA />
    </>
  );
}
