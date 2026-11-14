"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Images,
  X,
} from "lucide-react";
import { galleryCategories, galleryItems, galleryNote } from "@/data/gallery";
import { cn } from "@/lib/utils";
import type { GalleryCategory } from "@/types";

type Filter = "Todos" | GalleryCategory;

const filters: Filter[] = ["Todos", ...galleryCategories];

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Todos");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "Todos") {
      return galleryItems;
    }

    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const current =
    selectedIndex !== null ? filtered[selectedIndex] ?? null : null;

  const close = useCallback(() => {
    setSelectedIndex(null);
    window.setTimeout(() => triggerRef.current?.focus(), 20);
  }, []);

  const move = useCallback(
    (direction: -1 | 1) => {
      if (selectedIndex === null || filtered.length === 0) {
        return;
      }

      const next =
        (selectedIndex + direction + filtered.length) % filtered.length;
      setSelectedIndex(next);
    },
    [filtered.length, selectedIndex],
  );

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => closeRef.current?.focus(), 30);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close, move, selectedIndex]);

  const counts = useMemo(() => {
    return galleryItems.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
      return acc;
    }, {});
  }, []);

  return (
    <div>
      <div
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        role="group"
        aria-label="Filtrar fotos por categoria"
      >
        {filters.map((filter) => {
          const active = activeFilter === filter;
          const count =
            filter === "Todos"
              ? galleryItems.length
              : (counts[filter] ?? 0);

          return (
            <button
              key={filter}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setActiveFilter(filter);
                setSelectedIndex(null);
              }}
              className={cn(
                "inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition-colors",
                active
                  ? "border-gold-400/60 bg-gold-500/15 text-gold-200"
                  : "border-white/[0.08] bg-white/[0.025] text-mist hover:border-gold-500/30 hover:text-cream",
              )}
            >
              {filter}
              <span
                className={cn(
                  "text-[10px]",
                  active ? "text-gold-300/80" : "text-mist/45",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="surface mt-8 flex flex-col items-center rounded-2xl px-6 py-16 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full border border-gold-500/25 bg-gold-500/[0.06] text-gold-300">
            <Camera className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="display-title mt-6 text-3xl text-cream">
            Fotos em breve
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-mist">
            Ainda não há registros nesta categoria. {galleryNote}
          </p>
          <button
            type="button"
            onClick={() => setActiveFilter("Todos")}
            className="btn btn-outline btn-sm mt-6"
          >
            <Images className="h-4 w-4" aria-hidden="true" />
            Ver todas as fotos
          </button>
        </div>
      ) : (
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((item, index) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setSelectedIndex(index);
                }}
                className="group relative block w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-navy-900 text-left"
                aria-label={`Ampliar foto: ${item.caption}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <span>
                    <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gold-300">
                      {item.category}
                    </span>
                    <span className="mt-1 block font-display text-xl font-semibold text-cream">
                      {item.caption}
                    </span>
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-cream opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    <Images className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </div>
          ))}
        </div>
      )}

      {current && selectedIndex !== null ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto: ${current.caption}`}
          ref={dialogRef}
        >
          <button
            type="button"
            aria-label="Fechar galeria"
            className="absolute inset-0 h-full w-full cursor-default"
            tabIndex={-1}
            onClick={close}
          />
          <div className="relative z-10 flex max-h-full w-full max-w-5xl flex-col items-center">
            <div className="mb-4 flex w-full items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">
                  {current.category}
                </p>
                <h3
                  id="lightbox-title"
                  className="mt-1 truncate font-display text-xl text-cream sm:text-2xl"
                >
                  {current.caption}
                </h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="icon-button shrink-0 bg-navy-950/80"
                aria-label="Fechar foto"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-gold-500/20 bg-black/40">
              <Image
                key={current.id}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="90vw"
                className="max-h-[68vh] w-auto object-contain sm:max-h-[72vh]"
                priority
              />
            </div>

            <div className="mt-4 flex w-full items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => move(-1)}
                className="icon-button"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <p className="text-xs text-mist/60" aria-live="polite">
                {selectedIndex + 1} de {filtered.length}
              </p>
              <button
                type="button"
                onClick={() => move(1)}
                className="icon-button"
                aria-label="Próxima foto"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
