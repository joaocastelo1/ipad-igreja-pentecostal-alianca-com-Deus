import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  LockKeyhole,
  MessageCircle,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { PrayerForm } from "@/components/forms/PrayerForm";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/whatsapp";

const assurances = [
  {
    icon: LockKeyhole,
    title: "Confidencial",
    description:
      "Seu pedido não é exibido publicamente e é acessado apenas pela equipe responsável.",
  },
  {
    icon: Users,
    title: "Intercessão",
    description:
      "Nossa equipe recebe cada pedido com respeito e leva diante de Deus em oração.",
  },
  {
    icon: ShieldCheck,
    title: "Sem julgamentos",
    description:
      "Você pode compartilhar o que está em seu coração com liberdade e segurança.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Pedido de Oração",
  description:
    "Envie o seu pedido de oração à Igreja Pentecostal Aliança com Deus. Nossa equipe intercederá por você com respeito, fé e confidencialidade.",
  path: "/pedido-de-oracao",
});

export default function PedidoDeOracaoPage() {
  return (
    <>
      <PageHero
        eyebrow="Pedido de oração"
        currentPage="Pedido de Oração"
        title={
          <>
            Não precisa enfrentar{" "}
            <span className="gold-text italic">tudo sozinho</span>
          </>
        }
        description="Deus se importa com aquilo que toca o seu coração. Compartilhe o seu pedido e permita que oremos com você."
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <Reveal>
              <div className="relative overflow-hidden rounded-[1.5rem] border border-gold-500/20 bg-gradient-to-br from-navy-800/60 via-navy-900 to-navy-950 p-7">
                <div
                  aria-hidden="true"
                  className="bg-grid pointer-events-none absolute inset-0 opacity-40"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/10 blur-3xl"
                />
                <div className="relative">
                  <Quote
                    className="h-7 w-7 text-gold-500/70"
                    aria-hidden="true"
                  />
                  <blockquote className="mt-4 font-display text-2xl leading-snug text-cream sm:text-3xl">
                    “Não estejais ansiosos por coisa alguma; antes, em tudo,
                    pela oração e súplica, com ação de graças, sejam os vossos
                    pedidos conhecidos diante de Deus.”
                  </blockquote>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-400">
                    Filipenses 4:6
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80} className="mt-7">
              <h2 className="font-display text-2xl font-semibold text-cream">
                Oramos com você
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                A oração é uma das maiores expressões de amor de uma igreja.
                Se você está enfrentando uma enfermidade, uma decisão difícil,
                um problema familiar ou simplesmente precisa de força para
                continuar, escreva para nós.
              </p>
            </Reveal>

            <ul className="mt-7 space-y-3">
              {assurances.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.title} delay={100 + index * 70}>
                    <li className="flex gap-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gold-500/20 bg-gold-500/[0.06] text-gold-300">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-cream">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-mist">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={320}>
              <div className="mt-6 border-t border-white/[0.07] pt-6">
                <p className="text-xs text-mist/60">
                  Prefere conversar diretamente com alguém?
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={getWhatsAppLink(
                      "Olá! Gostaria de pedir oração e conversar com a igreja.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                  <Link href="/contato" className="btn btn-ghost btn-sm">
                    Outros contatos
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal direction="right">
            <PrayerForm />
          </Reveal>
        </div>
      </section>

      <section className="section relative overflow-hidden border-y border-white/5 bg-navy-900/25">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-30"
        />
        <div className="container-page relative">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-500/25 bg-gold-500/[0.07] text-gold-300 mx-auto">
                <HeartHandshake className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="display-title mt-5 text-3xl text-cream sm:text-4xl">
                Uma igreja que ora
              </h2>
              <p className="text-pretty mt-3 text-sm leading-relaxed text-mist sm:text-base">
                Interceder uns pelos outros é parte da nossa vida como família
                de Deus. Se você deseja conhecer a igreja e participar dos
                nossos encontros, será uma alegria receber você.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/cultos" className="btn btn-primary">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Ver programação de cultos
                </Link>
                <Link href="/sobre" className="btn btn-outline">
                  Conhecer a igreja
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
