import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { PastorCard } from "@/components/cards/PastorCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pastorMessage, pastorPhotoNote, pastors } from "@/data/pastors";

export function HomePastors() {
  return (
    <section className="section relative overflow-hidden border-y border-white/5 bg-navy-950/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-[26rem] w-[26rem] rounded-full bg-gold-500/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-navy-700/40 blur-3xl"
      />
      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Liderança"
            title={
              <>
                Pastores <span className="gold-text italic">Pedro e Simone</span>
              </>
            }
            description="Chamados para servir, ensinar a Palavra e conduzir vidas a uma caminhada de fé em Jesus Cristo."
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8">
          {pastors.map((pastor, index) => (
            <PastorCard key={pastor.id} pastor={pastor} index={index} />
          ))}
        </div>

        <Reveal delay={140}>
          <div className="surface mt-8 grid items-center gap-8 rounded-[1.5rem] p-7 sm:p-9 lg:grid-cols-[1.3fr_0.7fr] lg:p-10">
            <div className="relative pl-6">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gold-500/50 to-transparent"
              />
              <Quote
                className="h-6 w-6 text-gold-500/65"
                aria-hidden="true"
              />
              <blockquote className="mt-3 font-display text-2xl leading-snug text-cream sm:text-3xl">
                “{pastorMessage}”
              </blockquote>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-400">
                Pastores Pedro e Simone
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <Link href="/pastores" className="btn btn-primary w-full sm:w-auto">
                Conheça os pastores
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="text-[11px] leading-relaxed text-mist/50 lg:text-right">
                {pastorPhotoNote}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
