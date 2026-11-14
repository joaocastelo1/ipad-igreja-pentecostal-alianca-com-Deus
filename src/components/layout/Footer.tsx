import Link from "next/link";
import { ArrowUpRight, LockKeyhole, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { services } from "@/data/services";
import { footerNav, siteConfig } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-gold-500/20 bg-navy-950">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-gold-500/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-fire-500/[0.05] blur-3xl"
      />

      <div className="container-page relative">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-10 lg:py-20">
          <div>
            <Logo size="lg" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">
              Uma igreja alinhada com Deus, construída pela fé e comprometida
              com a oração, o evangelismo, as missões e a presença do Espírito
              Santo.
            </p>
            <p className="mt-6 font-display text-xl italic text-gold-300">
              “{siteConfig.tagline}”
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <nav aria-label="Links do rodapé">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400">
              Navegação
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-8 items-center gap-1.5 text-sm text-sand/80 transition-colors hover:text-gold-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400">
              Programação
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id} className="text-sm">
                  <span className="block font-semibold text-sand">
                    {service.day}
                  </span>
                  <span className="text-mist">{service.title}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/cultos"
              className="link-underline mt-5 inline-flex"
            >
              Ver programação
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400">
              Onde estamos
            </h2>
            <div className="mt-5 flex gap-3 text-sm text-mist">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
                aria-hidden="true"
              />
              <address className="not-italic leading-relaxed">
                <span className="block font-semibold text-sand">
                  {siteConfig.name}
                </span>
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
              </address>
            </div>
            <a
              href={siteConfig.map.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-4 inline-flex"
            >
              Como chegar
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm mt-6 w-full"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="gold-hairline" />

        <div className="flex flex-col gap-4 py-7 text-xs text-mist/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/politica-de-privacidade"
              className="transition-colors hover:text-gold-300"
            >
              Política de privacidade
            </Link>
            <Link
              href="/pedido-de-oracao"
              className="transition-colors hover:text-gold-300"
            >
              Pedido de oração
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-gold-300"
            >
              <LockKeyhole className="h-3 w-3" aria-hidden="true" />
              Área administrativa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
