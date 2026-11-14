import { MessageCircle, Quote } from "lucide-react";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials, testimonialNote } from "@/data/testimonials";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function HomeTestimonials() {
  return (
    <section className="section relative overflow-hidden border-y border-white/5 bg-navy-900/25">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/[0.06] blur-3xl"
      />
      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Testemunhos"
            title={
              <>
                Deus continua{" "}
                <span className="gold-text italic">transformando histórias</span>
              </>
            }
            description="Cada vida alcançada pela graça de Deus tem uma história para contar."
            className="mx-auto"
          />
        </Reveal>

        {testimonials.length > 0 ? (
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        ) : (
          <Reveal delay={120}>
            <div className="surface relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-[1.75rem] px-6 py-14 text-center sm:px-12">
              <div
                aria-hidden="true"
                className="bg-grid pointer-events-none absolute inset-0 opacity-30"
              />
              <div className="relative">
                <Quote
                  className="mx-auto h-9 w-9 text-gold-500/60"
                  aria-hidden="true"
                />
                <p className="text-balance mx-auto mt-6 max-w-xl font-display text-2xl leading-snug text-cream sm:text-3xl">
                  “{testimonialNote}”
                </p>
                <a
                  href={getWhatsAppLink(
                    "Olá! Gostaria de compartilhar um testemunho do que Deus fez na minha vida.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm mt-8"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Compartilhe seu testemunho
                </a>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
