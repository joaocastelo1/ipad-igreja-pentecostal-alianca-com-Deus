import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock,
  AtSign,
  ExternalLink,
  MapPin,
  MessageCircle,
  Navigation,
  Sparkles,
  Users,
} from "lucide-react";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/whatsapp";

const faqs = [
  {
    question: "Preciso avisar antes de visitar a igreja?",
    answer:
      "Não é obrigatório. Você pode chegar no horário do culto e será recebido com alegria. Se preferir, fale conosco pelo WhatsApp para confirmarmos os horários e o endereço.",
  },
  {
    question: "Como devo me vestir para o culto?",
    answer:
      "Venha com uma roupa confortável e respeitosa. Não existe exigência de traje especial: o mais importante é a sua disposição de coração para adorar a Deus.",
  },
  {
    question: "Crianças são bem-vindas?",
    answer:
      "Sim. A igreja é uma família, e as crianças são parte dela. Traga os seus filhos com tranquilidade; a família toda é bem-vinda.",
  },
  {
    question: "Como faço para falar com um pastor?",
    answer:
      "Você pode enviar uma mensagem pelo WhatsApp ou preencher o formulário de pedido de oração. Nossa equipe dará o retorno o mais breve possível.",
  },
  {
    question: "Onde fica a igreja?",
    answer:
      "Estamos em São Bernardo, Maranhão. O endereço completo será divulgado em breve. Pelo WhatsApp, podemos orientar você e enviar a localização exata.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Contato",
  description:
    "Fale com a Igreja Pentecostal Aliança com Deus em São Bernardo, Maranhão. WhatsApp, Instagram, localização e informações para sua visita.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        currentPage="Contato"
        title={
          <>
            Estamos aqui para{" "}
            <span className="gold-text italic">conversar e orar</span>
          </>
        }
        description="Tem uma dúvida, quer planejar sua visita ou precisa de oração? Fale com a nossa equipe. Será um prazer atender você."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Chamar no WhatsApp
          </a>
          <a
            href={siteConfig.map.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Como chegar
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="surface card-hover group flex h-full flex-col rounded-2xl p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.06] text-gold-300">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                  WhatsApp
                </p>
                <p className="mt-1.5 font-display text-xl font-semibold text-cream">
                  {siteConfig.whatsapp.display}
                </p>
                <span className="mt-auto flex items-center gap-1.5 pt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist/60 transition-colors group-hover:text-gold-300">
                  Enviar mensagem
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </a>
            </Reveal>

            <Reveal delay={70}>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="surface card-hover group flex h-full flex-col rounded-2xl p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.06] text-gold-300">
                  <AtSign className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                  Instagram
                </p>
                <p className="mt-1.5 font-display text-xl font-semibold text-cream">
                  @i.p._alianca_com_deus
                </p>
                <span className="mt-auto flex items-center gap-1.5 pt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist/60 transition-colors group-hover:text-gold-300">
                  Seguir
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </a>
            </Reveal>

            <Reveal delay={140}>
              <a
                href={siteConfig.map.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="surface card-hover group flex h-full flex-col rounded-2xl p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.06] text-gold-300">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                  Localização
                </p>
                <p className="mt-1.5 font-display text-xl font-semibold text-cream">
                  {siteConfig.location}
                </p>
                <span className="mt-auto flex items-center gap-1.5 pt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist/60 transition-colors group-hover:text-gold-300">
                  Abrir mapa
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </span>
              </a>
            </Reveal>

            <Reveal delay={210}>
              <Link
                href="/cultos"
                className="surface card-hover group flex h-full flex-col rounded-2xl p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.06] text-gold-300">
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                  Cultos
                </p>
                <p className="mt-1.5 font-display text-xl font-semibold text-cream">
                  Dom, qua e sex
                </p>
                <span className="mt-auto flex items-center gap-1.5 pt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist/60 transition-colors group-hover:text-gold-300">
                  Ver programação
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Fale com a igreja"
                  title={
                    <>
                      Como podemos{" "}
                      <span className="gold-text italic">ajudar você?</span>
                    </>
                  }
                  description="Escolha o assunto e fale diretamente com a nossa equipe pelo WhatsApp."
                />
              </Reveal>

              <div className="mt-7 space-y-3">
                <Reveal delay={60}>
                  <a
                    href={getWhatsAppLink(
                      "Olá! Gostaria de planejar minha primeira visita à igreja.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface card-hover group flex items-center justify-between gap-4 rounded-xl p-5"
                  >
                    <span className="flex items-center gap-3.5">
                      <span className="grid h-10 w-10 place-items-center rounded-lg border border-gold-500/20 bg-gold-500/[0.06] text-gold-300">
                        <Users className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-cream">
                          Planejar minha visita
                        </span>
                        <span className="mt-0.5 block text-xs text-mist">
                          Tire dúvidas sobre horários e localização.
                        </span>
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-gold-400 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </Reveal>

                <Reveal delay={110}>
                  <Link
                    href="/pedido-de-oracao"
                    className="surface card-hover group flex items-center justify-between gap-4 rounded-xl p-5"
                  >
                    <span className="flex items-center gap-3.5">
                      <span className="grid h-10 w-10 place-items-center rounded-lg border border-gold-500/20 bg-gold-500/[0.06] text-gold-300">
                        <Sparkles className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-cream">
                          Pedido de oração
                        </span>
                        <span className="mt-0.5 block text-xs text-mist">
                          Compartilhe seu pedido; oraremos por você.
                        </span>
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-gold-400 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </Reveal>

                <Reveal delay={160}>
                  <a
                    href={getWhatsAppLink(
                      "Olá! Gostaria de falar com um pastor da Igreja Pentecostal Aliança com Deus.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface card-hover group flex items-center justify-between gap-4 rounded-xl p-5"
                  >
                    <span className="flex items-center gap-3.5">
                      <span className="grid h-10 w-10 place-items-center rounded-lg border border-gold-500/20 bg-gold-500/[0.06] text-gold-300">
                        <MessageCircle
                          className="h-4.5 w-4.5"
                          aria-hidden="true"
                        />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-cream">
                          Falar com um pastor
                        </span>
                        <span className="mt-0.5 block text-xs text-mist">
                          Atendimento e orientação pastoral.
                        </span>
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-gold-400 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </Reveal>
              </div>

              <Reveal delay={200}>
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold-500/15 bg-gold-500/[0.04] p-4">
                  <Clock
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
                    aria-hidden="true"
                  />
                  <p className="text-xs leading-relaxed text-mist">
                    Os horários dos cultos estão em confirmação. Consulte a
                    página de{" "}
                    <Link
                      href="/cultos"
                      className="font-semibold text-gold-300 underline-offset-2 hover:underline"
                    >
                      programação
                    </Link>{" "}
                    ou fale conosco pelo WhatsApp.
                  </p>
                </div>
              </Reveal>
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
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      Nossa localização
                    </p>
                    <p className="mt-2 font-display text-xl text-cream">
                      {siteConfig.address.line1}
                    </p>
                    <p className="mt-1 text-xs text-mist">
                      {siteConfig.address.line2}
                    </p>
                  </div>
                  <a
                    href={siteConfig.map.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm shrink-0"
                  >
                    Abrir no mapa
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section relative overflow-hidden border-y border-white/5 bg-navy-900/25">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-30"
        />
        <div className="container-page relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Perguntas frequentes"
              title={
                <>
                  Antes da sua{" "}
                  <span className="gold-text italic">visita</span>
                </>
              }
              description="Reunimos as dúvidas mais comuns de quem vai visitar a igreja pela primeira vez."
            />
            <div className="mt-6 space-y-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                >
                  <span className="flex min-w-0 items-center gap-2.5 text-sm text-cream">
                    <CalendarDays
                      className="h-4 w-4 shrink-0 text-gold-500"
                      aria-hidden="true"
                    />
                    {service.day}
                  </span>
                  <span className="shrink-0 text-right text-[11px] text-mist/70">
                    {service.title}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 60}>
                <details className="group surface rounded-xl px-5 py-4 open:border-gold-500/25">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold text-cream marker:hidden">
                    {faq.question}
                    <ChevronDown
                      className="h-4 w-4 shrink-0 text-gold-400 transition-transform duration-300 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Será uma alegria"
        title={
          <>
            Venha nos visitar e{" "}
            <span className="gold-text italic">sinta-se em casa</span>
          </>
        }
        description="Se você tem alguma dúvida, fale conosco. Estamos prontos para receber você e sua família com amor."
      >
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Falar no WhatsApp
        </a>
        <Link href="/cultos" className="btn btn-outline">
          Ver cultos
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </CtaBand>
    </>
  );
}
