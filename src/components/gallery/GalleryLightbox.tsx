"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types";

type GalleryLightboxProps = {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function GalleryLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const total = items.length;
  const item = items[index];

  const navigate = useCallback(
    (nextIndex: number) => {
      setZoomed(false);
      onNavigate(nextIndex);
    },
    [onNavigate],
  );

  const go = useCallback(
    (direction: -1 | 1) => {
      if (total === 0) {
        return;
      }

      navigate((index + direction + total) % total);
    },
    [index, navigate, total],
  );

  useEffect(() => {
    restoreFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => closeRef.current?.focus(), 30);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      restoreFocus.current?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [go, onClose]);

  if (!item) {
    return null;
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ampliada: ${item.caption}`}
      className="fixed inset-0 z-[100] flex flex-col bg-navy-950/96 backdrop-blur-xl"
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-fire-500/10 blur-3xl"
      />

      <header className="relative flex items-start justify-between gap-4 px-4 py-4 sm:px-8 sm:py-5">
        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-300">
            {item.category}
          </p>
          <h2 className="mt-1 truncate font-display text-xl font-semibold text-cream sm:text-2xl">
            {item.caption}
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-sand sm:inline-flex">
            {index + 1} / {total}
          </span>
          {item.mediaType !== "video" ? (
            <button
              type="button"
              onClick={() => setZoomed((value) => !value)}
              aria-label={zoomed ? "Reduzir foto" : "Ampliar foto"}
              aria-pressed={zoomed}
              className="icon-button bg-navy-950/70"
            >
              {zoomed ? (
                <ZoomOut className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ZoomIn className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          ) : null}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar foto ampliada"
            className="icon-button bg-navy-950/70"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20"
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStart.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchEnd={(event) => {
          if (!touchStart.current) {
            return;
          }

          const touch = event.changedTouches[0];
          const deltaX = touch.clientX - touchStart.current.x;
          const deltaY = touch.clientY - touchStart.current.y;
          touchStart.current = null;

          if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
            go(deltaX < 0 ? 1 : -1);
          }
        }}
      >
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Foto anterior"
          className="icon-button absolute left-2 top-1/2 z-20 h-11 w-11 -translate-y-1/2 bg-navy-950/80 sm:left-6 sm:h-12 sm:w-12"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </button>

        <div className="relative flex h-full w-full max-h-[calc(100dvh-11rem)] items-center justify-center py-2">
          {item.mediaType === "video" ? (
            <video
              key={item.id}
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={item.alt}
              className="max-h-full max-w-full rounded-xl border border-white/10 bg-black object-contain shadow-[0_35px_100px_-40px_rgba(0,0,0,1)]"
            />
          ) : (
            <button
              type="button"
              onClick={() => setZoomed((value) => !value)}
              aria-label={zoomed ? "Reduzir foto" : "Ampliar foto"}
              className={cn(
                "relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-black/30",
                zoomed ? "cursor-zoom-out" : "cursor-zoom-in",
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                quality={90}
                priority
                className={cn(
                  "object-contain transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none",
                  zoomed ? "scale-[1.7] sm:scale-[1.9]" : "scale-100",
                )}
              />
              {!zoomed ? (
                <span className="pointer-events-none absolute bottom-3 right-3 hidden items-center gap-1.5 rounded-full border border-white/15 bg-navy-950/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-sand backdrop-blur-md sm:inline-flex">
                  <ZoomIn className="h-3 w-3" aria-hidden="true" />
                  Clique para ampliar
                </span>
              ) : null}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Próxima foto"
          className="icon-button absolute right-2 top-1/2 z-20 h-11 w-11 -translate-y-1/2 bg-navy-950/80 sm:right-6 sm:h-12 sm:w-12"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </button>
      </div>

      <footer className="relative border-t border-white/10 bg-navy-950/60 px-4 py-3 backdrop-blur-md sm:px-8 sm:py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-sand sm:hidden">
              {index + 1} / {total}
            </span>
            <p className="text-xs leading-relaxed text-mist/80">
              Use as setas para navegar · Esc para fechar
            </p>
          </div>

          <div
            className="no-scrollbar flex gap-2 overflow-x-auto pb-1"
            aria-label="Miniaturas da galeria ampliada"
          >
            {items.map((thumb, thumbIndex) => {
              const active = thumbIndex === index;

              return (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => navigate(thumbIndex)}
                  aria-label={`Ver: ${thumb.caption}`}
                  aria-current={active}
                  className={cn(
                    "relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border transition duration-300 sm:h-14 sm:w-20",
                    active
                      ? "border-gold-400/70 opacity-100"
                      : "border-white/10 opacity-50 hover:opacity-100",
                  )}
                >
                  <Image
                    src={
                      thumb.mediaType === "video"
                        ? (thumb.poster ?? "/images/og/og-image.png")
                        : thumb.src
                    }
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
