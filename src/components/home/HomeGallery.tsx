"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Images,
  Pause,
  Play,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryNote, galleryPhotos } from "@/data/gallery";
import { cn } from "@/lib/utils";

const AUTOPLAY_DELAY = 5000;

export function HomeGallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const total = galleryPhotos.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  const go = useCallback(
    (direction: -1 | 1) => {
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

  return (
    <section className="section">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Galeria"
              title={
                <>
                  Momentos da nossa{" "}
                  <span className="gold-text italic">família</span>
                </>
              }
              description="Registros de fé, comunhão e vidas que fazem parte desta história."
            />
          </Reveal>
          <Reveal delay={100}>
            <Link href="/galeria" className="link-underline">
              Ver galeria completa
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={140} className="mt-12">
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
              {galleryPhotos.map((item, itemIndex) => (
                <div
                  key={item.id}
                  className="relative w-full shrink-0"
                  aria-hidden={itemIndex !== index}
                >
                  <div className="relative h-[64vw] min-h-[19rem] max-h-[32rem] bg-black/40 sm:h-[44vw] lg:h-[30rem]">
                    <Image
                      src={item.src}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 1024px) 92vw, 76rem"
                      className="scale-110 object-cover opacity-45 blur-2xl"
                    />
                    <span className="absolute inset-0 bg-navy-950/40" />
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 76rem"
                      className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                      priority={itemIndex === 0}
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/5 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-7">
                      <span>
                        <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gold-300">
                          {item.category}
                        </span>
                        <span className="mt-1 block font-display text-2xl font-semibold text-cream sm:text-3xl">
                          {item.caption}
                        </span>
                      </span>
                      <Link
                        href="/galeria"
                        aria-label="Ver galeria completa"
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold-500/30 bg-navy-950/70 text-gold-300 backdrop-blur-md transition-colors hover:bg-gold-500/15"
                      >
                        <Images className="h-4 w-4" aria-hidden="true" />
                      </Link>
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

            <div className="absolute inset-x-0 bottom-20 hidden justify-center gap-1.5 sm:flex">
              {galleryPhotos.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(itemIndex)}
                  aria-label={`Ver foto: ${item.caption}`}
                  aria-current={itemIndex === index}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    itemIndex === index
                      ? "w-7 bg-gold-400"
                      : "w-2.5 bg-white/30 hover:bg-white/60",
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 text-center text-xs text-mist/50">{galleryNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
