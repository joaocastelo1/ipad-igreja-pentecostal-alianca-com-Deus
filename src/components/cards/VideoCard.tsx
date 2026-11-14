import Image from "next/image";
import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { VideoItem } from "@/types";

type VideoCardProps = {
  video: VideoItem;
  index: number;
};

export function VideoCard({ video, index }: VideoCardProps) {
  const url = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <Reveal delay={index * 80} as="article" className="h-full">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="surface card-hover group flex h-full flex-col overflow-hidden rounded-2xl"
      >
        <div className="relative aspect-video overflow-hidden bg-navy-800">
          <Image
            src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-navy-950/25 transition-colors group-hover:bg-navy-950/10" />
          <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-navy-950/70 text-cream backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold-400">
            {video.category}
          </span>
          <h3 className="mt-2 flex-1 font-display text-xl font-semibold text-cream">
            {video.title}
          </h3>
          <span className="mt-4 text-xs text-mist/60">{video.date}</span>
        </div>
      </a>
    </Reveal>
  );
}
