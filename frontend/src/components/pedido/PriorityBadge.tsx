import { pedidoPrioridade } from "@/src/lib/types";

function label(p: pedidoPrioridade) {
  if (p === 'alta') return 'Alta';
  if (p === 'media') return 'Média';
  return 'Baixa';
}

export function PriorityBadge({ prioridade }: { prioridade: pedidoPrioridade }) {
  const base =
    'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset';

  const cls =
    prioridade === 'alta'
      ? `${base} bg-red-50 text-red-700 ring-red-200`
      : prioridade === 'media'
      ? `${base} bg-amber-50 text-amber-700 ring-amber-200`
      : `${base} bg-emerald-50 text-emerald-700 ring-emerald-200`;

  return <span className={cls}>{label(prioridade)}</span>;
}