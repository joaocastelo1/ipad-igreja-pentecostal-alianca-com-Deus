import {
  BookOpen,
  Flame,
  Globe2,
  HandHeart,
  HeartHandshake,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { MissionIcon } from "@/types";

const icons: Record<MissionIcon, LucideIcon> = {
  prayer: HandHeart,
  word: BookOpen,
  fire: Flame,
  evangelism: Megaphone,
  missions: Globe2,
  family: HeartHandshake,
};

type MissionCardProps = {
  title: string;
  description: string;
  icon: MissionIcon;
  index: number;
};

export function MissionCard({
  title,
  description,
  icon,
  index,
}: MissionCardProps) {
  const Icon = icons[icon];

  return (
    <Reveal delay={index * 70} as="article" className="h-full">
      <div className="surface card-hover group relative h-full overflow-hidden rounded-2xl p-6 sm:p-7">
        <span
          aria-hidden="true"
          className="absolute -right-6 -top-7 font-display text-8xl font-semibold text-white/[0.035]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="relative">
          <div className="grid h-12 w-12 place-items-center rounded-xl border border-gold-500/25 bg-gradient-to-br from-gold-500/15 to-transparent text-gold-300 transition-colors duration-300 group-hover:border-gold-400/50 group-hover:text-gold-200">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mt-6 font-display text-2xl font-semibold text-cream">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            {description}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
    </Reveal>
  );
}
