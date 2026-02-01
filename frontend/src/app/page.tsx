import { listPedidos } from '@/src/lib/api';
import { PedidoCard } from '@/src/components/pedido/PedidoCard';
import { PedidoFilters } from "@/src/components/pedido/PedidoFilters";
import { Button } from "@/src/components/ui/button";
import  Link  from "next/link";
import { pedidoStatus, pedidoPrioridade } from '../lib/types';
type PageProps = {
  searchParams?: {
    status?: pedidoStatus;
    prioridade?: pedidoPrioridade;
  };
};

export default async function HomePage({ searchParams }: PageProps) {
  const resolved = (await searchParams) ?? {};
  const status = resolved.status;
  const prioridade = resolved.prioridade;

  const pedidos = await listPedidos(status, prioridade);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Pedidos</h1>
          <p className="mt-1 text-sm text-zinc-600">Lista de pedidos registrados pelas áreas.</p>
        </div>

        <Button asChild>
          <Link href="/pedido/new">Novo pedido</Link>
        </Button>
      </div>

      <div className="mt-6">
        <PedidoFilters />
      </div>

      <div className="mt-6 grid gap-3">
        {pedidos.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-sm text-zinc-600">
            Nenhum pedido encontrado.
          </div>
        ) : (
          pedidos.map((p) => <PedidoCard key={p.id} pedido={p} />)
        )}
      </div>
    </main>
  );
}