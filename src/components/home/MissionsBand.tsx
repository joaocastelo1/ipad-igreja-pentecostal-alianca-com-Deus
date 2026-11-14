import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe2, HandHeart, Megaphone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";

const pillars = [
  { icon: Megaphone, label: "Evangelismo" },
  { icon: Globe2, label: "Missões" },
  { icon: HandHeart, label: "Ação social" },
];

export function MissionsBand() {
  return (
    <section className="relative isolate overflow-hidden border-y border-gold-500/20">
      <Image
        src="/images/igreja/igreja-familia.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40"
      />
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-25"
      />

      <div className="container-page relative py-20 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">Evangelismo e missões</span>
            <h2 className="display-title mt-5 text-[clamp(2.6rem,6vw,4.8rem)] text-cream">
              Levando o Evangelho{" "}
              <span className="gold-text italic">
                além das paredes da igreja
              </span>
            </h2>
            <p className="text-pretty mt-6 max-w-2xl text-base leading-relaxed text-sand/90 sm:text-lg">
              Nossa missão é anunciar Jesus, alcançar vidas e levar esperança
              através do evangelismo e das missões.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/missoes" className="btn btn-primary">
              Conheça nossas missões
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/sobre" className="btn btn-outline">
              Nossa história
            </Link>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:mt-16 lg:max-w-2xl">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <div
                  key={pillar.label}
                  className="flex items-center gap-3 bg-navy-950/80 px-5 py-4 backdrop-blur-md"
                >
                  <Icon
                    className="h-4 w-4 shrink-0 text-gold-300"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-sand">
                    {pillar.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-8 font-display text-lg italic text-gold-300/80">
            “{siteConfig.verses.mission.text}” —{" "}
            {siteConfig.verses.mission.reference}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
