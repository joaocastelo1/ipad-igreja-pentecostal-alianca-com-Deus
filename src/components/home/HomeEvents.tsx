import Link from "next/link";
import { ArrowUpRight, CalendarDays, MessageCircle } from "lucide-react";
import { EventCard } from "@/components/cards/EventCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { events, eventNote } from "@/data/events";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function HomeEvents() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Agenda"
              title={
                <>
                  Próximos <span className="gold-text italic">eventos</span>
                </>
              }
              description="Encontros, programações especiais e momentos para viver a fé em comunidade."
            />
          </Reveal>
          <Reveal delay={100}>
            <Link href="/eventos" className="link-underline">
              Ver todos os eventos
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {events.length > 0 ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <Reveal delay={120} className="mt-10">
            <EmptyState
              icon={<CalendarDays className="h-7 w-7" aria-hidden="true" />}
              eyebrow="Agenda"
              title="Nenhum evento agendado no momento"
              description={`${eventNote} Enquanto isso, você é sempre bem-vindo aos nossos cultos.`}
              action={
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={getWhatsAppLink(
                      "Olá! Gostaria de saber mais sobre a programação e os próximos eventos da igreja.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <MessageCircle
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                    Falar com a igreja
                  </a>
                  <Link href="/cultos" className="btn btn-outline btn-sm">
                    Ver programação
                  </Link>
                </div>
              }
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
