import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  HandHeart,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function QuickInfo() {
  return (
    <section aria-label="Informações rápidas" className="relative z-20 -mt-4 pb-8 sm:-mt-6">
      <div className="container-page">
        <div className="surface grid overflow-hidden rounded-2xl sm:grid-cols-2 xl:grid-cols-4">
          <Link
            href="/cultos"
            className="group flex items-center gap-4 border-b border-white/[0.06] px-5 py-5 transition-colors hover:bg-white/[0.025] sm:px-6 xl:border-b-0 xl:border-r"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold-500/20 bg-gold-500/[0.06] text-gold-300">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                Cultos
              </span>
              <span className="mt-1 block truncate text-sm font-medium text-sand">
                {services.map((service) => service.day.replace("-feira", ""))
                  .join(" · ")}
              </span>
            </span>
            <ArrowUpRight
              className="ml-auto h-4 w-4 shrink-0 text-mist/40 transition-colors group-hover:text-gold-300"
              aria-hidden="true"
            />
          </Link>

          <a
            href={siteConfig.map.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border-b border-white/[0.06] px-5 py-5 transition-colors hover:bg-white/[0.025] sm:px-6 xl:border-b-0 xl:border-r"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold-500/20 bg-gold-500/[0.06] text-gold-300">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                Onde estamos
              </span>
              <span className="mt-1 block truncate text-sm font-medium text-sand">
                {siteConfig.location}
              </span>
            </span>
            <ArrowUpRight
              className="ml-auto h-4 w-4 shrink-0 text-mist/40 transition-colors group-hover:text-gold-300"
              aria-hidden="true"
            />
          </a>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border-b border-white/[0.06] px-5 py-5 transition-colors hover:bg-white/[0.025] sm:px-6 xl:border-b-0 xl:border-r"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold-500/20 bg-gold-500/[0.06] text-gold-300">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                WhatsApp
              </span>
              <span className="mt-1 block truncate text-sm font-medium text-sand">
                Fale com a igreja
              </span>
            </span>
            <ArrowUpRight
              className="ml-auto h-4 w-4 shrink-0 text-mist/40 transition-colors group-hover:text-gold-300"
              aria-hidden="true"
            />
          </a>

          <Link
            href="/pedido-de-oracao"
            className="group flex items-center gap-4 px-5 py-5 transition-colors hover:bg-white/[0.025] sm:px-6"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold-500/20 bg-gold-500/[0.06] text-gold-300">
              <HandHeart className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                Oração
              </span>
              <span className="mt-1 block truncate text-sm font-medium text-sand">
                Envie seu pedido
              </span>
            </span>
            <ArrowUpRight
              className="ml-auto h-4 w-4 shrink-0 text-mist/40 transition-colors group-hover:text-gold-300"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
