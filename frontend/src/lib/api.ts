import { Pedido, pedidoPrioridade, pedidoStatus } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

function toQuery(params: Record<string, string | undefined>) {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) usp.set(k, v);
  }
  const qs = usp.toString();
  return qs ? `?${qs}` : '';
}
export async function listPedidos(
  status?: pedidoStatus,
  prioridade?: pedidoPrioridade,
): Promise<Pedido[]> {
  const qs = toQuery({ status, prioridade });
  const res = await fetch(`${API_URL}/pedidos${qs}`, { cache: 'no-store' });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Falha ao carregar pedidos (${res.status}). ${text}`);
  }

  return res.json();
}

export async function createPedido(data: {
  titulo: string;
  descricao: string;
  status: pedidoStatus;
  prioridade: pedidoPrioridade;
}): Promise<Pedido> {
  const res = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Falha ao criar pedido (${res.status}). ${text}`);
  }

  return res.json();
} 