import eventsData from "@/content/events.json";
import teamData from "@/content/team.json";
import partnersData from "@/content/partners.json";
import campaignsData from "@/content/campaigns.json";
import resourcesArticlesData from "@/content/resources.json";
import { Event, Campaign, TeamMember, Partner, ResourceItem, ResourceArticle } from "./types";

export function getEvents(): Event[] {
  return (eventsData as unknown) as Event[];
}

export function getFeaturedEvents(): Event[] {
  return getEvents().filter((e) => e.featured);
}

export function getUpcomingEvents(): Event[] {
  const upcoming = getEvents().filter((e) => e.status.toLowerCase() === "upcoming");
  if (upcoming.length > 0) return upcoming;
  // If all are marked past, show the top 3 events as featured spotlight
  return getEvents().slice(0, 3);
}

export function getPastEvents(): Event[] {
  return getEvents().filter((e) => e.status.toLowerCase() === "past");
}

export function getEventBySlug(slug: string): Event | undefined {
  return getEvents().find((e) => e.slug === slug);
}

export function getRelatedEvents(currentSlug: string, type?: string, limit = 3): Event[] {
  const all = getEvents().filter((e) => e.slug !== currentSlug);
  if (!type) return all.slice(0, limit);
  const sameType = all.filter((e) => e.type?.toLowerCase() === type.toLowerCase());
  if (sameType.length >= limit) return sameType.slice(0, limit);
  const others = all.filter((e) => e.type?.toLowerCase() !== type.toLowerCase());
  return [...sameType, ...others].slice(0, limit);
}

export function getAIDayEvents(): Event[] {
  return getEvents().filter(
    (e) => e.slug.includes("ai-day") || e.title.toLowerCase().includes("ai day")
  );
}

export function getCampaigns(): Campaign[] {
  return (campaignsData as unknown) as Campaign[];
}

export function getFeaturedCampaign(): Campaign | undefined {
  return getCampaigns().find((c) => c.featured) || getCampaigns().find((c) => c.status.toLowerCase() === "active") || getCampaigns()[0];
}

export function getActiveCampaigns(): Campaign[] {
  return getCampaigns().filter((c) => c.status.toLowerCase() === "active");
}

export function getUpcomingCampaigns(): Campaign[] {
  return getCampaigns().filter((c) => c.status.toLowerCase() === "upcoming");
}

export function getCompletedCampaigns(): Campaign[] {
  return getCampaigns().filter((c) => c.status.toLowerCase() === "completed");
}

export function getCampaignBySlug(slug: string): Campaign | undefined {
  return getCampaigns().find((c) => c.slug === slug);
}

export function getTeamMembers(): TeamMember[] {
  const data = teamData as { leads?: TeamMember[]; core?: TeamMember[] };
  return [...(data.leads || []), ...(data.core || [])];
}

export function getTeamLeads(): TeamMember[] {
  const data = teamData as { leads?: TeamMember[] };
  return data.leads || [];
}

export function getCoreTeam(): TeamMember[] {
  const data = teamData as { core?: TeamMember[] };
  return data.core || [];
}

export function getPartners(): Partner[] {
  const data = partnersData as { current?: Partner[]; past?: Partner[] };
  const all = [...(data.current || []), ...(data.past || [])];
  const seen = new Set<string>();
  return all.filter((p) => {
    if (seen.has(p.name)) return false;
    seen.add(p.name);
    return true;
  });
}

export function getPartnersFullData() {
  return partnersData;
}

export function getAcademicPartners(): Partner[] {
  const data = partnersData as { academic?: Partner[] };
  return data.academic || [];
}

export function getCommunityPartners(): Partner[] {
  const data = partnersData as { community?: Partner[] };
  return data.community || [];
}

export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: "res-1",
    title: "Gemma 2 Fine-Tuning Cookbook",
    description: "Production guide for instruction fine-tuning Google Gemma with LoRA, Unsloth, and PyTorch.",
    category: "build",
    url: "/resources/gemma-fine-tuning-guide",
    tags: ["Gemma", "PyTorch", "LoRA", "GenAI"],
    featured: true,
  },
  {
    id: "res-2",
    title: "Production RAG Architecture Blueprint",
    description: "End-to-end retrieval-augmented generation pipeline with hybrid dense-sparse search and Ragas evaluation.",
    category: "build",
    url: "/resources/rag-evaluation-deep-dive",
    tags: ["RAG", "Vector DB", "Qdrant", "Evaluation"],
    featured: true,
  },
  {
    id: "res-3",
    title: "Zero to Production AI Engineering Roadmap",
    description: "Curated learning curriculum built by ML Bhopal leads for mastering foundational ML and modern LLMOps.",
    category: "learn",
    url: "/resources/zero-to-production-ai-roadmap",
    tags: ["Roadmap", "Python", "Deep Learning", "Agents"],
    featured: true,
  },
  {
    id: "res-4",
    title: "Official Commudle Chapter Hub",
    description: "Join the verified ML Bhopal chapter to claim tickets, join community chats, and receive talk updates.",
    category: "community",
    url: "https://commudle.com/communities/ml-bhopal",
    tags: ["Commudle", "RSVP", "Community"],
    featured: true,
  },
];

export function getResources(): ResourceItem[] {
  return RESOURCES_DATA;
}

export function getResourceArticles(): ResourceArticle[] {
  return (resourcesArticlesData as unknown) as ResourceArticle[];
}

export function getResourceArticleBySlug(slug: string): ResourceArticle | undefined {
  return getResourceArticles().find((a) => a.slug === slug);
}

export function getRelatedResourceArticles(slug: string, category?: string, limit = 3): ResourceArticle[] {
  const all = getResourceArticles().filter((a) => a.slug !== slug);
  if (!category) return all.slice(0, limit);
  const sameCategory = all.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = all.filter((a) => a.category.toLowerCase() !== category.toLowerCase());
  return [...sameCategory, ...others].slice(0, limit);
}

