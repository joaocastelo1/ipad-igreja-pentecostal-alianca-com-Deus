import Image from "next/image";
import { Flame, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { Pastor } from "@/types";

type PastorCardProps = {
  pastor: Pastor;
  index: number;
};

export function PastorCard({ pastor, index }: PastorCardProps) {
  return (
    <Reveal delay={index * 120} as="article" className="h-full">
      <div className="surface card-hover group relative h-full overflow-hidden rounded-[1.75rem]">
        <div className="portrait-grain relative aspect-[20/23] overflow-hidden bg-navy-900">
          {pastor.image ? (
            <>
              <Image
                src={pastor.image}
                alt={`${pastor.role} ${pastor.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent"
              />
            </>
          ) : (
            <div className="absolute inset-0">
              <div className="bg-grid absolute inset-0 opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(201,164,92,0.16),transparent_55%)]" />
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/20"
              />
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/20"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Flame
                  className="h-8 w-8 text-fire-400/70"
                  aria-hidden="true"
                />
                <span className="mt-4 font-display text-[7rem] font-semibold leading-none text-gold-300/85 sm:text-[8rem]">
                  {pastor.monogram}
                </span>
                <span className="mt-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-mist/50">
                  Retrato em breve
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950/80 to-transparent" />
            </div>
          )}
          <div className="absolute left-5 top-5 rounded-full border border-gold-500/25 bg-navy-950/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-300 backdrop-blur-md">
            {pastor.role}
          </div>
          <Sparkles
            className="absolute right-5 top-5 h-4 w-4 text-gold-500/50"
            aria-hidden="true"
          />
        </div>

        <div className="relative p-6 sm:p-8">
          <h3 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
            {pastor.role} {pastor.name}
          </h3>
          <p className="text-pretty mt-4 text-sm leading-relaxed text-mist">
            {pastor.bio}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
