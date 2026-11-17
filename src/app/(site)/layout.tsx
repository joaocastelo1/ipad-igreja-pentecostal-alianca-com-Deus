import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AmbientBackground />
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <BackToTopButton />
      <WhatsAppButton />
    </>
  );
}
