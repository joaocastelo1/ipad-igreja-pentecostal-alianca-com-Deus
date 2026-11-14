import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function HomeContact() {
  return (
    <section className="section border-t border-white/5">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Contato"
                title={
                  <>
                    Venha nos <span className="gold-text italic">visitar</span>
                  </>
                }
                description="Será uma alegria receber você e sua família. Estamos em São Bernardo, Maranhão."
              />
            </Reveal>

            <div className="mt-9 space-y-4">
              <Reveal delay={80}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.06] text-gold-300">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                      Localização
                    </p>
                    <p className="mt-1 font-medium text-cream">
                      {siteConfig.address.line1}
                    </p>
                    <p className="mt-0.5 text-xs text-mist/60">
                      {siteConfig.address.line2}
                    </p>
                    <a
                      href={siteConfig.map.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-gold-400 hover:text-gold-200"
                    >
                      Como chegar
                      <ArrowUpRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.06] text-gold-300">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="w-full">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                      Programação
                    </p>
                    <ul className="mt-2 grid gap-2 sm:grid-cols-3">
                      {services.map((service) => (
                        <li key={service.id}>
                          <span className="block text-xs font-semibold text-cream">
                            {service.day}
                          </span>
                          <span className="mt-0.5 block text-[11px] text-mist/60">
                            {service.time}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/cultos"
                      className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-gold-400 hover:text-gold-200"
                    >
                      Programação completa
                      <ArrowUpRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Fale conosco
                  </a>
                  <SocialLinks />
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal direction="right" className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-[1.8rem] border border-gold-500/15"
            />
            <div className="relative overflow-hidden rounded-[1.35rem] border border-gold-500/25 bg-navy-900">
              <iframe
                title="Mapa de São Bernardo, Maranhão"
                src={siteConfig.map.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[390px] w-full grayscale-[0.25] contrast-[0.95]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent p-5 pt-16">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-300">
                    Estamos aqui
                  </p>
                  <p className="mt-1 font-display text-xl text-cream">
                    {siteConfig.city} — {siteConfig.state}
                  </p>
                </div>
                <a
                  href={siteConfig.map.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir rota para São Bernardo, Maranhão"
                  className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-gold-500/30 bg-navy-950/80 text-gold-300 backdrop-blur-md transition-colors hover:bg-gold-500/15"
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
