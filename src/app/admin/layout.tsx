import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Painel administrativo",
    template: "%s | Painel IPAD",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-navy-950">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none fixed inset-0 opacity-25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-gold-500/[0.05] blur-3xl"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
