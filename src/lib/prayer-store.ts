import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { PrayerRequest } from "@/types";
import type { PrayerRequestInput } from "@/lib/validation";

export type PrayerStatus = PrayerRequest["status"];
export type PrayerStoreMode = "supabase" | "local";

type SupabaseConfig = {
  url: string;
  key: string;
  table: string;
};

type SupabaseRow = {
  id: string;
  name: string;
  whatsapp: string | null;
  request: string;
  wants_contact: boolean;
  status: PrayerStatus;
  created_at: string;
};

const LOCAL_FILE = path.join(
  process.cwd(),
  ".data",
  "prayer-requests.json",
);

const UUID_PATTERN =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

let fileQueue: Promise<unknown> = Promise.resolve();

function getSupabaseConfig(): SupabaseConfig | null {
  const rawUrl =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const rawTable = process.env.PRAYER_TABLE ?? "prayer_requests";

  if (!rawUrl || !key) {
    return null;
  }

  const table = /^[a-z_][a-z0-9_]*$/i.test(rawTable)
    ? rawTable
    : "prayer_requests";

  return {
    url: rawUrl.replace(/\/$/, ""),
    key,
    table,
  };
}

export function getPrayerStoreMode(): PrayerStoreMode {
  return getSupabaseConfig() ? "supabase" : "local";
}

function isPrayerStatus(value: unknown): value is PrayerStatus {
  return value === "new" || value === "read" || value === "prayed";
}

function mapSupabaseRow(row: SupabaseRow): PrayerRequest {
  return {
    id: row.id,
    name: row.name,
    whatsapp: row.whatsapp || null,
    request: row.request,
    wantsContact: Boolean(row.wants_contact),
    status: isPrayerStatus(row.status) ? row.status : "new",
    createdAt: row.created_at,
  };
}

function isPrayerRequest(value: unknown): value is PrayerRequest {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<PrayerRequest>;

  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    (item.whatsapp === null || typeof item.whatsapp === "string") &&
    typeof item.request === "string" &&
    typeof item.wantsContact === "boolean" &&
    isPrayerStatus(item.status) &&
    typeof item.createdAt === "string"
  );
}

async function supabaseRequest(
  config: SupabaseConfig,
  query: string,
  init: RequestInit,
): Promise<Response> {
  const response = await fetch(
    `${config.url}/rest/v1/${config.table}${query}`,
    {
      ...init,
      cache: "no-store",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Falha ao acessar o armazenamento de pedidos (${response.status}).`,
    );
  }

  return response;
}

async function readLocalFile(): Promise<PrayerRequest[]> {
  try {
    const raw = await readFile(LOCAL_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isPrayerRequest);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeLocalFile(requests: PrayerRequest[]): Promise<void> {
  await mkdir(path.dirname(LOCAL_FILE), { recursive: true });

  const temporary = `${LOCAL_FILE}.${process.pid}.${Date.now()}.tmp`;

  await writeFile(temporary, JSON.stringify(requests, null, 2), {
    encoding: "utf8",
    mode: 0o600,
  });
  await rename(temporary, LOCAL_FILE);
}

function withFileLock<T>(task: () => Promise<T>): Promise<T> {
  const result = fileQueue.then(task, task);

  fileQueue = result.then(
    () => undefined,
    () => undefined,
  );

  return result;
}

function normalizeInput(input: PrayerRequestInput) {
  return {
    name: input.name.trim(),
    whatsapp: input.whatsapp?.trim() || null,
    request: input.request.trim(),
    wantsContact: input.wantsContact,
  };
}

export async function createPrayerRequest(
  input: PrayerRequestInput,
): Promise<PrayerRequest> {
  const data = normalizeInput(input);
  const config = getSupabaseConfig();

  if (config) {
    const response = await supabaseRequest(config, "?select=*", {
      method: "POST",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        name: data.name,
        whatsapp: data.whatsapp,
        request: data.request,
        wants_contact: data.wantsContact,
        status: "new",
      }),
    });

    const rows = (await response.json()) as SupabaseRow[];
    const row = rows[0];

    if (!row) {
      throw new Error("O pedido foi enviado, mas não pôde ser confirmado.");
    }

    return mapSupabaseRow(row);
  }

  return withFileLock(async () => {
    const requests = await readLocalFile();
    const created: PrayerRequest = {
      id: randomUUID(),
      name: data.name,
      whatsapp: data.whatsapp,
      request: data.request,
      wantsContact: data.wantsContact,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    requests.unshift(created);
    await writeLocalFile(requests);

    return created;
  });
}

export async function listPrayerRequests(): Promise<PrayerRequest[]> {
  const config = getSupabaseConfig();

  if (config) {
    const response = await supabaseRequest(
      config,
      "?select=*&order=created_at.desc&limit=500",
      { method: "GET" },
    );

    const rows = (await response.json()) as SupabaseRow[];
    return rows.map(mapSupabaseRow);
  }

  const requests = await readLocalFile();

  return requests.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function updatePrayerRequestStatus(
  id: string,
  status: PrayerStatus,
): Promise<void> {
  if (!UUID_PATTERN.test(id)) {
    throw new Error("Pedido inválido.");
  }

  const config = getSupabaseConfig();

  if (config) {
    await supabaseRequest(
      config,
      `?id=eq.${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: {
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ status }),
      },
    );
    return;
  }

  await withFileLock(async () => {
    const requests = await readLocalFile();
    const target = requests.find((item) => item.id === id);

    if (!target) {
      throw new Error("Pedido não encontrado.");
    }

    target.status = status;
    await writeLocalFile(requests);
  });
}

export async function deletePrayerRequest(id: string): Promise<void> {
  if (!UUID_PATTERN.test(id)) {
    throw new Error("Pedido inválido.");
  }

  const config = getSupabaseConfig();

  if (config) {
    await supabaseRequest(
      config,
      `?id=eq.${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        headers: {
          Prefer: "return=minimal",
        },
      },
    );
    return;
  }

  await withFileLock(async () => {
    const requests = await readLocalFile();
    const filtered = requests.filter((item) => item.id !== id);

    if (filtered.length === requests.length) {
      throw new Error("Pedido não encontrado.");
    }

    await writeLocalFile(filtered);
  });
}
