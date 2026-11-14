import {
  ArrowUpRight,
  BookOpen,
  Globe2,
  HandHeart,
  HeartHandshake,
  Megaphone,
  Music,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { getMinistryWhatsAppLink } from "@/lib/whatsapp";
import type { Ministry, MinistryIcon } from "@/types";

const icons: Record<MinistryIcon, LucideIcon> = {
  megaphone: Megaphone,
  globe: Globe2,
  "hand-heart": HandHeart,
  music: Music,
  sparkles: Sparkles,
  users: Users,
  "book-open": BookOpen,
  "heart-handshake": HeartHandshake,
};

type MinistryCardProps = {
  ministry: Ministry;
  index: number;
};

export function MinistryCard({ ministry, index }: MinistryCardProps) {
  const Icon = icons[ministry.icon];

  return (
    <Reveal delay={(index % 4) * 60} as="article" className="h-full">
      <div
        id={ministry.slug}
        className="surface card-hover group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl p-6 sm:p-7"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold-500/[0.06] blur-2xl transition-opacity duration-500 group-hover:bg-gold-500/[0.12]"
        />
        <div className="flex items-start justify-between gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.06] text-gold-300">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          {ministry.verse ? (
            <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1 text-[10px] font-medium tracking-wide text-mist/70">
              {ministry.verse}
            </span>
          ) : null}
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-cream">
          {ministry.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">
          {ministry.description}
        </p>
        <a
          href={getMinistryWhatsAppLink(ministry.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-400 transition-colors hover:text-gold-200"
        >
          Quero saber mais
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
          <span className="sr-only"> sobre o ministério de {ministry.name}</span>
        </a>
      </div>
    </Reveal>
  );
}
