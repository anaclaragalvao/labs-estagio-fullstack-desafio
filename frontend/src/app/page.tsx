import { listPedidos } from '@/src/lib/api';
import { PedidoCard } from '@/src/components/pedido/PedidoCard';
import { Button } from "@/src/components/ui/button";

export default async function HomePage() {
  const pedidos = await listPedidos();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Pedidos</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Lista de pedidos registrados pelas áreas.
          </p>
        </div>
      </div>
      <Button className="novo-pedido">Novo Pedido</Button>
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