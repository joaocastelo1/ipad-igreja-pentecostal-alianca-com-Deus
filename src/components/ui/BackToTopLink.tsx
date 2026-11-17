"use client";

import { ArrowUp } from "lucide-react";

export function BackToTopLink() {
  function scrollToTop() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });

    document.getElementById("conteudo")?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="group inline-flex items-center gap-1.5 transition-colors hover:text-gold-300"
    >
      <ArrowUp
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
      Voltar ao topo
    </button>
  );
}
