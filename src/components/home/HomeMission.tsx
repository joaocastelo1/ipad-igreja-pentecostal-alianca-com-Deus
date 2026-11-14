import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MissionCard } from "@/components/cards/MissionCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { missionPillars } from "@/data/about";

export function HomeMission() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Nossa missão"
              title={
                <>
                  Uma igreja com <span className="gold-text italic">propósito</span>
                </>
              }
              description="Os pilares que sustentam a nossa caminhada e nos lembram por que existimos como igreja."
            />
          </Reveal>
          <Reveal delay={100} className="shrink-0">
            <Link href="/sobre#missao" className="link-underline">
              Nossa missão completa
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {missionPillars.map((pillar, index) => (
            <MissionCard
              key={pillar.title}
              title={pillar.title}
              description={pillar.description}
              icon={pillar.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
