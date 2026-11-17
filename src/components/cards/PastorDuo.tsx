import Image from "next/image";
import { Flame, Sparkles } from "lucide-react";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { pastors } from "@/data/pastors";

export function PastorDuo() {
  const mainImage = pastors[0]?.image ?? pastors[1]?.image ?? null;

  return (
    <Reveal as="article" className="h-full">
      <div className="surface card-hover group relative overflow-hidden rounded-[1.75rem]">
        <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative aspect-[1280/1006] overflow-hidden bg-navy-900 lg:aspect-auto lg:h-full lg:min-h-[28rem]">
            {mainImage ? (
              <div className="absolute inset-0">
                <Image
                  src={mainImage}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="scale-110 object-cover opacity-40 blur-2xl"
                />
                <Parallax speed={-0.05} className="absolute inset-0">
                  <Image
                    src={mainImage}
                    alt="Pastores Presidentes Pedro e Simone"
                    fill
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center"
                  />
                </Parallax>
              </div>
            ) : (
              <div className="absolute inset-0">
                <div className="bg-grid absolute inset-0 opacity-60" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(201,164,92,0.16),transparent_55%)]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Flame className="h-8 w-8 text-fire-400/70" aria-hidden="true" />
                  <span className="mt-4 font-display text-[7rem] font-semibold leading-none text-gold-300/85">
                    P&amp;S
                  </span>
                </div>
              </div>
            )}

            <div className="absolute left-5 top-5 rounded-full border border-gold-500/25 bg-navy-950/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-300 backdrop-blur-md">
              Pastores Presidentes
            </div>
            <Sparkles
              className="absolute right-5 top-5 h-4 w-4 text-gold-500/50"
              aria-hidden="true"
            />
          </div>

          <div className="relative flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
              Pastores Presidentes{" "}
              <span className="gold-text italic">Pedro e Simone</span>
            </h2>

            <div className="mt-6 space-y-6">
              {pastors.map((pastor) => (
                <div
                  key={pastor.id}
                  className="border-l border-gold-500/25 pl-5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">
                    {pastor.role}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-cream">
                    {pastor.name}
                  </h3>
                  <p className="text-pretty mt-2 text-sm leading-relaxed text-mist">
                    {pastor.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
