"use client";

import { useActionState, useState } from "react";
import { AlertCircle, Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { loginAction, type LoginState } from "@/app/admin/login/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="mt-7 space-y-5">
      <div>
        <label
          htmlFor="admin-password"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-sand"
        >
          Senha de acesso
        </label>
        <div className="relative">
          <input
            id="admin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            autoFocus
            aria-invalid={Boolean(state.error)}
            aria-describedby={state.error ? "admin-login-error" : undefined}
            className="min-h-12 w-full rounded-xl border border-white/[0.09] bg-navy-950/60 px-4 py-3 pr-12 text-[15px] text-cream outline-none transition-colors placeholder:text-mist/35 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-500/10"
            placeholder="Digite a senha"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-mist/60 transition-colors hover:bg-white/5 hover:text-gold-300"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {state.error ? (
        <div
          id="admin-login-error"
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-fire-500/30 bg-fire-500/[0.08] px-4 py-3 text-sm text-fire-400"
        >
          <AlertCircle
            className="mt-0.5 h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          <p>{state.error}</p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <LogIn className="h-4 w-4" aria-hidden="true" />
        )}
        {pending ? "Entrando..." : "Entrar no painel"}
      </button>
    </form>
  );
}
