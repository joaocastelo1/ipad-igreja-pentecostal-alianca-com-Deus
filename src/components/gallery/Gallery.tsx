"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Images,
  Maximize2,
  Pause,
  Play,
} from "lucide-react";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { galleryCategories, galleryItems, galleryNote } from "@/data/gallery";
import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryItem } from "@/types";

type Filter = "Todos" | GalleryCategory;

const filters: Filter[] = ["Todos", ...galleryCategories];

const AUTOPLAY_DELAY = 5500;

function GalleryMedia({
  item,
  priority,
}: {
  item: GalleryItem;
  priority: boolean;
}) {
  if (item.mediaType === "video") {
    return (
      <>
        <Image
          src={item.poster ?? "/images/og/og-image.png"}
          alt={item.alt}
          fill
          sizes="(max-width: 1024px) 92vw, 64rem"
          quality={90}
          priority={priority}
          className="object-contain"
        />
        <span className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-white/30 bg-navy-950/70 text-gold-200 shadow-2xl backdrop-blur-md">
            <Play
              className="ml-1 h-7 w-7"
              fill="currentColor"
              aria-hidden="true"
            />
          </span>
        </span>
      </>
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      sizes="(max-width: 1024px) 92vw, 64rem"
      quality={90}
      className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
      priority={priority}
    />
  );
}

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Todos");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "Todos") {
      return galleryItems;
    }

    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const total = filtered.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  const go = useCallback(
    (direction: -1 | 1) => {
      if (total === 0) {
        return;
      }

      setIndex((previous) => (previous + direction + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused || reducedMotion || total <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((previous) => (previous + 1) % total);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, total]);

  const counts = useMemo(() => {
    return galleryItems.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
      return acc;
    }, {});
  }, []);

  return (
    <>
      <div
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
          aria-label="Filtrar fotos por categoria"
        >
        {filters.map((filter) => {
          const active = activeFilter === filter;
          const count =
            filter === "Todos" ? galleryItems.length : (counts[filter] ?? 0);

          return (
            <button
              key={filter}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setActiveFilter(filter);
                setIndex(0);
                setPaused(false);
                setLightboxIndex(null);
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

      {total === 0 ? (
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
            onClick={() => {
              setActiveFilter("Todos");
              setIndex(0);
            }}
            className="btn btn-outline btn-sm mt-6"
          >
            <Images className="h-4 w-4" aria-hidden="true" />
            Ver todas as fotos
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <div
            role="region"
            aria-roledescription="carrossel"
            aria-label="Galeria de fotos em carrossel"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                go(1);
              } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                go(-1);
              }
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={(event) => {
              if ((event.target as HTMLElement).closest("video")) {
                touchStart.current = null;
                return;
              }

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
            className="group relative touch-pan-y overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-navy-950 outline-none ring-gold-500/40 focus-visible:ring-2"
          >
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {filtered.map((item, itemIndex) => (
                <div
                  key={item.id}
                  className="relative w-full shrink-0"
                  aria-hidden={itemIndex !== index}
                >
                  <div className="relative h-[68vw] min-h-[20rem] max-h-[34rem] bg-black/40 sm:h-[46vw] lg:h-[32rem]">
                    <Image
                      src={
                        item.mediaType === "video"
                          ? (item.poster ?? "/images/og/og-image.png")
                          : item.src
                      }
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 1024px) 92vw, 64rem"
                      className="scale-110 object-cover opacity-45 blur-2xl"
                    />
                    <span className="absolute inset-0 bg-navy-950/40" />
                    <GalleryMedia
                      item={item}
                      priority={itemIndex === 0}
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/5 to-transparent" />

                    {itemIndex === index ? (
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(itemIndex)}
                        aria-label={
                          item.mediaType === "video"
                            ? `Assistir vídeo: ${item.caption}`
                            : `Ampliar foto: ${item.caption}`
                        }
                        className={cn(
                          "absolute inset-0",
                          item.mediaType === "video"
                            ? "cursor-pointer"
                            : "cursor-zoom-in",
                        )}
                      />
                    ) : null}

                    <span className="pointer-events-none absolute right-4 top-16 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-navy-950/70 text-gold-200 opacity-100 backdrop-blur-md transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                      <Maximize2 className="h-4 w-4" aria-hidden="true" />
                    </span>

                    <span
                      className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-7",
                        item.mediaType === "video" && "pb-14",
                      )}
                    >
                      <span>
                        <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gold-300">
                          {item.category}
                        </span>
                        <span className="mt-1 block font-display text-2xl font-semibold text-cream sm:text-3xl">
                          {item.caption}
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-navy-950/70 px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-sand backdrop-blur-md">
              <span aria-live="polite">
                {index + 1} / {total}
              </span>
            </div>

            {total > 1 ? (
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-label={paused ? "Retomar carrossel" : "Pausar carrossel"}
                className="icon-button absolute right-4 top-3 bg-navy-950/70"
              >
                {paused ? (
                  <Play className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            ) : null}

            {total > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Foto anterior"
                  className="icon-button absolute left-3 top-1/2 -translate-y-1/2 bg-navy-950/70"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Próxima foto"
                  className="icon-button absolute right-3 top-1/2 -translate-y-1/2 bg-navy-950/70"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            ) : null}
          </div>

          {total > 1 ? (
            <div
              className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1"
              role="tablist"
              aria-label="Miniaturas da galeria"
            >
              {filtered.map((item, itemIndex) => {
                const active = itemIndex === index;

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Ver: ${item.caption}`}
                    onClick={() => setIndex(itemIndex)}
                    className={cn(
                      "relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition duration-300",
                      active
                        ? "border-gold-400/70 opacity-100"
                        : "border-white/10 opacity-55 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={
                        item.mediaType === "video"
                          ? (item.poster ?? "/images/og/og-image.png")
                          : item.src
                      }
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                    {item.mediaType === "video" ? (
                      <span className="absolute inset-0 grid place-items-center bg-navy-950/35">
                        <span className="grid h-6 w-6 place-items-center rounded-full border border-white/30 bg-navy-950/70 text-gold-200">
                          <Play className="h-3 w-3" aria-hidden="true" />
                        </span>
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      )}

      {lightboxIndex !== null ? (
        <GalleryLightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(nextIndex) => {
            setLightboxIndex(nextIndex);
            setIndex(nextIndex);
          }}
        />
      ) : null}
    </>
  );
}
