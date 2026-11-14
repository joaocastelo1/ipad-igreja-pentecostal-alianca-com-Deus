import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { MinistryCard } from "@/components/cards/MinistryCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ministries, ministryNote } from "@/data/ministries";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function HomeMinistries() {
  return (
    <section className="section relative overflow-hidden border-y border-white/5 bg-navy-900/25">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-35"
      />
      <div className="container-page relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Ministérios"
              title={
                <>
                  Um lugar para <span className="gold-text italic">servir</span>
                </>
              }
              description="Deus deu dons e talentos a cada vida. Encontre um ministério para crescer, servir e fazer parte."
            />
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap gap-3">
            <Link href="/ministerios" className="btn btn-outline btn-sm">
              Ver todos
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <a
              href={getWhatsAppLink(
                "Olá! Gostaria de saber como posso servir nos ministérios da Igreja Pentecostal Aliança com Deus.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Quero servir
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 xl:grid-cols-4">
          {ministries.map((ministry, index) => (
            <MinistryCard key={ministry.slug} ministry={ministry} index={index} />
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-xs leading-relaxed text-mist/50">
            {ministryNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
