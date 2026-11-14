import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  MessageCircle,
  Quote,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

const embers = [
  { left: "8%", top: "22%", delay: "0s", duration: "9s", drift: "18px" },
  { left: "22%", top: "70%", delay: "1.2s", duration: "11s", drift: "-12px" },
  { left: "48%", top: "15%", delay: "2.4s", duration: "8s", drift: "20px" },
  { left: "64%", top: "78%", delay: "0.8s", duration: "10s", drift: "-16px" },
  { left: "78%", top: "32%", delay: "3.1s", duration: "12s", drift: "10px" },
  { left: "90%", top: "62%", delay: "1.8s", duration: "9s", drift: "-14px" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-16">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[32rem] w-[32rem] rounded-full bg-gold-500/[0.08] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/4 h-[26rem] w-[26rem] rounded-full bg-navy-700/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fire-500/[0.07] blur-3xl"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {embers.map((ember, index) => (
          <span
            key={index}
            className="ember"
            style={
              {
                left: ember.left,
                top: ember.top,
                "--delay": ember.delay,
                "--duration": ember.duration,
                "--drift": ember.drift,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14 xl:gap-20">
          <div className="max-w-2xl">
            <div
              className="animate-rise inline-flex items-center gap-3 rounded-full border border-gold-500/25 bg-gold-500/[0.055] py-2 pl-3 pr-4 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-300 backdrop-blur-md sm:text-[11px]"
              style={{ animationDelay: "0ms" }}
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-500/15">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
              </span>
              Igreja Pentecostal · {siteConfig.location}
            </div>

            <h1
              className="animate-rise display-title mt-7 text-[clamp(3.2rem,8.4vw,6.2rem)] text-cream"
              style={{ animationDelay: "90ms" }}
            >
              Uma Igreja
              <span className="gold-text mt-1 block italic">
                Alinhada com Deus
              </span>
            </h1>

            <p
              className="animate-rise text-pretty mt-7 max-w-xl text-base leading-relaxed text-sand/90 sm:text-lg"
              style={{ animationDelay: "180ms" }}
            >
              Uma história construída pela fé, marcada pelo evangelismo, pelas
              missões e pela busca pela presença do Espírito Santo.
            </p>
            <p
              className="animate-rise text-pretty mt-3 max-w-xl text-sm leading-relaxed text-mist sm:text-base"
              style={{ animationDelay: "240ms" }}
            >
              Conheça a Igreja Pentecostal Aliança com Deus e faça parte de uma
              família que busca viver a Palavra, anunciar o Evangelho e servir
              vidas.
            </p>

            <div
              className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "310ms" }}
            >
              <Link href="/sobre" className="btn btn-primary">
                Conheça nossa história
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Fale conosco
              </a>
            </div>

            <figure
              className="animate-rise mt-10 flex max-w-xl items-start gap-4 border-l border-gold-500/35 pl-5"
              style={{ animationDelay: "390ms" }}
            >
              <Quote
                className="mt-1 h-5 w-5 shrink-0 text-gold-500/70"
                aria-hidden="true"
              />
              <div>
                <blockquote className="font-display text-lg italic leading-snug text-sand sm:text-xl">
                  “{siteConfig.verses.hero.text}”
                </blockquote>
                <figcaption className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-400">
                  {siteConfig.verses.hero.reference}
                </figcaption>
              </div>
            </figure>
          </div>

          <div
            className="animate-fade relative mx-auto w-full max-w-[34rem] lg:mx-0"
            style={{ animationDelay: "180ms" }}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-3 rotate-[1.4deg] rounded-[2rem] border border-gold-500/20 sm:-inset-4"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2.5rem] border border-gold-500/[0.07] sm:-inset-8"
            />
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-gold-500/15"
            />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-gold-500/30 bg-navy-900 p-2 shadow-[0_35px_90px_-40px_rgba(0,0,0,0.95)]">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] sm:aspect-[5/5.1]">
                <Image
                  src="/images/igreja/igreja.webp"
                  alt="Membros da Igreja Pentecostal Aliança com Deus reunidos em frente à igreja em São Bernardo, Maranhão"
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 42vw"
                  className="object-cover object-[50%_42%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold-300">
                    Nossa família em Cristo
                  </p>
                  <p className="mt-1.5 max-w-xs font-display text-xl leading-tight text-cream sm:text-2xl">
                    Uma igreja que ora, adora e evangeliza.
                  </p>
                </div>
                <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-navy-950/60 px-3 py-1.5 text-[10px] font-medium text-sand backdrop-blur-md">
                  <MapPin
                    className="h-3 w-3 text-gold-300"
                    aria-hidden="true"
                  />
                  {siteConfig.city} · {siteConfig.stateCode}
                </div>
              </div>
            </div>

            <div className="animate-float absolute -bottom-7 -left-4 grid h-24 w-24 place-items-center rounded-full border border-gold-500/40 bg-black shadow-2xl sm:-left-8 sm:h-28 sm:w-28">
              <Image
                src="/images/logo/ipad-logo.webp"
                alt="Logo da Igreja Pentecostal Aliança com Deus"
                width={112}
                height={112}
                sizes="112px"
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="absolute -right-3 bottom-20 hidden rounded-2xl border border-gold-500/25 bg-navy-950/80 px-4 py-3 text-right backdrop-blur-md sm:block">
              <p className="font-display text-lg leading-none text-gold-300">
                Lucas 1:37
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-mist/60">
                Nada é impossível
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
