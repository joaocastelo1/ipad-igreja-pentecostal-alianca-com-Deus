import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Church,
  Globe2,
  MessageCircle,
  Quote,
  Sparkles,
  Users,
} from "lucide-react";
import { MissionCard } from "@/components/cards/MissionCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { Logo } from "@/components/ui/Logo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  expansion,
  foundation,
  history,
  leadership,
  missionPillars,
  missionStatement,
  purpose,
  timeline,
  values,
} from "@/data/about";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Sobre Nós",
  description:
    "Conheça a história da Igreja Pentecostal Aliança com Deus: de 1997 ao chamado em Pedro II, da fundação em São Bernardo à expansão no Maranhão, no Piauí e na França.",
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
            Uma história de fé,{" "}
            <span className="gold-text italic">obediência e provisão</span>
          </>
        }
        description="Da conversão em 1997 ao chamado em Pedro II, da fundação em São Bernardo à expansão pelo Maranhão, Piauí e França: uma história sustentada pela fidelidade de Deus."
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-mist/70">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
            1997 · Encontro com Cristo
          </span>
          <span aria-hidden="true" className="text-gold-500/40">
            ·
          </span>
          <span>2000 · O chamado</span>
          <span aria-hidden="true" className="text-gold-500/40">
            ·
          </span>
          <span>2007 · Fundação</span>
          <span aria-hidden="true" className="text-gold-500/40">
            ·
          </span>
          <span>Hoje · Expansão e missões</span>
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
                      src="/images/sede-ipad-2.jpeg"
                      alt="Pastor ministrando a Palavra para a congregação reunida na Sede IPAD"
                      fill
                      sizes="(max-width: 1024px) 92vw, 42vw"
                      quality={90}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-300">
                        Nossa família
                      </p>
                      <p className="mt-1 font-display text-2xl text-cream">
                        Desde 2007 servindo em São Bernardo
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
        id="fundacao"
        className="section-sm scroll-mt-24 border-y border-white/5 bg-navy-900/25"
      >
        <div className="container-page">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Fundação e expansão"
              title={
                <>
                  De São Bernardo para{" "}
                  <span className="gold-text italic">novos lugares</span>
                </>
              }
              description="O ministério nasceu em 2007 e, desde então, tem alcançado famílias, cidades e nações por meio da pregação do Evangelho."
              className="mx-auto"
            />
          </Reveal>

          <div className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-3">
            <Reveal>
              <article className="surface flex h-full flex-col rounded-2xl p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-300">
                  <Church className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-cream">
                  {foundation.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {foundation.description}
                </p>
                <p className="mt-4 border-t border-white/[0.07] pt-4 text-sm leading-relaxed text-mist/80">
                  {foundation.detail}
                </p>
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="surface flex h-full flex-col rounded-2xl p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-300">
                  <Globe2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-cream">
                  {expansion.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {expansion.description}
                </p>
                <p className="mt-4 border-t border-white/[0.07] pt-4 text-sm leading-relaxed text-mist/80">
                  {expansion.detail}
                </p>
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="surface flex h-full flex-col rounded-2xl p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-300">
                  <Users className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-cream">
                  {leadership.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {leadership.description}
                </p>
                <ul className="mt-5 space-y-3">
                  {leadership.founders.map((founder) => (
                    <li
                      key={founder.name}
                      className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3"
                    >
                      <p className="text-sm font-medium text-cream">
                        {founder.name}
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-400">
                        {founder.role}
                      </p>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pastores"
                  className="btn btn-outline mt-5 self-start"
                >
                  Conheça os pastores
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
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
              description={missionStatement}
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
            <div className="surface relative mt-14 overflow-hidden rounded-2xl p-7 sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl"
              />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-5">
                  <span className="hidden shrink-0 rounded-full border border-gold-500/20 bg-navy-950/60 p-3 sm:block">
                    <Logo
                      href={null}
                      showWordmark={false}
                      size="xl"
                      className="drop-shadow-none"
                    />
                  </span>
                  <div className="max-w-2xl">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                      {purpose.title}
                    </p>
                    <p className="mt-2 font-display text-2xl leading-snug text-cream sm:text-3xl">
                      {purpose.description}
                    </p>
                    <p className="mt-3 font-display text-lg italic text-gold-300">
                      “{purpose.declaration}”
                    </p>
                  </div>
                </div>
                <Link href="/contato" className="btn btn-primary shrink-0">
                  Planeje sua visita
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
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
