"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, MessageCircle, RefreshCw, TriangleAlert } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="surface w-full max-w-xl rounded-[1.75rem] p-8 text-center sm:p-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-fire-500/25 bg-fire-500/[0.08] text-fire-400">
          <TriangleAlert className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="display-title mt-5 text-3xl text-cream sm:text-4xl">
          Algo não saiu como esperado
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          Não foi possível carregar esta página agora. Tente novamente; se o
          problema continuar, fale conosco pelo WhatsApp.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn btn-primary">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Tentar novamente
          </button>
          <Link href="/" className="btn btn-outline">
            <Home className="h-4 w-4" aria-hidden="true" />
            Ir para o início
          </Link>
        </div>
        <a
          href={getWhatsAppLink(
            "Olá! Encontrei um erro no site da igreja e gostaria de avisar.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-xs text-mist/60 underline-offset-2 hover:text-gold-300 hover:underline"
        >
          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
          Avisar pelo WhatsApp
        </a>
      </div>
    </section>
  );
}
