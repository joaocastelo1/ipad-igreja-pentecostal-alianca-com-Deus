import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  currentPage: string;
  children?: ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  currentPage,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-white/5 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full border border-gold-500/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-[19rem] w-[19rem] rounded-full border border-gold-500/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-0 h-64 w-64 rounded-full bg-fire-500/10 blur-3xl"
      />
      <div className="container-page relative">
        <Reveal>
          <nav aria-label="Trilha de navegação" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-mist/70">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-gold-300"
                >
                  Início
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3" />
              </li>
              <li aria-current="page" className="text-gold-300">
                {currentPage}
              </li>
            </ol>
          </nav>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="display-title mt-5 max-w-4xl text-[clamp(2.75rem,6.5vw,5.25rem)] text-cream">
            {title}
          </h1>
          {description ? (
            <p className="text-pretty mt-6 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
              {description}
            </p>
          ) : null}
        </Reveal>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
