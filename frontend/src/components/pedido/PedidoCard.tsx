import Link from 'next/link';
import { Pedido } from '@/src/lib/types';
import { PriorityBadge } from './PriorityBadge';

function statusLabel(s: Pedido['status']) {
  if (s === 'aberto') return 'Aberto';
  if (s === 'em_andamento') return 'Em andamento';
  return 'Concluído';
}

export function PedidoCard({ pedido }: { pedido: Pedido }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={`/pedidos/${pedido.id}`} className="block">
            <h3 className="truncate text-base font-semibold text-zinc-900 hover:underline">
              {pedido.titulo}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-600">{pedido.descricao}</p>
        </div>

        <PriorityBadge prioridade={pedido.prioridade} />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
        <span>Status: {statusLabel(pedido.status)}</span>
        <span>{new Date(pedido.data_criacao).toLocaleString('pt-BR')}</span>
      </div>
    </div>
  );
}