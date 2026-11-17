"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { mainNav, siteConfig } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePathname, setActivePathname] = useState(pathname);

  if (activePathname !== pathname) {
    setActivePathname(pathname);
    setOpen(false);
  }
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const panel = panelRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((element) => element.offsetParent !== null);

    const timer = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 30);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const items = focusables();

      if (items.length === 0) {
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-500",
        scrolled
          ? "border-gold-500/15 bg-navy-950/88 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl"
          : "border-transparent bg-gradient-to-b from-navy-950/85 to-transparent",
      )}
    >
      <div className="container-page">
        <div className="flex h-[4.5rem] items-center justify-between gap-4 sm:h-20">
          <Logo priority className="shrink-0" />

          <nav
            aria-label="Navegação principal"
            className="hidden items-center xl:flex"
          >
            <ul className="flex items-center gap-0.5">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex min-h-11 items-center rounded-full px-2.5 text-[13px] font-medium transition-colors",
                        active
                          ? "text-gold-300"
                          : "text-sand/80 hover:text-cream",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-2.5 -bottom-px h-px origin-left bg-gold-400 transition-transform duration-300",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm hidden xl:inline-flex"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Fale Conosco
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com a igreja pelo WhatsApp"
              className="icon-button xl:hidden"
            >
              <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((value) => !value)}
              className="icon-button xl:hidden"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[60] overflow-hidden xl:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-navy-950/75 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className={cn(
            "absolute right-0 top-0 flex h-[100dvh] w-[min(92vw,25rem)] flex-col overflow-y-auto overscroll-contain border-l border-gold-500/20 bg-navy-900 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
            <Logo size="sm" onClick={() => setOpen(false)} />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              className="icon-button"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Navegação móvel" className="px-5 py-6">
            <ul className="flex flex-col">
              {mainNav.map((item, index) => {
                const active = isActive(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex min-h-12 items-center justify-between gap-4 border-b border-white/[0.06] py-3 text-[15px] font-medium transition-colors",
                        active
                          ? "text-gold-300"
                          : "text-sand/85 hover:text-gold-200",
                      )}
                    >
                      <span className="flex items-center gap-4">
                        <span className="w-5 text-[10px] font-semibold tracking-[0.16em] text-gold-500/60">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-gold-500/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto border-t border-white/5 px-5 py-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400">
              Fale com a igreja
            </p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-4 w-full"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
            <Link
              href="/pedido-de-oracao"
              className="btn btn-outline mt-3 w-full"
            >
              Pedido de oração
            </Link>
            <p className="mt-5 text-xs leading-relaxed text-mist">
              {siteConfig.location}
              <br />
              {siteConfig.tagline}
            </p>
            <SocialLinks className="mt-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
