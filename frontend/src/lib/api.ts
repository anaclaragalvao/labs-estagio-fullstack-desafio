import { Comentario, Pedido, pedidoPrioridade, pedidoStatus } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export async function getPedidoById(id: string): Promise<Pedido> {
  const res = await fetch(`${API_URL}/pedidos/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Falha ao carregar pedido (${res.status}). ${text}`);
  }

  return res.json();
} 

export async function listComentarios(pedido_id: string): Promise<Comentario[]> {
  const res = await fetch(`${API_URL}/pedidos/${pedido_id}/comentarios`, { cache: 'no-store' });
  if (!res.ok){
    const text = await res.text().catch(() => '');
    throw new Error(`Falha ao carregar comentários (${res.status}). ${text}`);
  }
  return res.json();
}

export async function createComentario(pedido_id: string, data: { autor: string; mensagem: string;}): Promise<Comentario> {
  const res = await fetch(`${API_URL}/pedidos/${pedido_id}/comentarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) { 
    const text = await res.text().catch(() => '');
    throw new Error(`Falha ao criar comentário (${res.status}). ${text}`);
  }
  return res.json();
}

export async function updatePedidoStatus(
  pedidoId: string,
  status: pedidoStatus
): Promise<Pedido> {
  const res = await fetch(`${API_URL}/pedidos/${pedidoId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Falha ao atualizar status (${res.status}). ${text}`);
  }

  return res.json();
}