"use client";

import { Trash2 } from "lucide-react";
import { deletePrayerAction } from "@/app/admin/actions";

type DeletePrayerFormProps = {
  id: string;
  name: string;
};

export function DeletePrayerForm({ id, name }: DeletePrayerFormProps) {
  return (
    <form
      action={deletePrayerAction}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Excluir o pedido de ${name}? Esta ação não pode ser desfeita.`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-fire-500/20 bg-fire-500/[0.06] px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-fire-400 transition-colors hover:border-fire-500/40 hover:bg-fire-500/[0.12]"
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
        Excluir
        <span className="sr-only"> pedido de {name}</span>
      </button>
    </form>
  );
}
