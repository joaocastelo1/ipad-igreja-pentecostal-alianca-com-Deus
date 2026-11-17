import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Database,
  ExternalLink,
  HandHeart,
  Inbox,
  Mail,
  MessageCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  TriangleAlert,
  X,
} from "lucide-react";
import { logoutAction } from "@/app/admin/login/actions";
import { updatePrayerStatusAction } from "@/app/admin/actions";
import { DeletePrayerForm } from "@/components/admin/DeletePrayerForm";
import { Logo } from "@/components/ui/Logo";
import { requireAdmin } from "@/lib/auth/server";
import {
  PRAYER_CATEGORY_LABELS,
  PRAYER_CATEGORY_OPTIONS,
  PRAYER_STATUSES,
  PRAYER_STATUS_LABELS,
  PRAYER_STATUS_STYLES,
  isPrayerCategory,
  isPrayerStatus,
} from "@/lib/prayer";
import {
  getPrayerStoreMode,
  listPrayerRequests,
} from "@/lib/prayer-store";
import { formatDateTime } from "@/lib/utils";
import type { PrayerRequest, PrayerStatus } from "@/types";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

const statusActionLabel: Record<PrayerStatus, string> = {
  recebido: "Reabrir",
  em_oracao: "Em oração",
  concluido: "Concluir",
};

const statusActionStyle: Record<PrayerStatus, string> = {
  recebido:
    "border-gold-500/25 bg-gold-500/[0.05] text-gold-300 hover:border-gold-500/45 hover:bg-gold-500/[0.1]",
  em_oracao:
    "border-sky-400/20 bg-sky-400/[0.05] text-sky-300 hover:border-sky-400/40 hover:bg-sky-400/[0.1]",
  concluido:
    "border-emerald-400/20 bg-emerald-400/[0.05] text-emerald-300 hover:border-emerald-400/40 hover:bg-emerald-400/[0.1]",
};

const statusActionIcon = {
  recebido: Inbox,
  em_oracao: Clock3,
  concluido: CheckCircle2,
} satisfies Record<PrayerStatus, typeof Inbox>;

const inputClass =
  "min-h-11 w-full rounded-xl border border-white/[0.08] bg-navy-950/60 px-3.5 py-2.5 text-sm text-cream outline-none transition-colors placeholder:text-mist/35 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-500/10";

function getSingle(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getDateFilter(value: string | string[] | undefined): string {
  const candidate = getSingle(value);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(candidate)) {
    return "";
  }

  return Number.isNaN(Date.parse(`${candidate}T12:00:00`)) ? "" : candidate;
}

function toLocalIsoDate(value: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Fortaleza",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function whatsappLink(phone: string, name: string) {
  const digits = phone.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Olá, ${name}! Aqui é da Igreja Pentecostal Aliança com Deus. Recebemos o seu pedido de oração e gostaríamos de falar com você.`,
  );

  return `https://wa.me/${digits}?text=${message}`;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const query = getSingle(params.q).trim().slice(0, 80);
  const rawCategory = getSingle(params.category);
  const category = isPrayerCategory(rawCategory) ? rawCategory : "";
  const rawStatus = getSingle(params.status);
  const status = isPrayerStatus(rawStatus) ? rawStatus : "";
  const from = getDateFilter(params.from);
  const to = getDateFilter(params.to);

  const storeMode = getPrayerStoreMode();
  let requests: PrayerRequest[] = [];
  let loadError = "";

  try {
    requests = await listPrayerRequests();
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Não foi possível carregar os pedidos.";
  }

  const normalizedQuery = normalize(query);
  const filteredRequests = requests.filter((item) => {
    if (normalizedQuery && !normalize(item.name).includes(normalizedQuery)) {
      return false;
    }

    if (category && item.category !== category) {
      return false;
    }

    if (status && item.status !== status) {
      return false;
    }

    const itemDate = toLocalIsoDate(item.createdAt);

    if (from && itemDate < from) {
      return false;
    }

    if (to && itemDate > to) {
      return false;
    }

    return true;
  });

  const hasFilters = Boolean(query || category || status || from || to);

  const stats = [
    {
      label: "Total recebido",
      value: requests.length,
      icon: Inbox,
    },
    {
      label: "Aguardando oração",
      value: requests.filter((item) => item.status === "recebido").length,
      icon: Clock3,
    },
    {
      label: "Em oração",
      value: requests.filter((item) => item.status === "em_oracao").length,
      icon: HandHeart,
    },
    {
      label: "Concluídos",
      value: requests.filter((item) => item.status === "concluido").length,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-dvh">
      <header className="border-b border-white/[0.06] bg-navy-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="hidden rounded-full border border-gold-500/20 bg-gold-500/[0.05] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-gold-300 sm:inline-flex">
              Painel
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-mist/60 transition-colors hover:text-gold-300 sm:inline-flex"
            >
              Ver site
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex min-h-9 items-center rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-mist transition-colors hover:border-fire-500/30 hover:text-fire-400"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-400">
              Área administrativa
            </p>
            <h1 className="display-title mt-2 text-4xl text-cream sm:text-5xl">
              Pedidos de oração
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">
              Acompanhe os pedidos recebidos pelo site. Este conteúdo é
              confidencial e deve ser tratado apenas pela equipe autorizada.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 text-[10px] font-semibold text-mist">
              <Database
                className="h-3.5 w-3.5 text-gold-400"
                aria-hidden="true"
              />
              {storeMode === "supabase"
                ? "Banco de dados conectado"
                : "Armazenamento local"}
            </span>
            <a
              href="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 text-[10px] font-semibold text-mist transition-colors hover:text-gold-300"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              Atualizar
            </a>
          </div>
        </div>

        {storeMode === "local" && process.env.NODE_ENV === "production" ? (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold-500/25 bg-gold-500/[0.06] px-4 py-3.5 text-sm text-gold-200">
            <TriangleAlert
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <p>
              O armazenamento local pode não persistir em produção. Configure o
              Supabase para garantir a guarda dos pedidos. Consulte o README.
            </p>
          </div>
        ) : null}

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.label} className="surface rounded-2xl p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-mist/60">
                    {stat.label}
                  </span>
                  <Icon
                    className="h-4 w-4 text-gold-500/70"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 font-display text-4xl font-semibold text-cream">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        <section
          className="surface mt-8 rounded-2xl p-5 sm:p-6"
          aria-labelledby="filtros-pedidos"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2
              id="filtros-pedidos"
              className="font-display text-xl font-semibold text-cream"
            >
              Filtrar pedidos
            </h2>
            {hasFilters ? (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-mist/60 transition-colors hover:text-gold-300"
              >
                <X className="h-3 w-3" aria-hidden="true" />
                Limpar filtros
              </Link>
            ) : null}
          </div>

          <form
            method="get"
            action="/admin"
            className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto]"
          >
            <div>
              <label
                htmlFor="filter-q"
                className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-sand"
              >
                Buscar por nome
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-mist/40"
                  aria-hidden="true"
                />
                <input
                  id="filter-q"
                  name="q"
                  type="search"
                  defaultValue={query}
                  placeholder="Nome do solicitante"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="filter-category"
                className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-sand"
              >
                Categoria
              </label>
              <select
                id="filter-category"
                name="category"
                defaultValue={category}
                className={inputClass}
              >
                <option value="" className="bg-navy-950 text-cream">
                  Todas
                </option>
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
            </div>

            <div>
              <label
                htmlFor="filter-status"
                className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-sand"
              >
                Status
              </label>
              <select
                id="filter-status"
                name="status"
                defaultValue={status}
                className={inputClass}
              >
                <option value="" className="bg-navy-950 text-cream">
                  Todos
                </option>
                {PRAYER_STATUSES.map((value) => (
                  <option
                    key={value}
                    value={value}
                    className="bg-navy-950 text-cream"
                  >
                    {PRAYER_STATUS_LABELS[value]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-from"
                className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-sand"
              >
                De
              </label>
              <input
                id="filter-from"
                name="from"
                type="date"
                defaultValue={from}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="filter-to"
                className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-sand"
              >
                Até
              </label>
              <input
                id="filter-to"
                name="to"
                type="date"
                defaultValue={to}
                className={inputClass}
              />
            </div>

            <div className="flex items-end">
              <button type="submit" className="btn btn-primary min-h-11 w-full">
                <Search className="h-4 w-4" aria-hidden="true" />
                Filtrar
              </button>
            </div>
          </form>
        </section>

        <section className="mt-10" aria-labelledby="lista-pedidos">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2
                id="lista-pedidos"
                className="font-display text-2xl font-semibold text-cream"
              >
                {hasFilters ? "Resultados" : "Todos os pedidos"}
              </h2>
              <p className="mt-1 text-xs text-mist/60">
                {requests.length === 0
                  ? "Nenhum registro"
                  : hasFilters
                    ? `${filteredRequests.length} de ${requests.length} registro(s)`
                    : `${requests.length} registro(s) • mais recentes primeiro`}
              </p>
            </div>
            <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-mist/50">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Acesso protegido
            </p>
          </div>

          {loadError ? (
            <div className="mt-5 rounded-2xl border border-fire-500/25 bg-fire-500/[0.06] p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-fire-400">
                <TriangleAlert className="h-4 w-4" aria-hidden="true" />
                Não foi possível carregar os pedidos
              </p>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {loadError} Verifique a configuração do banco de dados ou o
                arquivo local de armazenamento.
              </p>
            </div>
          ) : requests.length === 0 ? (
            <div className="surface mt-5 rounded-2xl px-6 py-14 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold-500/20 bg-gold-500/[0.06] text-gold-300">
                <Inbox className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-cream">
                Nenhum pedido recebido ainda
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mist">
                Quando alguém enviar um pedido pelo site, ele aparecerá aqui
                para acompanhamento da equipe.
              </p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="surface mt-5 rounded-2xl px-6 py-14 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold-500/20 bg-gold-500/[0.06] text-gold-300">
                <Search className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-cream">
                Nenhum pedido encontrado
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mist">
                Ajuste a busca ou os filtros para encontrar os pedidos
                desejados.
              </p>
              <Link href="/admin" className="btn btn-outline mt-6">
                Limpar filtros
              </Link>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {filteredRequests.map((item) => (
                <article
                  key={item.id}
                  className="surface rounded-2xl p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-500/20 bg-gold-500/[0.07] font-display text-lg font-semibold text-gold-300"
                      >
                        {item.name.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-xl font-semibold text-cream">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-mist/60">
                          <time dateTime={item.createdAt}>
                            {formatDateTime(item.createdAt)}
                          </time>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays
                              className="h-3 w-3"
                              aria-hidden="true"
                            />
                            {PRAYER_CATEGORY_LABELS[item.category]}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] ${PRAYER_STATUS_STYLES[item.status]}`}
                    >
                      {PRAYER_STATUS_LABELS[item.status]}
                    </span>
                  </div>

                  <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed text-sand/90">
                    {item.request}
                  </p>

                  <div className="mt-5 grid gap-3 border-t border-white/[0.06] pt-4 sm:grid-cols-2">
                    <div className="space-y-1.5 text-xs">
                      {item.whatsapp ? (
                        <a
                          href={whatsappLink(item.whatsapp, item.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-gold-300 underline-offset-2 hover:underline"
                        >
                          <MessageCircle
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          {item.whatsapp}
                          <ExternalLink
                            className="h-3 w-3"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        <p className="text-mist/40">WhatsApp não informado</p>
                      )}

                      {item.email ? (
                        <a
                          href={`mailto:${item.email}`}
                          className="flex items-center gap-1.5 text-mist/80 underline-offset-2 hover:text-gold-300 hover:underline"
                        >
                          <Mail
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          {item.email}
                        </a>
                      ) : (
                        <p className="text-mist/40">E-mail não informado</p>
                      )}
                    </div>

                    <p className="text-[11px] leading-relaxed text-mist/50 sm:text-right">
                      {item.consentAt
                        ? `Consentimento registrado em ${formatDateTime(item.consentAt)}`
                        : "Consentimento não registrado"}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {PRAYER_STATUSES.filter(
                        (value) => value !== item.status,
                      ).map((value) => {
                        const Icon = statusActionIcon[value];

                        return (
                          <form key={value} action={updatePrayerStatusAction}>
                            <input type="hidden" name="id" value={item.id} />
                            <input type="hidden" name="status" value={value} />
                            <button
                              type="submit"
                              className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors ${statusActionStyle[value]}`}
                            >
                              <Icon
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                              {statusActionLabel[value]}
                            </button>
                          </form>
                        );
                      })}
                    </div>

                    <DeletePrayerForm id={item.id} name={item.name} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <p className="mt-10 flex items-start gap-2 border-t border-white/[0.06] pt-6 text-[11px] leading-relaxed text-mist/45">
          <ShieldCheck
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500/60"
            aria-hidden="true"
          />
          Os pedidos de oração são confidenciais. Não compartilhe este conteúdo
          fora da equipe pastoral autorizada.
        </p>
      </main>
    </div>
  );
}
