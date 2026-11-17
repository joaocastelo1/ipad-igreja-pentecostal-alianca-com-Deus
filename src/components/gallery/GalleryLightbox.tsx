"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
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

type Point = { x: number; y: number };

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;
const SWIPE_NAVIGATE = 60;
const SWIPE_CLOSE = 110;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function GalleryLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [drag, setDrag] = useState<Point>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const scaleRef = useRef(1);
  const offsetRef = useRef<Point>({ x: 0, y: 0 });
  const lastTap = useRef(0);
  const suppressClick = useRef(false);
  const lastPointerType = useRef("mouse");
  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef({
    mode: "none" as "none" | "pan" | "pinch" | "swipe",
    startX: 0,
    startY: 0,
    startOffset: { x: 0, y: 0 } as Point,
    startDistance: 0,
    startScale: 1,
    startCenter: { x: 0, y: 0 } as Point,
    lastX: 0,
    lastY: 0,
    moved: false,
  });
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const total = items.length;
  const item = items[index];
  const isVideo = item?.mediaType === "video";

  const clampOffset = useCallback((next: Point, nextScale: number): Point => {
    const element = viewportRef.current;

    if (!element) {
      return next;
    }

    const rect = element.getBoundingClientRect();
    const maxX = Math.max(0, (rect.width * (nextScale - 1)) / 2);
    const maxY = Math.max(0, (rect.height * (nextScale - 1)) / 2);

    return {
      x: clamp(next.x, -maxX, maxX),
      y: clamp(next.y, -maxY, maxY),
    };
  }, []);

  const resetView = useCallback(() => {
    scaleRef.current = 1;
    offsetRef.current = { x: 0, y: 0 };
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setDrag({ x: 0, y: 0 });
    setDragging(false);
  }, []);

  const applyScale = useCallback(
    (nextScale: number, focus?: Point) => {
      const current = scaleRef.current;
      const next = clamp(nextScale, MIN_SCALE, MAX_SCALE);

      if (Math.abs(next - current) < 0.001) {
        return;
      }

      scaleRef.current = next;
      setScale(next);

      setOffset((previous) => {
        if (next <= MIN_SCALE) {
          offsetRef.current = { x: 0, y: 0 };
          return { x: 0, y: 0 };
        }

        const element = viewportRef.current;

        if (focus && element) {
          const rect = element.getBoundingClientRect();
          const focusX = focus.x - rect.left - rect.width / 2;
          const focusY = focus.y - rect.top - rect.height / 2;
          const ratio = next / current;
          const nextOffset = clampOffset(
            {
              x: (previous.x - focusX) * ratio + focusX,
              y: (previous.y - focusY) * ratio + focusY,
            },
            next,
          );
          offsetRef.current = nextOffset;
          return nextOffset;
        }

        const nextOffset = clampOffset(previous, next);
        offsetRef.current = nextOffset;
        return nextOffset;
      });
    },
    [clampOffset],
  );

  const toggleZoom = useCallback(
    (focus?: Point) => {
      if (scaleRef.current > 1) {
        resetView();
        return;
      }

      applyScale(DOUBLE_TAP_SCALE, focus);
    },
    [applyScale, resetView],
  );

  const navigate = useCallback(
    (nextIndex: number) => {
      resetView();
      onNavigate(nextIndex);
    },
    [onNavigate, resetView],
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
    thumbRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [index]);

  useEffect(() => {
    restoreFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${scrollbar}px`;
    }

    const timer = window.setTimeout(() => closeRef.current?.focus(), 30);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
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

      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        applyScale(scaleRef.current + 0.5);
        return;
      }

      if (event.key === "-") {
        event.preventDefault();
        applyScale(scaleRef.current - 0.5);
        return;
      }

      if (event.key === "0") {
        event.preventDefault();
        resetView();
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
  }, [applyScale, go, onClose, resetView]);

  useEffect(() => {
    const element = viewportRef.current;

    if (!element || isVideo) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const factor = event.deltaY < 0 ? 1.16 : 1 / 1.16;
      applyScale(scaleRef.current * factor, {
        x: event.clientX,
        y: event.clientY,
      });
    };

    element.addEventListener("wheel", onWheel, { passive: false });

    return () => element.removeEventListener("wheel", onWheel);
  }, [applyScale, isVideo]);

  if (!item) {
    return null;
  }

  const changeBy = (delta: number) => {
    applyScale(scaleRef.current + delta);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isVideo) {
      return;
    }

    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    lastPointerType.current = event.pointerType;

    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      gesture.current = {
        mode: "pinch",
        startX: 0,
        startY: 0,
        startOffset: offsetRef.current,
        startDistance: Math.hypot(b.x - a.x, b.y - a.y),
        startScale: scaleRef.current,
        startCenter: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
        lastX: 0,
        lastY: 0,
        moved: true,
      };
      setDragging(true);
      return;
    }

    gesture.current = {
      mode: scaleRef.current > 1 ? "pan" : "swipe",
      startX: event.clientX,
      startY: event.clientY,
      startOffset: offsetRef.current,
      startDistance: 0,
      startScale: scaleRef.current,
      startCenter: { x: event.clientX, y: event.clientY },
      lastX: 0,
      lastY: 0,
      moved: false,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isVideo || !pointers.current.has(event.pointerId)) {
      return;
    }

    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    const active = gesture.current;

    if (active.mode === "pinch" && pointers.current.size >= 2) {
      event.preventDefault();
      const [a, b] = Array.from(pointers.current.values());
      const distance = Math.hypot(b.x - a.x, b.y - a.y);
      const ratio = distance / (active.startDistance || distance);
      const nextScale = clamp(active.startScale * ratio, MIN_SCALE, MAX_SCALE);
      const centerX = (a.x + b.x) / 2;
      const centerY = (a.y + b.y) / 2;
      const nextOffset = clampOffset(
        {
          x: active.startOffset.x + (centerX - active.startCenter.x),
          y: active.startOffset.y + (centerY - active.startCenter.y),
        },
        nextScale,
      );

      scaleRef.current = nextScale;
      offsetRef.current = nextOffset;
      setScale(nextScale);
      setOffset(nextOffset);
      return;
    }

    if (active.mode === "pan" && pointers.current.size === 1) {
      const deltaX = event.clientX - active.startX;
      const deltaY = event.clientY - active.startY;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        active.moved = true;
        setDragging(true);
      }

      const nextOffset = clampOffset(
        {
          x: active.startOffset.x + deltaX,
          y: active.startOffset.y + deltaY,
        },
        scaleRef.current,
      );

      offsetRef.current = nextOffset;
      setOffset(nextOffset);
      return;
    }

    if (active.mode === "swipe" && pointers.current.size === 1) {
      const deltaX = event.clientX - active.startX;
      const deltaY = event.clientY - active.startY;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        active.moved = true;
      }

      active.lastX = deltaX;
      active.lastY = deltaY;
      setDrag({ x: deltaX, y: deltaY });
    }
  };

  const endGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const wasPinching = gesture.current.mode === "pinch";
    const active = gesture.current;
    pointers.current.delete(event.pointerId);

    if (wasPinching && pointers.current.size < 2) {
      if (pointers.current.size === 0) {
        if (scaleRef.current <= MIN_SCALE + 0.05) {
          resetView();
        }
        gesture.current.mode = "none";
        setDragging(false);
      }
      return;
    }

    if (pointers.current.size > 0) {
      return;
    }

    gesture.current.mode = "none";
    setDragging(false);

    if (active.mode === "swipe") {
      const x = active.lastX;
      const y = active.lastY;

      if (Math.abs(x) > SWIPE_NAVIGATE && Math.abs(x) > Math.abs(y)) {
        setDrag({ x: 0, y: 0 });
        go(x < 0 ? 1 : -1);
        return;
      }

      if (y > SWIPE_CLOSE && y > Math.abs(x)) {
        setDrag({ x: 0, y: 0 });
        onClose();
        return;
      }

      setDrag({ x: 0, y: 0 });

      if (!active.moved && event.pointerType !== "mouse") {
        const now = Date.now();

        if (now - lastTap.current < 300) {
          lastTap.current = 0;
          toggleZoom({ x: event.clientX, y: event.clientY });
        } else {
          lastTap.current = now;
        }
      }

      return;
    }

    if (active.mode === "pan" && active.moved) {
      suppressClick.current = true;
      window.setTimeout(() => {
        suppressClick.current = false;
      }, 250);
    }
  };

  const onImageClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (isVideo || lastPointerType.current !== "mouse") {
      return;
    }

    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }

    toggleZoom({ x: event.clientX, y: event.clientY });
  };

  const zoomPercent = Math.round(scale * 100);
  const instruction = isVideo
    ? "Use os controles do vídeo · Setas para navegar"
    : scale > 1
      ? "Arraste para mover · Pinça para ajustar o zoom"
      : "Arraste, use as setas · Duplo toque para ampliar";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ampliada: ${item.caption}`}
      className="fixed inset-0 z-[100] flex flex-col overscroll-contain bg-navy-950/96 backdrop-blur-xl"
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

      <header className="relative flex items-start justify-between gap-3 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:py-5">
        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-300">
            {item.category}
          </p>
          <h2 className="mt-1 truncate font-display text-lg font-semibold text-cream sm:text-2xl">
            {item.caption}
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <span
            aria-live="polite"
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-sand sm:px-3"
          >
            {index + 1} / {total}
          </span>
          {!isVideo ? (
            <button
              type="button"
              onClick={() => toggleZoom()}
              aria-label={
                scale > 1 ? "Reduzir foto" : "Ampliar foto"
              }
              aria-pressed={scale > 1}
              className="icon-button bg-navy-950/70"
            >
              {scale > 1 ? (
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

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Foto anterior"
          className="icon-button absolute left-1.5 top-1/2 z-30 h-11 w-11 -translate-y-1/2 bg-navy-950/80 sm:left-6 sm:h-12 sm:w-12"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </button>

        <div
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endGesture}
          onPointerCancel={endGesture}
          onClick={onImageClick}
          className={cn(
            "relative flex h-full w-full touch-none select-none items-center justify-center py-2",
            isVideo && "touch-auto",
            scale > 1 ? "cursor-grab" : "cursor-zoom-in",
            dragging && "cursor-grabbing",
          )}
          style={{ transition: dragging ? "none" : undefined }}
        >
          <div
            className="relative flex h-full w-full items-center justify-center"
            style={{
              transform:
                scale > 1
                  ? `translate3d(${offset.x}px, ${offset.y}px, 0)`
                  : `translate3d(${drag.x * 0.35}px, ${drag.y}px, 0)`,
              opacity:
                scale === 1 && drag.y > 0
                  ? clamp(1 - drag.y / 420, 0.55, 1)
                  : 1,
              transition: dragging
                ? "none"
                : "transform 0.35s cubic-bezier(0.2,0.7,0.2,1), opacity 0.3s ease",
            }}
          >
            {isVideo ? (
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
              <div
                className="relative h-full w-full overflow-hidden"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "center center",
                  transition: dragging
                    ? "none"
                    : "transform 0.3s cubic-bezier(0.2,0.7,0.2,1)",
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="100vw"
                  quality={90}
                  priority
                  draggable={false}
                  className="select-none object-contain"
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Próxima foto"
          className="icon-button absolute right-1.5 top-1/2 z-30 h-11 w-11 -translate-y-1/2 bg-navy-950/80 sm:right-6 sm:h-12 sm:w-12"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </button>

        {!isVideo && scale > 1 ? (
          <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-navy-950/80 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-sand backdrop-blur-md">
            <button
              type="button"
              onClick={() => changeBy(-0.5)}
              aria-label="Diminuir zoom"
              className="pointer-events-auto grid h-7 w-7 place-items-center rounded-full text-sand transition-colors hover:bg-white/10"
            >
              <ZoomOut className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <span aria-live="polite" className="min-w-10 text-center">
              {zoomPercent}%
            </span>
            <button
              type="button"
              onClick={() => changeBy(0.5)}
              aria-label="Aumentar zoom"
              className="pointer-events-auto grid h-7 w-7 place-items-center rounded-full text-sand transition-colors hover:bg-white/10"
            >
              <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={resetView}
              aria-label="Restaurar zoom"
              className="pointer-events-auto grid h-7 w-7 place-items-center rounded-full text-sand transition-colors hover:bg-white/10"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>

      <footer className="relative border-t border-white/10 bg-navy-950/60 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md sm:px-8 sm:py-4">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-[11px] leading-relaxed text-mist/75 sm:text-left sm:text-xs">
            {instruction}
          </p>

          <div
            className="no-scrollbar flex snap-x snap-proximity gap-2 overflow-x-auto pb-1"
            aria-label="Miniaturas da galeria ampliada"
          >
            {items.map((thumb, thumbIndex) => {
              const active = thumbIndex === index;

              return (
                <button
                  key={thumb.id}
                  ref={(element) => {
                    thumbRefs.current[thumbIndex] = element;
                  }}
                  type="button"
                  onClick={() => navigate(thumbIndex)}
                  aria-label={`Ver: ${thumb.caption}`}
                  aria-current={active}
                  className={cn(
                    "relative h-11 w-14 shrink-0 snap-center overflow-hidden rounded-lg border transition duration-300",
                    "min-h-11 sm:h-14 sm:w-20",
                    active
                      ? "border-gold-400/70 opacity-100 ring-2 ring-gold-400/30"
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
