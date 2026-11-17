"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/server";
import {
  deletePrayerRequest,
  updatePrayerRequestStatus,
} from "@/lib/prayer-store";
import { isPrayerStatus } from "@/lib/prayer";

const UUID_PATTERN =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

function getPrayerId(formData: FormData): string {
  const id = formData.get("id");

  if (typeof id !== "string" || !UUID_PATTERN.test(id)) {
    throw new Error("Pedido inválido.");
  }

  return id;
}

export async function updatePrayerStatusAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const id = getPrayerId(formData);
  const status = formData.get("status");

  if (!isPrayerStatus(status)) {
    throw new Error("Status inválido.");
  }

  await updatePrayerRequestStatus(id, status);
  revalidatePath("/admin");
}

export async function deletePrayerAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const id = getPrayerId(formData);
  await deletePrayerRequest(id);
  revalidatePath("/admin");
}
