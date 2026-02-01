import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { PedidoForm } from "@/src/components/pedido/PedidoForm";

export default function NewPedidoPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Novo pedido</h1>
          <p className="mt-1 text-sm text-zinc-600">Crie um novo pedido para o time.</p>
        </div>

        <Button asChild variant="outline">
          <Link href="/">Voltar</Link>
        </Button>
      </div>

      <div className="mt-6">
        <PedidoForm />
      </div>
    </main>
  );
}
