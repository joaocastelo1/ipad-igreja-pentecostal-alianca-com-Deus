import type { Metadata } from "next";
import { MessageCircle, Sparkles } from "lucide-react";
import { MinistryCard } from "@/components/cards/MinistryCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ministries, ministryNote } from "@/data/ministries";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Ministérios",
  description:
    "Conheça os ministérios da Igreja Pentecostal Aliança com Deus: evangelismo, missões, oração, louvor, infantil, jovens, ensino e ação social. Encontre um lugar para servir.",
  path: "/ministerios",
});

export default function MinisteriosPage() {
  return (
    <>
      <PageHero
        eyebrow="Ministérios"
        currentPage="Ministérios"
        title={
          <>
            Um lugar para{" "}
            <span className="gold-text italic">servir e crescer</span>
          </>
        }
        description="Deus deu dons e talentos a cada vida. Nossos ministérios existem para que cada pessoa possa servir, crescer na fé e fazer parte da obra."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={getWhatsAppLink(
              "Olá! Gostaria de saber como posso servir nos ministérios da Igreja Pentecostal Aliança com Deus.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Quero servir
          </a>
          <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/[0.05] px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Servir é adorar
          </span>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ministries.map((ministry, index) => (
              <MinistryCard
                key={ministry.slug}
                ministry={ministry}
                index={index}
              />
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-gold-500/15 bg-gold-500/[0.035] p-6 sm:flex-row sm:items-center sm:p-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                  Informações
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">
                  {ministryNote}
                </p>
              </div>
              <a
                href={getWhatsAppLink(
                  "Olá! Gostaria de saber mais sobre os ministérios e como participar.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm shrink-0"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Falar com a igreja
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Faça parte"
        title={
          <>
            Seu dom pode{" "}
            <span className="gold-text italic">transformar vidas</span>
          </>
        }
        description="Deus chama pessoas comuns para uma obra extraordinária. Venha servir conosco e crescer em comunidade."
      >
        <a
          href={getWhatsAppLink(
            "Olá! Gostaria de saber como posso servir nos ministérios da Igreja Pentecostal Aliança com Deus.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Quero servir
        </a>
      </CtaBand>
    </>
  );
}
