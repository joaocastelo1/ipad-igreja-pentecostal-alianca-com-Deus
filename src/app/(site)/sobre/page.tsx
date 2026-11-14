import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Quote, Sparkles } from "lucide-react";
import { MissionCard } from "@/components/cards/MissionCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { history, missionPillars, timeline, values } from "@/data/about";
import { pastorMessage } from "@/data/pastors";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Sobre Nós",
  description:
    "Conheça a história da Igreja Pentecostal Aliança com Deus em São Bernardo, Maranhão: um ministério nascido do chamado de Deus, da fé, da oração, do evangelismo e das missões.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre nós"
        currentPage="Sobre Nós"
        title={
          <>
            Uma história construída{" "}
            <span className="gold-text italic">pela fé</span>
          </>
        }
        description="Conheça a caminhada da Igreja Pentecostal Aliança com Deus, um ministério que nasceu do chamado de Deus e continua sendo sustentado por Ele."
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-mist/70">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
            Chamado
          </span>
          <span aria-hidden="true" className="text-gold-500/40">
            ·
          </span>
          <span>Fé</span>
          <span aria-hidden="true" className="text-gold-500/40">
            ·
          </span>
          <span>Obediência</span>
          <span aria-hidden="true" className="text-gold-500/40">
            ·
          </span>
          <span>Evangelismo</span>
          <span aria-hidden="true" className="text-gold-500/40">
            ·
          </span>
          <span>Missões</span>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-20">
            <Reveal direction="left">
              <div className="lg:sticky lg:top-28">
                <div className="relative overflow-hidden rounded-[1.5rem] border border-gold-500/25 bg-navy-900">
                  <div className="relative aspect-[5/4]">
                    <Image
                      src="/images/igreja/igreja.webp"
                      alt="Família da Igreja Pentecostal Aliança com Deus reunida em frente à igreja"
                      fill
                      sizes="(max-width: 1024px) 92vw, 42vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-300">
                        Nossa família
                      </p>
                      <p className="mt-1 font-display text-2xl text-cream">
                        {history.title}
                      </p>
                    </div>
                  </div>
                </div>

                <figure className="surface mt-5 rounded-2xl p-6">
                  <Quote
                    className="h-6 w-6 text-gold-500/65"
                    aria-hidden="true"
                  />
                  <blockquote className="mt-3 font-display text-xl leading-snug text-sand">
                    “{history.quote}”
                  </blockquote>
                  <figcaption className="mt-3 text-[9px] font-bold uppercase tracking-[0.2em] text-gold-400">
                    Igreja Pentecostal Aliança com Deus
                  </figcaption>
                </figure>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Nossa história"
                  title={
                    <>
                      O começo de uma{" "}
                      <span className="gold-text italic">caminhada</span>
                    </>
                  }
                  description={history.lead}
                />
              </Reveal>
              <Reveal
                delay={100}
                className="prose-church mt-7 max-w-2xl text-sm sm:text-base"
              >
                {history.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Reveal>

              <Reveal delay={160} className="mt-12">
                <div className="relative border-l border-gold-500/25 pl-8">
                  <ol className="space-y-8">
                    {timeline.map((item) => (
                      <li key={item.step} className="relative">
                        <span
                          aria-hidden="true"
                          className="absolute -left-[2.6rem] top-0 grid h-8 w-8 place-items-center rounded-full border border-gold-500/35 bg-navy-950 font-display text-xs font-semibold text-gold-300"
                        >
                          {item.step}
                        </span>
                        <h3 className="font-display text-2xl font-semibold text-cream">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-mist">
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={200} className="mt-10">
                <Link href="/pastores" className="btn btn-outline">
                  Conheça os pastores
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section
        id="missao"
        className="section relative scroll-mt-24 overflow-hidden border-y border-white/5 bg-navy-900/25"
      >
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-35"
        />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Nossa missão"
              title={
                <>
                  Uma igreja com{" "}
                  <span className="gold-text italic">propósito</span>
                </>
              }
              description="Seis compromissos que orientam a nossa vida como igreja e nos lembram do chamado que recebemos."
              className="mx-auto"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {missionPillars.map((pillar, index) => (
              <MissionCard
                key={pillar.title}
                title={pillar.title}
                description={pillar.description}
                icon={pillar.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Nossos valores"
                title={
                  <>
                    O que nos <span className="gold-text italic">guia</span>
                  </>
                }
                description="Valores que moldam a nossa forma de servir, acolher e viver a fé em comunidade."
              />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((value, index) => (
                <Reveal key={value.title} delay={index * 70}>
                  <div className="card-hover h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                    <span className="font-display text-3xl font-semibold text-gold-500/50">
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-cream">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={100}>
            <div className="surface mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl p-7 sm:flex-row sm:items-center sm:p-8">
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                  Nossa mensagem
                </p>
                <p className="mt-2 font-display text-2xl leading-snug text-cream sm:text-3xl">
                  “{pastorMessage}”
                </p>
              </div>
              <Link href="/pastores" className="btn btn-primary shrink-0">
                Pastores Pedro e Simone
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Venha fazer parte"
        title={
          <>
            Uma família, uma fé,{" "}
            <span className="gold-text italic">um propósito</span>
          </>
        }
        description="Se você está procurando uma igreja para caminhar com Deus, será uma alegria receber você e sua família."
      >
        <Link href="/contato" className="btn btn-primary">
          Planeje sua visita
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Fale conosco
        </a>
      </CtaBand>
    </>
  );
}
