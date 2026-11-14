import Link from "next/link";
import { ArrowUpRight, MessageCircle, Play } from "lucide-react";
import { VideoCard } from "@/components/cards/VideoCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { videoNote, videos } from "@/data/videos";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function HomeVideos() {
  return (
    <section className="section relative overflow-hidden border-y border-white/5 bg-navy-900/25">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Vídeos"
              title={
                <>
                  Palavra e adoração{" "}
                  <span className="gold-text italic">para você</span>
                </>
              }
              description="Mensagens, louvores e momentos especiais para edificar a sua fé, onde você estiver."
            />
          </Reveal>
          <Reveal delay={100}>
            <Link href="/videos" className="link-underline">
              Ver todos os vídeos
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {videos.length > 0 ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        ) : (
          <Reveal delay={120}>
            <div className="surface relative mt-10 flex flex-col items-center gap-8 overflow-hidden rounded-[1.75rem] p-7 sm:p-10 lg:flex-row lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fire-500/[0.07] blur-3xl"
              />
              <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl border border-gold-500/20 bg-navy-950 lg:w-72">
                <div className="bg-grid absolute inset-0 opacity-60" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,164,92,0.15),transparent_60%)]" />
                <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold-500/30 bg-gold-500/[0.08] text-gold-300">
                  <Play className="ml-1 h-6 w-6 fill-current" aria-hidden="true" />
                </span>
              </div>
              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                  Em breve
                </p>
                <h3 className="display-title mt-2 text-3xl text-cream sm:text-4xl">
                  Nosso canal de vídeos
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">
                  {videoNote}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={getWhatsAppLink(
                      "Olá! Gostaria de saber mais sobre os vídeos e a programação online da igreja.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <MessageCircle
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                    Falar com a igreja
                  </a>
                  <Link href="/videos" className="btn btn-outline btn-sm">
                    Página de vídeos
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
