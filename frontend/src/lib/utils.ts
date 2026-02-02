import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Pedido } from '@/src/lib/types';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calcularAtrasados(pedidos: Pedido[]): number {
  const agora = new Date();
  let numPedidosAtrasados: number = 0;
  for (const pedido of pedidos) {
    if (pedido.status == 'aberto') {
      const dataCriacao = new Date(pedido.data_criacao as unknown as string);
      const diffMs = agora.getTime() - dataCriacao.getTime();
      const diffDias = diffMs / (1000 * 60 * 60 * 24);

      if (diffDias > 2 && pedido.prioridade == 'alta') {
        numPedidosAtrasados = numPedidosAtrasados + 1;
      } else if (diffDias > 5 && pedido.prioridade == 'media') {
        numPedidosAtrasados = numPedidosAtrasados + 1;
      } else if (diffDias > 10 && pedido.prioridade == 'baixa') {
        numPedidosAtrasados = numPedidosAtrasados + 1;
      }
    }
  }

  return numPedidosAtrasados;
}
