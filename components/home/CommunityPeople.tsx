import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

const frame =
  "relative overflow-hidden border border-[#D1D5DB] dark:border-[#334155] bg-slate-900 group";
const caption =
  "absolute bottom-3 left-3 text-[10px] font-mono font-semibold uppercase tracking-widest text-white";

export function CommunityPeople() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-[#FAFAFA] dark:bg-[#0F172A] border-b border-[#D1D5DB] dark:border-[#334155] transition-colors">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-10 lg:gap-20 items-center">
          {/* Text */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary dark:text-[#FF9A3D] mb-4 block">
              THE PEOPLE BEHIND THE COMMUNITY
            </span>

            <h2 className="font-display font-black tracking-tight text-ink-primary dark:text-[#F8FAFC] text-4xl sm:text-5xl lg:text-6xl leading-[0.96] uppercase mb-6">
              Built by Volunteers<span className="text-google-red">.</span> <br />
              <span className="text-google-blue dark:text-[#60A5FA]">Driven by Curiosity</span>
              <span className="text-google-red">.</span>
            </h2>

            <p className="text-sm sm:text-base text-ink-secondary dark:text-[#94A3B8] font-sans leading-relaxed mb-8 max-w-md">
              ML Bhopal is powered by people who believe in learning together and building together. From organising events and sharing knowledge to mentoring newcomers and creating opportunities, our community grows through the time, ideas and efforts of people who contribute.
            </p>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
              <PrimaryButton
                href="/team"
                size="lg"
                className="w-full sm:w-auto uppercase tracking-wider text-xs"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Meet the Team
              </PrimaryButton>
              <SecondaryButton
                href="/join"
                size="lg"
                className="w-full sm:w-auto uppercase tracking-wider text-xs"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Become a Volunteer
              </SecondaryButton>
            </div>
          </div>

          {/* Collage */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="relative w-full max-w-xl mx-auto md:max-w-none pb-16 sm:pb-20 pr-0">
              <div className={`${frame} w-[88%] aspect-[16/10] rounded-2xl shadow-elevation-2`}>
                <Image
                  src="/images/ai-day/full-house-2025.jpg"
                  alt="Volunteers, speakers and attendees posing together on the floor of the auditorium at AI Day Bhopal 2025"
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 560px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className={caption}>COMMUNITY</span>
              </div>

              <div
                className={`${frame} absolute right-0 top-[38%] w-[46%] aspect-[4/3] rounded-xl shadow-elevation-3 z-10`}
              >
                <Image
                  src="/images/ai-day/anubhav-talk.jpg"
                  alt="A speaker presenting at a podium on the stage at AI Day Bhopal 2025"
                  fill
                  sizes="(max-width: 768px) 45vw, 260px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className={caption}>COLLABORATION</span>
              </div>

              <div
                className={`${frame} absolute left-[6%] bottom-0 w-[42%] aspect-[4/3] rounded-xl shadow-elevation-3 z-20`}
              >
                <Image
                  src="/images/ai-day/vertex-ai-walkthrough.jpg"
                  alt="Two volunteers at the podium with a laptop during a Vertex AI walkthrough at AI Day Bhopal 2025"
                  fill
                  sizes="(max-width: 768px) 40vw, 240px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className={caption}>BUILDING TOGETHER</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
