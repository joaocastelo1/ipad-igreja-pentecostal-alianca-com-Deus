"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Pause,
  Play,
  Video,
} from "lucide-react";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { galleryAlbums } from "@/data/gallery";
import { cn } from "@/lib/utils";
import type { GalleryAlbum, GalleryItem } from "@/types";

const AUTOPLAY_DELAY = 4800;

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function AlbumMedia({
  item,
  active,
  priority,
}: {
  item: GalleryItem;
  active: boolean;
  priority: boolean;
}) {
  if (item.mediaType === "video") {
    return (
      <>
        <Image
          src={item.poster ?? "/images/og/og-image.png"}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40rem"
          priority={priority}
          className="object-cover"
        />
        <span className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-white/30 bg-navy-950/70 text-gold-200 shadow-2xl backdrop-blur-md">
            <Play
              className="ml-0.5 h-6 w-6"
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
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40rem"
      priority={priority}
      quality={90}
      className={cn(
        "object-cover transition-transform duration-[6500ms] ease-out motion-reduce:transition-none",
        active ? "scale-105" : "scale-100",
      )}
    />
  );
}

function AlbumWindow({
  album,
  albumIndex,
  onOpen,
}: {
  album: GalleryAlbum;
  albumIndex: number;
  onOpen: (itemIndex: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView<HTMLElement>();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const total = album.items.length;
  const activeItem = album.items[index];

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
    if (paused || reducedMotion || !inView || total <= 1) {
      return;
    }

    const timer = window.setInterval(
      () => setIndex((previous) => (previous + 1) % total),
      AUTOPLAY_DELAY + albumIndex * 700,
    );

    return () => window.clearInterval(timer);
  }, [albumIndex, inView, paused, reducedMotion, total]);

  if (total === 0) {
    return null;
  }

  const hasVideo = album.items.some((item) => item.mediaType === "video");

  return (
    <article
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn(
        "group/window surface overflow-hidden rounded-[1.6rem] border-white/10 bg-navy-950/60 transition-[border-color,box-shadow] duration-500",
        "focus-within:border-gold-400/40 hover:border-gold-400/30",
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-white/[0.07] bg-white/[0.025] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex shrink-0 items-center gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400/90" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400/25" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[9px] font-bold uppercase tracking-[0.2em] text-gold-300">
              {album.category}
            </p>
            <h3 className="truncate font-display text-lg font-semibold leading-tight text-cream">
              {album.title}
            </h3>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {hasVideo ? (
            <span className="hidden items-center gap-1 rounded-full border border-gold-500/20 bg-gold-500/[0.08] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-gold-200 sm:inline-flex">
              <Video className="h-3 w-3" aria-hidden="true" />
              Vídeo
            </span>
          ) : null}
          <span
            className="rounded-full border border-white/10 bg-navy-950/60 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-sand"
          >
            {index + 1} / {total}
          </span>
          {total > 1 ? (
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={
                paused
                  ? `Retomar carrossel de ${album.title}`
                  : `Pausar carrossel de ${album.title}`
              }
              className="icon-button h-8 w-8 bg-navy-950/60"
            >
              {paused ? (
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          ) : null}
        </div>
      </header>

      <div
        role="region"
        aria-roledescription="carrossel"
        aria-label={`Galeria da ${album.title}`}
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
        className="relative aspect-[4/3] touch-pan-y overflow-hidden bg-navy-950 outline-none ring-gold-500/40 focus-visible:ring-2"
      >
        <div
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {album.items.map((item, itemIndex) => {
            const isActive = itemIndex === index;

            return (
              <div
                key={item.id}
                className="relative h-full w-full shrink-0"
                aria-hidden={!isActive}
              >
                <AlbumMedia
                  item={item}
                  active={isActive}
                  priority={albumIndex === 0 && itemIndex === 0}
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/5 to-transparent" />

                {isActive ? (
                  <button
                    type="button"
                    onClick={() => onOpen(itemIndex)}
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

                <span className="pointer-events-none absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-navy-950/70 text-gold-200 opacity-100 backdrop-blur-md transition-opacity duration-300 sm:opacity-0 sm:group-hover/window:opacity-100">
                  <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                </span>

                <span
                  className={cn(
                    "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4",
                    item.mediaType === "video" && "pb-12",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-gold-300">
                      {item.category}
                    </span>
                    <span className="mt-0.5 block truncate font-display text-xl font-semibold text-cream">
                      {item.caption}
                    </span>
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={`Foto anterior de ${album.title}`}
              className="icon-button absolute left-3 top-1/2 h-9 w-9 -translate-y-1/2 bg-navy-950/65 opacity-0 transition-opacity duration-300 group-hover/window:opacity-100 group-focus-within/window:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={`Próxima foto de ${album.title}`}
              className="icon-button absolute right-3 top-1/2 h-9 w-9 -translate-y-1/2 bg-navy-950/65 opacity-0 transition-opacity duration-300 group-hover/window:opacity-100 group-focus-within/window:opacity-100"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-white/[0.015] px-4 py-3">
        <p className="min-w-0 truncate text-xs text-mist/80">
          {album.subtitle}
        </p>
        {total > 1 ? (
          <div
            className="flex shrink-0 items-center gap-1.5"
            role="tablist"
            aria-label={`Selecionar foto de ${album.title}`}
          >
            {album.items.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={itemIndex === index}
                aria-label={`Ver: ${item.caption}`}
                onClick={() => setIndex(itemIndex)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  itemIndex === index
                    ? "w-5 bg-gold-400"
                    : "w-1.5 bg-white/25 hover:bg-white/50",
                )}
              />
            ))}
          </div>
        ) : (
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-300/70">
            {activeItem.mediaType === "video" ? "Vídeo" : "Foto"}
          </span>
        )}
      </footer>
    </article>
  );
}

export function GalleryWindows() {
  const [lightbox, setLightbox] = useState<{
    albumIndex: number;
    itemIndex: number;
  } | null>(null);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {galleryAlbums.map((album, albumIndex) => (
          <div
            key={album.id}
            className={cn(
              albumIndex < 2 ? "xl:col-span-2" : "xl:col-span-1",
            )}
          >
            <AlbumWindow
              album={album}
              albumIndex={albumIndex}
              onOpen={(itemIndex) => setLightbox({ albumIndex, itemIndex })}
            />
          </div>
        ))}
      </div>

      {lightbox ? (
        <GalleryLightbox
          items={galleryAlbums[lightbox.albumIndex].items}
          index={lightbox.itemIndex}
          onClose={() => setLightbox(null)}
          onNavigate={(itemIndex) =>
            setLightbox((current) =>
              current ? { ...current, itemIndex } : current,
            )
          }
        />
      ) : null}
    </>
  );
}
