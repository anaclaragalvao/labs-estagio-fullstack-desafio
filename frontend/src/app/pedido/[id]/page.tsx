import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/src/components/ui/button";

import { getPedidoById, listComentarios } from "@/src/lib/api";
import { PriorityBadge } from "@/src/components/pedido/PriorityBadge";
import { StatusButtons } from "@//src/components/pedido/StatusButtons";
import { ComentarioForm } from "@/src/components/pedido/ComentarioForm";

function statusLabel(status: string) {
  if (status === "aberto") return "Aberto";
  if (status === "em_andamento") return "Em andamento";
  return "Concluído";
}

export default async function PedidoDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const pedido = await getPedidoById(id);
  if (!pedido) notFound();

  const comentarios = await listComentarios(id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold text-zinc-900">
            {pedido.titulo}
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Status: {statusLabel(pedido.status)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <PriorityBadge prioridade={pedido.prioridade} />
          <Button asChild variant="outline">
            <Link href="/">Voltar</Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Descrição</h2>
        <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-700">
          {pedido.descricao}
        </p>

        <div className="mt-6">
          <h2 className="text-sm font-semibold text-zinc-900">Alterar status</h2>
          <p className="mt-1 text-xs text-zinc-500">
            Obs.: pedidos de prioridade alta podem ter restrições para concluir diretamente.
          </p>
          <div className="mt-3">
            <StatusButtons pedidoId={pedido.id} currentStatus={pedido.status} />
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-900">Comentários</h2>

        <div className="mt-4 grid gap-3">
          {comentarios.length === 0 ? (
            <div className="rounded-xl border bg-white p-6 text-sm text-zinc-600">
              Nenhum comentário ainda.
            </div>
          ) : (
            comentarios.map((c) => (
              <div key={c.id} className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span className="font-medium text-zinc-700">{c.autor}</span>
                  <span>{new Date(c.data).toLocaleString("pt-BR")}</span>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-700">
                  {c.mensagem}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="mt-6">
          <ComentarioForm pedidoId={pedido.id} />
        </div>
      </section>
    </main>
  );
}
