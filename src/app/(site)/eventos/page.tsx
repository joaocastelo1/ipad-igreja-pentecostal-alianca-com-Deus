import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  Clock,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { CtaBand } from "@/components/ui/CtaBand";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eventNote } from "@/data/events";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Eventos",
  description:
    "Acompanhe os próximos eventos, vigílias e programações especiais da Igreja Pentecostal Aliança com Deus em São Bernardo, Maranhão.",
  path: "/eventos",
});

export default function EventosPage() {
  return (
    <>
      <PageHero
        eyebrow="Agenda"
        currentPage="Eventos"
        title={
          <>
            Momentos especiais de{" "}
            <span className="gold-text italic">fé e comunhão</span>
          </>
        }
        description="Aqui você encontra os próximos eventos, vigílias, encontros e programações especiais da nossa igreja."
      >
        <a
          href={getWhatsAppLink(
            "Olá! Gostaria de saber sobre os próximos eventos da Igreja Pentecostal Aliança com Deus.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Saber das novidades
        </a>
      </PageHero>

      <section className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Próximos encontros"
              title={
                <>
                  Nossa{" "}
                  <span className="gold-text italic">agenda</span>
                </>
              }
              description="Assim que novas programações forem confirmadas, elas aparecerão aqui com data, horário e local."
            />
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <EmptyState
              icon={<CalendarPlus className="h-7 w-7" aria-hidden="true" />}
              eyebrow="Em breve"
              title="Nenhum evento divulgado no momento"
              description={eventNote}
              action={
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={getWhatsAppLink(
                      "Olá! Gostaria de saber sobre os próximos eventos da igreja.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Perguntar no WhatsApp
                  </a>
                  <Link href="/cultos" className="btn btn-outline">
                    Ver cultos semanais
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              }
            />
          </Reveal>
        </div>
      </section>

      <section className="section relative overflow-hidden border-y border-white/5 bg-navy-900/25">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-30"
        />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Enquanto isso"
              title={
                <>
                  Nossos encontros{" "}
                  <span className="gold-text italic">semanais</span>
                </>
              }
              description="Mesmo sem eventos especiais na agenda, a igreja se reúne toda semana para adorar, orar e aprender na Palavra."
              className="mx-auto"
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 80}>
                <div className="surface h-full rounded-2xl p-6">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    {service.day}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-cream">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    {service.description}
                  </p>
                  <p className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-4 text-xs text-mist/70">
                    <Clock
                      className="h-3.5 w-3.5 text-gold-500"
                      aria-hidden="true"
                    />
                    {service.time}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120} className="mt-9 text-center">
            <Link href="/cultos" className="btn btn-outline">
              Ver programação completa
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Não perca"
        title={
          <>
            Siga a igreja e fique{" "}
            <span className="gold-text italic">por dentro</span>
          </>
        }
        description="As novidades, fotos e programações especiais também são compartilhadas nas nossas redes sociais."
      >
        <a
          href="https://www.instagram.com/i.p._alianca_com_deus"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Seguir no Instagram
        </a>
        <a
          href={getWhatsAppLink(
            "Olá! Gostaria de receber informações sobre a agenda da igreja.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Falar no WhatsApp
        </a>
      </CtaBand>
    </>
  );
}
