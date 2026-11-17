"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Loader2,
  LockKeyhole,
  Send,
} from "lucide-react";
import { PRAYER_CATEGORY_OPTIONS } from "@/lib/prayer";
import { prayerRequestSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";
import type { PrayerCategory } from "@/types";

type FormValues = {
  name: string;
  whatsapp: string;
  email: string;
  category: PrayerCategory;
  request: string;
  consent: boolean;
  website: string;
};

type FormErrors = Partial<
  Record<
    "name" | "whatsapp" | "email" | "category" | "request" | "consent" | "form",
    string
  >
>;

const initialValues: FormValues = {
  name: "",
  whatsapp: "",
  email: "",
  category: "outros",
  request: "",
  consent: false,
  website: "",
};

const successMessage =
  "Seu pedido foi recebido! A Igreja Aliança com Deus estará em oração por você. Que Deus fortaleça sua fé e abençoe sua vida.";

const inputClass =
  "min-h-12 w-full rounded-xl border border-white/[0.09] bg-navy-950/60 px-4 py-3 text-[15px] text-cream outline-none transition-colors placeholder:text-mist/35 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-500/10";

export function PrayerForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [serverMessage, setServerMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] =
    useState(successMessage);
  const formRef = useRef<HTMLFormElement>(null);

  const update = <Key extends keyof FormValues>(
    key: Key,
    value: FormValues[Key],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerMessage("");

    const parsed = prayerRequestSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const nextErrors: FormErrors = {
        name: fieldErrors.name?.[0],
        whatsapp: fieldErrors.whatsapp?.[0],
        email: fieldErrors.email?.[0],
        category: fieldErrors.category?.[0],
        request: fieldErrors.request?.[0],
        consent: fieldErrors.consent?.[0],
        form: fieldErrors.website?.[0],
      };

      setErrors(nextErrors);

      const firstInvalid = (
        ["name", "whatsapp", "email", "category", "request", "consent"] as const
      ).find((field) => nextErrors[field]);

      if (firstInvalid) {
        document.getElementById(`prayer-${firstInvalid}`)?.focus();
      }

      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/pedido-de-oracao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            "Recebemos muitos pedidos em sequência. Aguarde alguns minutos e tente novamente.",
          );
        }

        throw new Error(
          data?.message ??
            "Não foi possível enviar seu pedido agora. Tente novamente em instantes.",
        );
      }

      setConfirmationMessage(data?.message ?? successMessage);
      setStatus("success");
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setStatus("idle");
      setServerMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar seu pedido agora. Tente novamente.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="surface relative overflow-hidden rounded-[1.75rem] px-6 py-14 text-center sm:px-12"
        role="status"
        aria-live="polite"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-52 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
        />
        <div className="relative mx-auto flex max-w-lg flex-col items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300">
            <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
          </span>
          <h2 className="display-title mt-6 text-3xl text-cream sm:text-4xl">
            Pedido recebido
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-mist sm:text-base">
            {confirmationMessage}
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="btn btn-outline mt-8"
          >
            Enviar outro pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="surface relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8 lg:p-10"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
      />

      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.07] text-gold-300">
          <LockKeyhole className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold text-cream">
            Envie seu pedido de oração
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-mist">
            Compartilhe o que está no seu coração. Estaremos orando por você.
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="prayer-website">Não preencha este campo</label>
        <input
          id="prayer-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      {serverMessage ? (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-fire-500/30 bg-fire-500/[0.08] px-4 py-3 text-sm text-fire-400"
        >
          <AlertCircle
            className="mt-0.5 h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          <p>{serverMessage}</p>
        </div>
      ) : null}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="prayer-name"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-sand"
          >
            Seu nome <span className="text-gold-400">*</span>
          </label>
          <input
            id="prayer-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Como podemos chamar você?"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "prayer-name-error" : undefined}
            className={cn(inputClass, errors.name && "border-fire-500/60")}
          />
          {errors.name ? (
            <p
              id="prayer-name-error"
              className="mt-1.5 text-xs text-fire-400"
            >
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="prayer-whatsapp"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-sand"
          >
            WhatsApp <span className="text-mist/50">(opcional)</span>
          </label>
          <input
            id="prayer-whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(98) 99999-9999"
            value={values.whatsapp}
            onChange={(event) => update("whatsapp", event.target.value)}
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={
              errors.whatsapp ? "prayer-whatsapp-error" : undefined
            }
            className={cn(
              inputClass,
              errors.whatsapp && "border-fire-500/60",
            )}
          />
          {errors.whatsapp ? (
            <p
              id="prayer-whatsapp-error"
              className="mt-1.5 text-xs text-fire-400"
            >
              {errors.whatsapp}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="prayer-email"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-sand"
          >
            E-mail <span className="text-mist/50">(opcional)</span>
          </label>
          <input
            id="prayer-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="voce@email.com"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "prayer-email-error" : undefined}
            className={cn(inputClass, errors.email && "border-fire-500/60")}
          />
          {errors.email ? (
            <p
              id="prayer-email-error"
              className="mt-1.5 text-xs text-fire-400"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="prayer-category"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-sand"
          >
            Categoria <span className="text-gold-400">*</span>
          </label>
          <div className="relative">
            <select
              id="prayer-category"
              name="category"
              value={values.category}
              onChange={(event) =>
                update("category", event.target.value as PrayerCategory)
              }
              aria-invalid={Boolean(errors.category)}
              aria-describedby={
                errors.category ? "prayer-category-error" : undefined
              }
              className={cn(
                inputClass,
                "appearance-none pr-10",
                errors.category && "border-fire-500/60",
              )}
            >
              {PRAYER_CATEGORY_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-navy-950 text-cream"
                >
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400"
              aria-hidden="true"
            />
          </div>
          {errors.category ? (
            <p
              id="prayer-category-error"
              className="mt-1.5 text-xs text-fire-400"
            >
              {errors.category}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between gap-4">
          <label
            htmlFor="prayer-request"
            className="block text-xs font-semibold uppercase tracking-[0.14em] text-sand"
          >
            Pedido de oração <span className="text-gold-400">*</span>
          </label>
          <span className="text-[10px] text-mist/40">
            {values.request.length}/2000
          </span>
        </div>
        <textarea
          id="prayer-request"
          name="request"
          rows={6}
          placeholder="Escreva aqui o seu pedido..."
          value={values.request}
          onChange={(event) => update("request", event.target.value)}
          aria-invalid={Boolean(errors.request)}
          aria-describedby={
            errors.request ? "prayer-request-error" : undefined
          }
          className={cn(
            inputClass,
            "min-h-36 resize-y",
            errors.request && "border-fire-500/60",
          )}
        />
        {errors.request ? (
          <p
            id="prayer-request-error"
            className="mt-1.5 text-xs text-fire-400"
          >
            {errors.request}
          </p>
        ) : null}
      </div>

      <div className="mt-6">
        <label
          htmlFor="prayer-consent"
          className={cn(
            "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3.5 text-xs leading-relaxed transition-colors",
            values.consent
              ? "border-gold-500/40 bg-gold-500/[0.06] text-sand"
              : "border-white/[0.08] bg-navy-950/40 text-mist hover:border-white/20",
            errors.consent && "border-fire-500/60",
          )}
        >
          <input
            id="prayer-consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={
              errors.consent ? "prayer-consent-error" : undefined
            }
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#c9a45c]"
          />
          <span>
            Autorizo o armazenamento dos meus dados para que a Igreja
            Pentecostal Aliança com Deus receba e interceda por este pedido,
            conforme a{" "}
            <Link
              href="/politica-de-privacidade"
              className="text-gold-300 underline decoration-gold-500/40 underline-offset-2 hover:text-gold-200"
            >
              Política de Privacidade
            </Link>
            . <span className="text-gold-400">*</span>
          </span>
        </label>
        {errors.consent ? (
          <p
            id="prayer-consent-error"
            className="mt-1.5 text-xs text-fire-400"
          >
            {errors.consent}
          </p>
        ) : null}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-mist/60">
        Seus dados são utilizados apenas para receber e interceder pelo seu
        pedido. Nenhum pedido é exibido publicamente. O WhatsApp e o e-mail são
        opcionais e servem apenas para eventual contato da equipe.
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        className="btn btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {status === "submitting" ? "Enviando..." : "Enviar pedido de oração"}
      </button>
    </form>
  );
}
