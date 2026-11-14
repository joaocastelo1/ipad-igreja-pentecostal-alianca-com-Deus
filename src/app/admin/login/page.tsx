import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import { LoginForm } from "@/app/admin/login/LoginForm";
import { Logo } from "@/components/ui/Logo";
import { getAdminSession } from "@/lib/auth/server";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-md">
        <div className="surface relative overflow-hidden rounded-[1.75rem] p-7 sm:p-9">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
          />
          <Logo href={null} size="lg" />

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/[0.05] px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-gold-300">
            <LockKeyhole className="h-3 w-3" aria-hidden="true" />
            Área restrita
          </div>

          <h1 className="display-title mt-4 text-4xl text-cream">
            Painel administrativo
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            Acesso exclusivo da equipe autorizada da Igreja Pentecostal Aliança
            com Deus.
          </p>

          <LoginForm />

          <p className="mt-6 flex items-start gap-2 border-t border-white/[0.07] pt-5 text-[11px] leading-relaxed text-mist/55">
            <ShieldCheck
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500/70"
              aria-hidden="true"
            />
            A sessão expira automaticamente após 8 horas. Nunca compartilhe a
            senha de acesso.
          </p>
        </div>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-mist/60 transition-colors hover:text-gold-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Voltar ao site
        </Link>
      </div>
    </div>
  );
}
