import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryNote, galleryItems } from "@/data/gallery";

export function HomeGallery() {
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.slice(0, 3).map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 80}
              className={
                index === 0 ? "sm:col-span-2 lg:col-span-2" : "sm:col-span-1"
              }
            >
              <Link
                href="/galeria"
                className="group relative block h-64 overflow-hidden rounded-2xl border border-white/[0.08] bg-navy-900 sm:h-72 lg:h-80"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-300">
                    {item.category}
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold text-cream">
                    {item.caption}
                  </p>
                </div>
                <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-navy-950/50 text-cream opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                  <Images className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="mt-6 text-center text-xs text-mist/50">{galleryNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
