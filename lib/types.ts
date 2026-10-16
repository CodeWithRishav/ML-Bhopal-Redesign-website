export interface Event {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  type: string;
  status: string;
  date: string;
  displayDate?: string;
  time?: string;
  location?: string;
  venue: string;
  registrations?: number | null;
  capacity?: number;
  city?: string;
  featured?: boolean;
  edition?: string;
  description: string;
  longDescription?: string;
  image?: string;
  bannerImage?: string;
  gallery?: string[];
  speakers?: string[] | any[];
  collaborators?: string[];
  highlights?: string[];
  schedule?: {
    time: string;
    title: string;
    speaker?: string;
  }[];
  commudleUrl?: string;
  registrationUrl?: string;
  recordingUrl?: string;
  topics?: string[];
  tags?: string[];
}

export interface CampaignTimelineMilestone {
  date: string;
  title: string;
  description: string;
  status?: "completed" | "current" | "upcoming";
}

export interface CampaignSession {
  title: string;
  date: string;
  time?: string;
  format: string;
  speaker?: string;
  registrationUrl?: string;
}

export interface CampaignResource {
  title: string;
  description?: string;
  url: string;
}

export interface CampaignFAQ {
  question: string;
  answer: string;
}

export interface CampaignWhyJoin {
  title: string;
  description: string;
}

export interface CampaignBenefit {
  title: string;
  description: string;
  icon?: string;
}

export interface CampaignMetadata {
  tracks?: string[];
  incentives?: string;
  audience?: string;
  prerequisites?: string;
  tools?: string[];
}

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  status: "active" | "upcoming" | "completed" | string;
  category: string;
  startDate?: string;
  endDate?: string;
  deadline?: string;
  coverImage?: string;
  logo?: string;
  featured?: boolean;
  registrationUrl?: string;
  actionUrl?: string;
  whyJoin?: CampaignWhyJoin[];
  benefits?: CampaignBenefit[];
  timeline?: CampaignTimelineMilestone[];
  events?: CampaignSession[];
  resources?: CampaignResource[];
  faqs?: CampaignFAQ[];
  metadata?: CampaignMetadata;
  // Fallbacks for compatibility
  subtitle?: string;
  tracks?: string[];
  incentives?: string;
  banner?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  company?: string | null;
  bio: string;
  avatar?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  github?: string | null;
}

export interface Partner {
  name: string;
  type: string;
  role?: string | null;
  url?: string | null;
  logo?: string | null;
  photo?: string | null;
  note?: string | null;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: "learn" | "build" | "community" | "articles";
  url: string;
  tags: string[];
  featured?: boolean;
}

export interface ResourceTocItem {
  id: string;
  title: string;
  level?: number;
}

export interface ResourceArticle {
  slug: string;
  title: string;
  category: "Guides" | "Roadmaps" | "Technical Deep Dives" | "Community Recaps";
  description: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  date: string;
  displayDate: string;
  readingTime: string;
  tags: string[];
  tableOfContents?: ResourceTocItem[];
  content: string;
}

