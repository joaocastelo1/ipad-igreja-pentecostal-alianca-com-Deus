import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, Globe2, HeartHandshake, Quote } from "lucide-react";
import { PastorDuo } from "@/components/cards/PastorDuo";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pastorStory } from "@/data/pastors";
import { buildMetadata } from "@/lib/seo";

const calling = [
  {
    icon: Globe2,
    title: "Origem",
    description:
      "Naturais de Pedro II, Piauí, dedicam suas vidas a evangelizar no sertão do Maranhão e do Piauí.",
  },
  {
    icon: Flame,
    title: "Missão",
    description:
      "Fundaram a Igreja Aliança com Deus para pregar o Evangelho e anunciar Jesus Cristo.",
  },
  {
    icon: HeartHandshake,
    title: "Esperança",
    description:
      "Trabalham para alcançar vidas, restaurar famílias e fortalecer a esperança pela Palavra de Deus.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Pastores Pedro e Simone",
  description:
    "Conheça os pastores Pedro e Simone Pereira, naturais de Pedro II, Piauí, fundadores da Igreja Aliança com Deus e dedicados à evangelização no sertão do Maranhão e do Piauí.",
  path: "/pastores",
});

export default function PastoresPage() {
  return (
    <>
      <PageHero
        eyebrow="Liderança"
        currentPage="Pastores"
        title={
          <>
            Pastores <span className="gold-text italic">Pedro e Simone</span>
          </>
        }
        description="Conheça a história dos pastores Pedro e Simone Pereira, fundadores da Igreja Aliança com Deus."
      />

      <section className="section">
        <div className="container-page">
          <PastorDuo />

          <Reveal delay={120}>
            <div className="surface mt-8 rounded-[1.5rem] p-7 sm:p-9 lg:p-10">
              <div className="flex items-start gap-3">
                <Quote
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold-500/65"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                    Nossa história
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-cream sm:text-3xl">
                    {pastorStory.title}
                  </h2>
                  <p className="mt-1 font-display text-lg italic text-gold-200 sm:text-xl">
                    {pastorStory.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-mist sm:text-base">
                {pastorStory.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <p className="mt-6 border-t border-white/[0.07] pt-5 font-display text-lg italic leading-snug text-sand">
                {pastorStory.tagline}
              </p>
            </div>
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
              eyebrow="Nosso chamado"
              title={
                <>
                  Uma resposta de{" "}
                  <span className="gold-text italic">fé e obediência</span>
                </>
              }
              description="A história dos pastores se confunde com a história da igreja: um chamado, uma resposta e uma caminhada de confiança em Deus."
              className="mx-auto"
            />
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {calling.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 80}>
                  <div className="h-full rounded-2xl border border-white/[0.07] bg-navy-950/45 p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.07] text-gold-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-cream">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={140} className="mt-10 text-center">
            <Link href="/sobre" className="btn btn-outline">
              Conheça nossa história
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Fale com os pastores"
        title={
          <>
            Precisa de oração ou{" "}
            <span className="gold-text italic">orientação?</span>
          </>
        }
        description="Estamos à disposição para orar com você e caminhar ao seu lado em fé."
      >
        <Link href="/pedido-de-oracao" className="btn btn-primary">
          Enviar pedido de oração
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link href="/contato" className="btn btn-outline">
          Falar com a igreja
        </Link>
      </CtaBand>
    </>
  );
}
