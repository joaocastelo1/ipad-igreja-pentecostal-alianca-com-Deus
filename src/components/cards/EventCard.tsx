import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { formatEventDate } from "@/lib/utils";
import type { EventItem } from "@/types";

type EventCardProps = {
  event: EventItem;
  index: number;
};

export function EventCard({ event, index }: EventCardProps) {
  return (
    <Reveal delay={index * 80} as="article" className="h-full">
      <article
        id={event.slug}
        className="surface card-hover group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-navy-800">
          {event.image ? (
            <Image
              src={event.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0">
              <div className="bg-grid absolute inset-0 opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,164,92,0.16),transparent_60%)]" />
              <CalendarDays
                className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-gold-500/50"
                aria-hidden="true"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-gold-500/25 bg-navy-950/75 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-gold-300 backdrop-blur-md">
            {event.featured ? "Destaque" : "Evento"}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-2xl font-semibold text-cream">
            {event.title}
          </h3>
          <div className="mt-4 space-y-2 text-xs text-mist">
            <p className="flex items-center gap-2">
              <CalendarDays
                className="h-3.5 w-3.5 text-gold-500"
                aria-hidden="true"
              />
              {event.date ? (
                <time dateTime={event.date}>
                  {event.dateLabel ?? formatEventDate(event.date)}
                </time>
              ) : (
                <span>{event.dateLabel ?? "Data a divulgar"}</span>
              )}
            </p>
            <p className="flex items-center gap-2">
              <Clock
                className="h-3.5 w-3.5 text-gold-500"
                aria-hidden="true"
              />
              {event.time}
            </p>
            <p className="flex items-center gap-2">
              <MapPin
                className="h-3.5 w-3.5 text-gold-500"
                aria-hidden="true"
              />
              {event.location}
            </p>
          </div>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-mist">
            {event.description}
          </p>
          <Link
            href={`/eventos#${event.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-400 transition-colors hover:text-gold-200"
          >
            Saiba mais
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
