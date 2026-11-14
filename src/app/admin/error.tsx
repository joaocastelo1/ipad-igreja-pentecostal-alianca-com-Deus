"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, TriangleAlert } from "lucide-react";

export default function AdminError({
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
    <div className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="surface w-full max-w-lg rounded-[1.75rem] p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-fire-500/25 bg-fire-500/[0.08] text-fire-400">
          <TriangleAlert className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="display-title mt-5 text-3xl text-cream">
          Erro no painel
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          Não foi possível concluir a operação. Verifique a configuração do
          armazenamento e tente novamente.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn btn-primary">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Tentar novamente
          </button>
          <Link href="/admin" className="btn btn-outline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar ao painel
          </Link>
        </div>
      </div>
    </div>
  );
}
