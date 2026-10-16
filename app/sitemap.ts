import type { MetadataRoute } from "next";
import { getEvents, getCampaigns, getResourceArticles } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mlbhopal.tech";

  // Static primary routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ai-day`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/campaigns`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/join`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ambassador`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.65,
    },
  ];

  // Dynamic verified event pages
  const events = getEvents();
  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => {
    let lastMod = new Date();
    if (event.date) {
      const parsed = new Date(event.date);
      if (!isNaN(parsed.getTime())) {
        lastMod = parsed;
      }
    }
    const isUpcoming = event.status === "upcoming";
    return {
      url: `${baseUrl}/events/${event.slug}`,
      lastModified: lastMod,
      changeFrequency: isUpcoming ? "daily" : "monthly",
      priority: isUpcoming ? 0.85 : 0.6,
    };
  });

  // Dynamic verified campaign pages
  const campaigns = getCampaigns();
  const campaignRoutes: MetadataRoute.Sitemap = campaigns.map((campaign) => ({
    url: `${baseUrl}/campaigns/${campaign.slug}`,
    lastModified: new Date(),
    changeFrequency: campaign.status === "active" ? "weekly" : "monthly",
    priority: campaign.status === "active" ? 0.8 : 0.6,
  }));

  // Dynamic technical resource guides
  const articles = getResourceArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => {
    let lastMod = new Date();
    if (article.date) {
      const parsed = new Date(article.date);
      if (!isNaN(parsed.getTime())) {
        lastMod = parsed;
      }
    }
    return {
      url: `${baseUrl}/resources/${article.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.75,
    };
  });

  return [...staticRoutes, ...eventRoutes, ...campaignRoutes, ...articleRoutes];
}
