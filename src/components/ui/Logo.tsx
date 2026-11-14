import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  href?: string | null;
  onClick?: () => void;
};

const sizes = {
  sm: { box: "h-11 w-11", title: "text-sm", subtitle: "text-[9px]" },
  md: { box: "h-12 w-12 sm:h-[3.35rem] sm:w-[3.35rem]", title: "text-base", subtitle: "text-[9px]" },
  lg: { box: "h-16 w-16", title: "text-lg", subtitle: "text-[10px]" },
};

export function Logo({
  className,
  showWordmark = true,
  size = "md",
  priority = false,
  href = "/",
  onClick,
}: LogoProps) {
  const current = sizes[size];

  const content = (
    <>
      <span
        className={cn(
          "relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-black ring-1 ring-gold-500/50",
          current.box,
        )}
      >
        <Image
          src="/images/logo/ipad-logo.webp"
          alt=""
          width={108}
          height={108}
          sizes="80px"
          priority={priority}
          className="h-full w-full scale-[1.02] object-cover"
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
