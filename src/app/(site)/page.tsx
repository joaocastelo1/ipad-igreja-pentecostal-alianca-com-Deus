import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { QuickInfo } from "@/components/home/QuickInfo";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomePastors } from "@/components/home/HomePastors";
import { HomeMission } from "@/components/home/HomeMission";
import { HomeMinistries } from "@/components/home/HomeMinistries";
import { HomeServices } from "@/components/home/HomeServices";
import { MissionsBand } from "@/components/home/MissionsBand";
import { HomeEvents } from "@/components/home/HomeEvents";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { HomeGallery } from "@/components/home/HomeGallery";
import { HomeVideos } from "@/components/home/HomeVideos";
import { HomePrayer } from "@/components/home/HomePrayer";
import { HomeContact } from "@/components/home/HomeContact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickInfo />
      <HomeAbout />
      <HomePastors />
      <HomeMission />
      <HomeMinistries />
      <HomeServices />
      <MissionsBand />
      <HomeEvents />
      <HomeTestimonials />
      <HomeGallery />
      <HomeVideos />
      <HomePrayer />
      <HomeContact />
    </>
  );
}
