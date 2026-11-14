import Image from "next/image";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { formatEventDate } from "@/lib/utils";
import type { Testimonial } from "@/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
  index: number;
};

export function TestimonialCard({
  testimonial,
  index,
}: TestimonialCardProps) {
  return (
    <Reveal delay={index * 80} as="article" className="h-full">
      <figure className="surface card-hover flex h-full flex-col rounded-2xl p-6 sm:p-7">
        <Quote
          className="h-7 w-7 text-gold-500/60"
          aria-hidden="true"
        />
        <blockquote className="mt-4 flex-1 font-display text-xl leading-relaxed text-sand sm:text-2xl">
          “{testimonial.quote}”
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
          {testimonial.photo ? (
            <Image
              src={testimonial.photo}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-500/25 bg-gold-500/[0.07] font-display text-lg text-gold-300">
              {testimonial.name.charAt(0)}
            </span>
          )}
          <span>
            <span className="block text-sm font-semibold text-cream">
              {testimonial.name}
            </span>
            <span className="mt-0.5 block text-[11px] text-mist/60">
              {testimonial.category ?? "Testemunho"}
              {testimonial.date
                ? ` · ${formatEventDate(testimonial.date)}`
                : null}
            </span>
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}
