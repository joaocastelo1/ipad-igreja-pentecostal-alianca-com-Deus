import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

type ServiceCardProps = {
  service: Service;
  index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <Reveal delay={index * 90} as="article" className="h-full">
      <div
        className={cn(
          "card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 sm:p-7",
          service.highlighted
            ? "border-gold-500/35 bg-gradient-to-b from-gold-500/[0.1] via-navy-900/80 to-navy-950/90 shadow-[0_24px_70px_-40px_rgba(201,164,92,0.5)]"
            : "surface",
        )}
      >
        {service.highlighted ? (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/70 to-transparent"
          />
        ) : null}
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {service.day}
          </span>
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-semibold text-mist">
            {service.time}
          </span>
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-cream sm:text-[1.7rem]">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">
          {service.description}
        </p>
        <div className="mt-6 flex items-center gap-2 border-t border-white/[0.06] pt-4 text-xs text-mist/80">
          <MapPin className="h-3.5 w-3.5 text-gold-500" aria-hidden="true" />
          {service.location}
        </div>
        <div className="mt-2 flex items-center gap-2 text-[11px] text-mist/50">
          <Clock className="h-3 w-3" aria-hidden="true" />
          Confirme o horário pelo WhatsApp
        </div>
      </div>
    </Reveal>
  );
}
