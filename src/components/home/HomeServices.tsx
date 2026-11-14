import Link from "next/link";
import { ArrowUpRight, Info, MessageCircle } from "lucide-react";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scheduleNote, services } from "@/data/services";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function HomeServices() {
  return (
    <section className="section relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-gold-500/[0.05] blur-3xl"
      />
      <div className="container-page relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Cultos e programação"
              title={
                <>
                  Um convite para estar{" "}
                  <span className="gold-text italic">com Deus</span>
                </>
              }
              description="Separamos momentos na semana para adorar, buscar a presença do Espírito Santo e crescer na Palavra."
            />
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap gap-3">
            <Link href="/cultos" className="btn btn-outline btn-sm">
              Ver programação completa
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <a
              href={getWhatsAppLink(
                "Olá! Gostaria de confirmar os horários dos cultos da Igreja Pentecostal Aliança com Deus.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Confirmar horários
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-14">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold-500/15 bg-gold-500/[0.035] px-4 py-3.5 text-xs leading-relaxed text-mist sm:items-center">
            <Info
              className="mt-0.5 h-4 w-4 shrink-0 text-gold-400 sm:mt-0"
              aria-hidden="true"
            />
            {scheduleNote}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
