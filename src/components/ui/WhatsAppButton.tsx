import { getWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Igreja Pentecostal Aliança com Deus pelo WhatsApp"
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-3 rounded-full sm:right-6"
    >
      <span className="hidden max-w-0 items-center overflow-hidden whitespace-nowrap rounded-full border border-gold-500/25 bg-navy-900/95 py-2.5 pl-4 pr-5 text-xs font-semibold text-cream shadow-xl backdrop-blur-md transition-all duration-300 group-hover:max-w-[12rem] group-focus-visible:max-w-[12rem] sm:flex">
        Fale conosco
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-[#052012] shadow-[0_16px_40px_-12px_rgba(37,211,102,0.55)] ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105">
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/25 [animation-duration:2.8s]"
        />
        <WhatsAppIcon className="h-7 w-7" />
      </span>
    </a>
  );
}
