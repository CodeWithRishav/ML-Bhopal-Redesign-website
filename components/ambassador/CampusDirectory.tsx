"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, GraduationCap, MapPin, CheckCircle2, Building2, ArrowRight } from "lucide-react";

interface CampusItem {
  id: string;
  name: string;
  shortName: string;
  location: string;
  logo: string;
  status?: "Host Campus" | "MoU Partner";
  highlights: string[];
  established: string;
}

const VERIFIED_CAMPUSES: CampusItem[] = [
  {
    id: "lnct",
    name: "Lakshmi Narain College of Technology",
    shortName: "LNCT Bhopal",
    location: "Kalchuri Nagar, Bhopal",
    logo: "/logos/partners/lnct.svg",
    status: "Host Campus",
    highlights: ["Venue partner for AI Day 2.0 & AI Day 1.0", "500+ active student builders", "Dedicated compute labs"],
    established: "2024",
  },
  {
    id: "oriental",
    name: "Oriental Institute of Science & Technology",
    shortName: "OIST Bhopal",
    location: "Oriental Campus, Raisen Rd, Bhopal",
    logo: "/logos/partners/oriental.svg",
    highlights: ["Hands-on TensorFlow & RAG codelabs", "Active student ambassador board", "Regular study circles"],
    established: "2024",
  },
  {
    id: "manit",
    name: "Maulana Azad National Institute of Technology",
    shortName: "MANIT Bhopal",
    location: "Link Road Number 3, Bhopal",
    logo: "/logos/partners/manit.svg",
    status: "MoU Partner",
    highlights: ["Premier NIT research collaboration", "Advanced algorithm & LLM study cohorts", "Technical mentorship"],
    established: "2024",
  },
  {
    id: "iiit-bhopal",
    name: "Indian Institute of Information Technology",
    shortName: "IIIT Bhopal",
    location: "MANIT Campus, Bhopal",
    logo: "/logos/partners/iiit-bhopal.svg",
    status: "MoU Partner",
    highlights: ["Open weights research collaboration", "JAX/Flax foundation model pods", "Hackathon finalists"],
    established: "2024",
  },
  {
    id: "rgpv",
    name: "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
    shortName: "UIT-RGPV",
    location: "Airport Road, Gandhi Nagar, Bhopal",
    logo: "/logos/partners/rgpv.svg",
    status: "Host Campus",
    highlights: ["State technological university hub", "Central India developer outreach", "Cloud compute sessions"],
    established: "2024",
  },
  {
    id: "tit",
    name: "Technocrats Institute of Technology",
    shortName: "TIT Group",
    location: "Anand Nagar, Bhopal",
    logo: "/logos/partners/tit.svg",
    highlights: ["Applied AI workshops & hack sprints", "Active student core committee", "Inter-college cohorts"],
    established: "2024",
  },
];

export function CampusDirectory({
  onSelectCampus,
}: {
  onSelectCampus?: (campusName: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredCampuses = useMemo(() => {
    return VERIFIED_CAMPUSES.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || c.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const handleNominate = (campusName: string) => {
    if (onSelectCampus) {
      onSelectCampus(campusName);
    }
    const applySection = document.getElementById("apply");
    if (applySection) {
      applySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getStatusBadge = (status: NonNullable<CampusItem["status"]>) => {
    switch (status) {
      case "Host Campus":
        return "bg-google-blue-light text-google-blue dark:bg-blue-950/40 dark:text-[#60A5FA] border-blue-200 dark:border-blue-800";
      case "MoU Partner":
        return "bg-google-yellow-light text-amber-700 dark:bg-amber-950/40 dark:text-[#FDD663] border-amber-200 dark:border-amber-800";
    }
  };

  return (
    <section id="campuses" aria-labelledby="campuses-heading" className="mb-20 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-google-blue dark:text-[#60A5FA] block mb-1">
            Collegiate Network
          </span>
          <h2 id="campuses-heading" className="text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] tracking-tight">
            Participating Campuses
          </h2>
          <p className="text-sm text-ink-secondary dark:text-gray-400 mt-1 max-w-xl font-sans">
            Campuses across Bhopal where ML Bhopal events and codelabs take place.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-ink-secondary dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by college or city..."
              className="pl-9 pr-3 py-1.5 text-xs font-sans rounded-control border border-[#D1D5DB] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-ink-primary dark:text-[#F8FAFC] placeholder:text-ink-secondary dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-google-blue"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {["all", "Host Campus", "MoU Partner"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium font-sans whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === status
                    ? "bg-google-blue text-white dark:bg-[#60A5FA] dark:text-[#0F172A]"
                    : "bg-[#F1F3F4] dark:bg-[#1E293B] text-ink-secondary dark:text-gray-300 hover:text-ink-primary dark:hover:text-white"
                }`}
              >
                {status === "all" ? "All Campuses" : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredCampuses.length === 0 ? (
        <div className="p-12 text-center rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155]">
          <GraduationCap className="w-8 h-8 text-ink-secondary mx-auto mb-2 opacity-50" />
          <p className="text-sm font-medium text-ink-primary dark:text-[#F8FAFC]">
            No participating campuses found matching &quot;{searchTerm}&quot;
          </p>
          <p className="text-xs text-ink-secondary dark:text-gray-400 mt-1">
            Don&apos;t see your college? You can be the first to launch a chapter!
          </p>
          <button
            type="button"
            onClick={() => handleNominate("")}
            className="mt-4 px-4 py-2 bg-google-blue text-white rounded-control text-xs font-medium hover:bg-google-blue-dark transition-colors"
          >
            Apply to Launch Your Campus Chapter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampuses.map((campus) => (
            <div
              key={campus.id}
              className="flex flex-col p-6 rounded-card bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] shadow-subtle hover:shadow-elevation-2 hover:border-google-blue dark:hover:border-[#60A5FA] transition-all group"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-control bg-gray-50 dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] p-1.5 shrink-0 flex items-center justify-center">
                  <Image
                    src={campus.logo}
                    alt={campus.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                {campus.status && (
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${getStatusBadge(
                      campus.status
                    )}`}
                  >
                    {campus.status}
                  </span>
                )}
              </div>

              <h3 className="text-base font-display font-semibold text-ink-primary dark:text-[#F8FAFC] group-hover:text-google-blue dark:group-hover:text-[#60A5FA] transition-colors mb-1 line-clamp-1">
                {campus.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-ink-secondary dark:text-gray-400 font-sans mb-4">
                <MapPin className="w-3.5 h-3.5 text-google-red shrink-0" />
                <span className="truncate">{campus.location}</span>
              </div>

              <div className="space-y-1.5 flex-1 mb-5">
                {campus.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-ink-secondary dark:text-gray-300 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-google-green shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#D1D5DB] dark:border-[#334155] flex items-center justify-between mt-auto">
                <span className="text-[11px] text-ink-secondary dark:text-gray-400">
                  Chapter Since {campus.established}
                </span>
                <button
                  type="button"
                  onClick={() => handleNominate(campus.name)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-google-blue dark:text-[#60A5FA] hover:underline"
                >
                  <span>Apply as Lead</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
