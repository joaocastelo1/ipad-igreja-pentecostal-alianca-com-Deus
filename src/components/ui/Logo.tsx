import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoVariant = "crest" | "emblem";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: LogoVariant;
  priority?: boolean;
  href?: string | null;
  onClick?: () => void;
};

const assets: Record<
  LogoVariant,
  { src: string; width: number; height: number; sizes: string }
> = {
  crest: {
    src: "/images/logo/logo_p1.png",
    width: 500,
    height: 500,
    sizes: "112px",
  },
  emblem: {
    src: "/images/logo/ipad-logo.webp",
    width: 108,
    height: 108,
    sizes: "80px",
  },
};

const sizes = {
  sm: { box: "h-10 w-10", title: "text-sm", subtitle: "text-[9px]" },
  md: {
    box: "h-12 w-12 sm:h-14 sm:w-14",
    title: "text-base",
    subtitle: "text-[9px]",
  },
  lg: { box: "h-16 w-16", title: "text-lg", subtitle: "text-[10px]" },
  xl: {
    box: "h-20 w-20 sm:h-24 sm:w-24",
    title: "text-xl",
    subtitle: "text-[11px]",
  },
};

export function Logo({
  className,
  showWordmark = true,
  size = "md",
  variant = "crest",
  priority = false,
  href = "/",
  onClick,
}: LogoProps) {
  const current = sizes[size];
  const asset = assets[variant];

  const content = (
    <>
      <span
        className={cn(
          "relative grid shrink-0 place-items-center",
          variant === "emblem"
            ? "overflow-hidden rounded-full bg-black ring-1 ring-gold-500/50"
            : "drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]",
          current.box,
        )}
      >
        <Image
          src={asset.src}
          alt=""
          width={asset.width}
          height={asset.height}
          sizes={asset.sizes}
          priority={priority}
          className={cn(
            "h-full w-full",
            variant === "emblem" ? "object-cover" : "object-contain",
          )}
        />
      </span>
      {showWordmark ? (
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={cn(
              "font-display font-semibold tracking-[0.16em] text-cream",
              current.title,
            )}
          >
            IPAD
          </span>
          <span
            className={cn(
              "mt-1.5 uppercase leading-snug tracking-[0.16em] text-gold-400/85",
              current.subtitle,
            )}
          >
            Aliança com Deus
          </span>
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return (
      <span
        className={cn("inline-flex items-center gap-3", className)}
        aria-label="IPAD — Igreja Pentecostal Aliança com Deus"
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="IPAD — Igreja Pentecostal Aliança com Deus — Início"
      className={cn(
        "inline-flex items-center gap-3 rounded-full transition-opacity hover:opacity-90",
        className,
      )}
    >
      {content}
    </Link>
  );
}
