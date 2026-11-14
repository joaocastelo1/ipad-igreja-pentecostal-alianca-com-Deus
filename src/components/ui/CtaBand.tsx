import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type CtaBandProps = {
  eyebrow?: string;
  title: ReactNode;
  description: string;
  children: ReactNode;
  className?: string;
};

export function CtaBand({
  eyebrow,
  title,
  description,
  children,
  className,
}: CtaBandProps) {
  return (
    <section className={cn("section-sm", className)}>
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-gold-500/25 bg-gradient-to-br from-navy-800/75 via-navy-900 to-navy-950 px-6 py-12 text-center sm:px-10 sm:py-14 lg:px-16">
            <div
              aria-hidden="true"
              className="bg-grid pointer-events-none absolute inset-0 opacity-40"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-fire-500/[0.08] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-40 w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/15"
            />
            <div className="relative mx-auto flex max-w-3xl flex-col items-center">
              {eyebrow ? <span className="eyebrow eyebrow--center">{eyebrow}</span> : null}
              <h2 className="display-title mt-5 text-[clamp(2.2rem,5vw,3.75rem)] text-cream">
                {title}
              </h2>
              <p className="text-pretty mt-4 max-w-2xl text-sm leading-relaxed text-mist sm:text-base">
                {description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                {children}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
