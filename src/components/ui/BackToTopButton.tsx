"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });

    document
      .getElementById("conteudo")
      ?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo da página"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      style={{
        bottom: "calc(max(1.25rem, env(safe-area-inset-bottom)) + 4.75rem)",
      }}
      className={cn(
        "fixed right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-gold-500/30 bg-navy-900/90 text-gold-300 shadow-[0_14px_35px_-16px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-300 hover:border-gold-400 hover:bg-navy-800 hover:text-gold-100 focus-visible:border-gold-300 sm:right-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="h-4.5 w-4.5" aria-hidden="true" />
    </button>
  );
}
