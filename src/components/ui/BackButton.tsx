"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  fallbackHref?: string;
  label?: string;
  className?: string;
};

export function BackButton({
  fallbackHref = "/",
  label = "Voltar",
  className,
}: BackButtonProps) {
  const router = useRouter();

  const goBack = () => {
    const sameOrigin =
      typeof document !== "undefined" &&
      document.referrer.startsWith(window.location.origin);

    if (sameOrigin && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Voltar para a página anterior"
      className={cn(
        "group inline-flex min-h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-sand/80 transition-colors hover:border-gold-500/40 hover:text-gold-200 sm:text-[11px]",
        className,
      )}
    >
      <ArrowLeft
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
        aria-hidden="true"
      />
      {label}
    </button>
  );
}
