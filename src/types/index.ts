export type NavItem = {
  label: string;
  href: string;
};

export type SocialPlatform = "instagram" | "facebook" | "youtube";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

export type MissionIcon =
  | "prayer"
  | "word"
  | "fire"
  | "evangelism"
  | "missions"
  | "family";

export type MinistryIcon =
  | "megaphone"
  | "globe"
  | "hand-heart"
  | "music"
  | "sparkles"
  | "users"
  | "book-open"
  | "heart-handshake";

export type Ministry = {
  slug: string;
  name: string;
  description: string;
  icon: MinistryIcon;
  verse?: string;
};

export type Service = {
  id: string;
  day: string;
  title: string;
  time: string;
  description: string;
  location: string;
  highlighted?: boolean;
};

export type TimelineStep = {
  step: string;
  title: string;
  description: string;
};

export type MissionPillar = {
  title: string;
  description: string;
  icon: MissionIcon;
};

export type Pastor = {
  id: string;
  name: string;
  role: string;
  monogram: string;
  bio: string;
  image: string | null;
};

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string | null;
  featured?: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  date?: string;
  category?: string;
  photo?: string | null;
};

export type GalleryCategory =
  | "Comunidade"
  | "Cultos"
  | "Evangelismo"
  | "Missões"
  | "Eventos"
  | "Batismos"
  | "Famílias";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  width: number;
  height: number;
};

export type VideoItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  youtubeId: string;
};

export type PrayerRequest = {
  id: string;
  name: string;
  whatsapp: string | null;
  request: string;
  wantsContact: boolean;
  status: "new" | "read" | "prayed";
  createdAt: string;
};
