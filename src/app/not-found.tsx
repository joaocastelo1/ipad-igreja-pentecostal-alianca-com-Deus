import Link from "next/link";
import { ArrowLeft, Home, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl text-center">
        <Logo href={null} size="lg" className="justify-center" />

        <p className="mt-10 font-display text-[6rem] leading-none text-gold-500/25 sm:text-[8rem]">
          404
        </p>
        <h1 className="display-title -mt-2 text-4xl text-cream sm:text-5xl">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-mist sm:text-base">
          O endereço que você procura pode ter sido alterado ou não existe.
          Volte ao início ou fale conosco para encontrar o que precisa.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            <Home className="h-4 w-4" aria-hidden="true" />
            Ir para o início
          </Link>
          <a
            href={getWhatsAppLink(
              "Olá! Não encontrei uma página no site e gostaria de ajuda.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Falar com a igreja
          </a>
        </div>

        <Link
          href="/contato"
          className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-mist/60 transition-colors hover:text-gold-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Ver todos os contatos
        </Link>
      </div>
    </main>
  );
}
