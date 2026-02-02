"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { pedidoStatus } from "@/src/lib/types";
import { updatePedidoStatus } from "@/src/lib/api";
import { Button } from "@/src/components/ui/button";

export function StatusButtons({
  pedidoId,
  currentStatus,
}: {
  pedidoId: string;
  currentStatus: pedidoStatus;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<pedidoStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function setStatus(status: pedidoStatus) {
    setError(null);
    setLoading(status);
    try {
      await updatePedidoStatus(pedidoId, status);
      router.refresh(); // recarrega dados server-side (pedido + comentários)
    } catch (e: any) {
      setError(e?.message ?? "Erro ao atualizar status.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant={currentStatus === "aberto" ? "default" : "outline"}
          onClick={() => setStatus("aberto")}
          disabled={loading !== null}
        >
          Aberto
        </Button>

        <Button
          type="button"
          variant={currentStatus === "em_andamento" ? "default" : "outline"}
          onClick={() => setStatus("em_andamento")}
          disabled={loading !== null}
        >
          Em andamento
        </Button>

        <Button
          type="button"
          variant={currentStatus === "concluido" ? "default" : "outline"}
          onClick={() => setStatus("concluido")}
          disabled={loading !== null}
        >
          Concluído
        </Button>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}
    </div>
  );
}
