"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";

const Status = [
  { label: "Todos os status", value: "todos" },
  { label: "Aberto", value: "aberto" },
  { label: "Em andamento", value: "em_andamento" },
  { label: "Concluído", value: "concluido" },
];

const Prioridade = [
  { label: "Todas as prioridades", value: "todas" },
  { label: "Baixa", value: "baixa" },
  { label: "Média", value: "media" },
  { label: "Alta", value: "alta" },
];

export function PedidoFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "todos";
  const prioridade = searchParams.get("prioridade") || "todas";

  function updateParam(key: "status" | "prioridade", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "todos" || value === "todas") {
      params.delete(key);
    }
    else {
      params.set(key, value);
    }
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Select value={status} onValueChange={(v) => updateParam("status", v)}>
        <SelectTrigger className="w-full sm:w-[220px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {Status.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={prioridade} onValueChange={(v) => updateParam("prioridade", v)}>
        <SelectTrigger className="w-full sm:w-[240px]">
          <SelectValue placeholder="Prioridade" />
        </SelectTrigger>
        <SelectContent>
          {Prioridade.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
