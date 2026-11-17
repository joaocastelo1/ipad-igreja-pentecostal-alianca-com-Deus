import Link from "next/link";
import {
  ArrowRight,
  HandHeart,
  LockKeyhole,
  PenLine,
  Send,
} from "lucide-react";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    icon: PenLine,
    title: "Compartilhe",
    description: "Escreva o seu pedido com fé e sinceridade.",
  },
  {
    icon: Send,
    title: "Envie",
    description: "Seu pedido chega de forma segura à nossa equipe.",
  },
  {
    icon: HandHeart,
    title: "Oramos",
    description: "Intercedemos por você e pela sua família.",
  },
];

export function HomePrayer() {
  return (
    <section className="section-sm">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-gold-500/25 bg-gradient-to-br from-navy-800/70 via-navy-900 to-navy-950 px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div
              aria-hidden="true"
              className="bg-grid pointer-events-none absolute inset-0 opacity-40"
            />
            <Parallax
              speed={0.05}
              className="pointer-events-none absolute inset-0"
            >
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-fire-500/10 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full border border-gold-500/15"
              />
              <div
                aria-hidden="true"
                className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-gold-500/[0.06] blur-3xl"
              />
            </Parallax>

            <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <span className="eyebrow">Pedido de oração</span>
                <h2 className="display-title mt-5 max-w-xl text-[clamp(2.4rem,5.2vw,4rem)] text-cream">
                  Podemos orar{" "}
                  <span className="gold-text italic">com você?</span>
                </h2>
                <p className="text-pretty mt-5 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
                  Se você está enfrentando um momento difícil ou quer agradecer
                  por uma vitória, nossa equipe de intercessão está pronta para
                  orar por você.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/pedido-de-oracao" className="btn btn-primary">
                    Enviar meu pedido
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-mist/55">
                  <LockKeyhole
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-400"
                    aria-hidden="true"
                  />
                  Seu pedido não é exibido publicamente. Tratamos cada mensagem
                  com cuidado e confidencialidade.
                </p>
              </div>

              <div className="grid gap-3">
                {steps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.title}
                      className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-navy-950/45 p-4 backdrop-blur-sm"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.07] text-gold-300">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                          0{index + 1} · {step.title}
                        </p>
                        <p className="mt-1 text-sm text-sand/85">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
