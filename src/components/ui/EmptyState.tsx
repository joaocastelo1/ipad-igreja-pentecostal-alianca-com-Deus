import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon: ReactNode;
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  eyebrow,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "surface relative overflow-hidden rounded-[1.75rem] px-6 py-14 text-center sm:px-12 sm:py-16",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-44 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div className="relative mx-auto flex max-w-xl flex-col items-center">
        <div className="grid h-16 w-16 place-items-center rounded-full border border-gold-500/25 bg-gold-500/[0.07] text-gold-300">
          {icon}
        </div>
        {eyebrow ? <span className="eyebrow mt-7">{eyebrow}</span> : null}
        <h3 className="display-title mt-4 text-3xl text-cream sm:text-4xl">
          {title}
        </h3>
        <p className="text-pretty mt-4 text-sm leading-relaxed text-mist sm:text-base">
          {description}
        </p>
        {action ? <div className="mt-8">{action}</div> : null}
      </div>
    </div>
  );
}
