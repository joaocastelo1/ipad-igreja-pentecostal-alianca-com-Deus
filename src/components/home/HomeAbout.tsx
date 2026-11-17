import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { history, timeline } from "@/data/about";

const steps = ["Chamado", "Fé", "Obediência", "Evangelismo", "Missões", "Crescimento"];

export function HomeAbout() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 xl:gap-24">
          <Reveal direction="left" className="relative order-2 lg:order-1">
            <Parallax
              speed={0.05}
              className="pointer-events-none absolute -inset-8 -z-10"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[2.4rem] bg-gold-500/[0.06] blur-3xl"
              />
            </Parallax>
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[1.8rem] border border-gold-500/15"
            />
            <div className="relative overflow-hidden rounded-[1.4rem] border border-gold-500/25 bg-navy-900">
              <div className="relative aspect-[4/3] min-h-[10.5rem] overflow-hidden sm:min-h-0">
                <div className="absolute inset-x-0 -inset-y-[7%]">
                  <Image
                    src="/images/sede-ipad-2.jpeg"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 1024px) 92vw, 42vw"
                    className="scale-110 object-cover opacity-50 blur-2xl"
                  />
                  <Parallax speed={-0.06} className="absolute inset-0">
                    <Image
                      src="/images/sede-ipad-2.jpeg"
                      alt="Pastor ministrando a Palavra para a congregação reunida na Sede IPAD"
                      fill
                      sizes="(max-width: 1024px) 92vw, 42vw"
                      quality={90}
                      className="object-cover"
                    />
                  </Parallax>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/10" />
              </div>
              <div className="absolute left-5 top-5 rounded-full border border-gold-500/30 bg-navy-950/70 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gold-300 backdrop-blur-md">
                Nossa casa de fé
              </div>
            </div>

            <figure className="surface relative mt-4 ml-auto mr-4 max-w-xs rounded-2xl p-5 shadow-2xl sm:-mt-8 sm:mr-8 sm:p-6">
              <Quote
                className="h-5 w-5 text-gold-500/70"
                aria-hidden="true"
              />
              <blockquote className="mt-3 font-display text-lg leading-snug text-sand">
                {history.quote}
              </blockquote>
              <figcaption className="mt-3 text-[9px] font-bold uppercase tracking-[0.2em] text-gold-400">
                Igreja Pentecostal Aliança com Deus
              </figcaption>
            </figure>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <SectionHeading
                eyebrow={history.eyebrow}
                title={
                  <>
                    Uma história que começou{" "}
                    <span className="gold-text italic">pela fé</span>
                  </>
                }
                description={history.lead}
              />
            </Reveal>

            <Reveal delay={100} className="prose-church mt-7 max-w-xl text-sm sm:text-base">
              <p>{history.paragraphs[0]}</p>
              <p>{history.paragraphs[1]}</p>
            </Reveal>

            <Reveal delay={160} className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                A caminhada
              </p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-[11px] font-medium text-sand/80">
                {steps.map((step, index) => (
                  <span key={step} className="inline-flex items-center gap-3">
                    {index > 0 ? (
                      <span aria-hidden="true" className="text-gold-500/50">
                        →
                      </span>
                    ) : null}
                    {step}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={220} className="mt-9">
              <Link href="/sobre" className="btn btn-outline">
                Conheça nossa história
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {timeline.slice(0, 3).map((item, index) => (
            <Reveal key={item.step} delay={index * 80}>
              <div className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <span className="font-display text-2xl font-semibold text-gold-500/60">
                  {item.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-cream">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-mist">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
