import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  DoorOpen,
  ExternalLink,
  MapPin,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, scheduleNote, visitorNote } from "@/data/services";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Cultos e Programação",
  description:
    "Confira a programação de cultos da Igreja Pentecostal Aliança com Deus em São Bernardo, Maranhão. Domingos, quartas e sextas-feiras. Venha adorar com a gente.",
  path: "/cultos",
});

const firstVisit = [
  {
    icon: DoorOpen,
    title: "Chegue como está",
    description:
      "Não é necessário traje especial nem experiência prévia. Venha com o seu coração aberto para Deus.",
  },
  {
    icon: Users,
    title: "Seja recebido",
    description:
      "Nossa equipe estará pronta para acolher você, tirar dúvidas e ajudar a encontrar seu lugar.",
  },
  {
    icon: Sparkles,
    title: "Participe do culto",
    description:
      "Adoração, Palavra e oração. Um tempo pensado para toda a família, de crianças a idosos.",
  },
];

export default function CultosPage() {
  return (
    <>
      <PageHero
        eyebrow="Programação"
        currentPage="Cultos"
        title={
          <>
            Venha adorar{" "}
            <span className="gold-text italic">com a gente</span>
          </>
        }
        description="A melhor parte de uma igreja é a presença de Deus e a comunhão entre irmãos. Reserve um tempo na sua semana para estar conosco."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={getWhatsAppLink(
              "Olá! Gostaria de confirmar os horários dos cultos da Igreja Pentecostal Aliança com Deus.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Confirmar horários
          </a>
          <Link href="/contato" className="btn btn-outline btn-sm">
            Como chegar
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Nossos encontros"
              title={
                <>
                  Uma agenda para{" "}
                  <span className="gold-text italic">toda a família</span>
                </>
              }
              description="Ao longo da semana, nos reunimos para buscar a presença de Deus, aprender na Palavra e fortalecer a comunhão."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>

          <Reveal delay={120}>
            <p className="mt-7 flex items-start gap-2.5 rounded-xl border border-gold-500/15 bg-gold-500/[0.04] px-4 py-3.5 text-xs leading-relaxed text-mist">
              <Clock
                className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
                aria-hidden="true"
              />
              {scheduleNote}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section relative overflow-hidden border-y border-white/5 bg-navy-900/25">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-30"
        />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Primeira visita"
                title={
                  <>
                    Será uma alegria{" "}
                    <span className="gold-text italic">receber você</span>
                  </>
                }
                description={visitorNote}
              />
            </Reveal>
            <ul className="mt-8 space-y-4">
              {firstVisit.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.title} delay={index * 80}>
                    <li className="flex gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.06] text-gold-300">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-cream">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-mist">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          <Reveal direction="right">
            <div className="surface overflow-hidden rounded-[1.5rem]">
              <div className="aspect-[4/3] w-full">
                <iframe
                  src={siteConfig.map.embedUrl}
                  title="Mapa de São Bernardo, Maranhão"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 grayscale-[0.25]"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  Onde estamos
                </p>
                <p className="mt-2 font-display text-2xl text-cream">
                  {siteConfig.address.line1}
                </p>
                <p className="mt-1 text-sm text-mist">
                  {siteConfig.address.line2}
                </p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <a
                    href={siteConfig.map.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Abrir no Google Maps
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href={getWhatsAppLink(
                      "Olá! Gostaria de saber o endereço completo da igreja para visitar um culto.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Pedir endereço
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <div className="surface flex h-full items-start gap-4 rounded-2xl p-6">
                <CalendarDays
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold-400"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-xl font-semibold text-cream">
                    Eventos especiais
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">
                    Confira a agenda de eventos, vigílias e programações
                    especiais da igreja.
                  </p>
                  <Link
                    href="/eventos"
                    className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-400 hover:text-gold-200"
                  >
                    Ver agenda
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="surface flex h-full items-start gap-4 rounded-2xl p-6">
                <Sparkles
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold-400"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-xl font-semibold text-cream">
                    Pedido de oração
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">
                    Não precisa enfrentar tudo sozinho. Envie o seu pedido e
                    oremos com você.
                  </p>
                  <Link
                    href="/pedido-de-oracao"
                    className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-400 hover:text-gold-200"
                  >
                    Enviar pedido
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="surface flex h-full items-start gap-4 rounded-2xl p-6">
                <Users
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold-400"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-xl font-semibold text-cream">
                    Ministérios
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">
                    Descubra como usar os seus dons e servir ao Senhor com a
                    nossa família.
                  </p>
                  <Link
                    href="/ministerios"
                    className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-400 hover:text-gold-200"
                  >
                    Conhecer
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Esperamos por você"
        title={
          <>
            Sua presença torna a{" "}
            <span className="gold-text italic">família completa</span>
          </>
        }
        description="Venha viver um tempo de adoração, Palavra e comunhão. Se tiver dúvidas, fale conosco antes de sua visita."
      >
        <a
          href={getWhatsAppLink(
            "Olá! Gostaria de confirmar os horários e o endereço da igreja para visitar.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Falar no WhatsApp
        </a>
        <Link href="/contato" className="btn btn-outline">
          Planejar visita
        </Link>
      </CtaBand>
    </>
  );
}
