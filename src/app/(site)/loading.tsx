import { Loader2 } from "lucide-react";

export default function SiteLoading() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-24"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="relative grid h-14 w-14 place-items-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-gold-500/15"
        />
        <Loader2
          className="h-6 w-6 animate-spin text-gold-400"
          aria-hidden="true"
        />
      </span>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-mist/60">
        Carregando
      </p>
      <span className="sr-only">Carregando o conteúdo da página.</span>
    </div>
  );
}
