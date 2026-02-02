import { describe, it, expect, vi } from "vitest";
import type { Pedido } from "./types";
import { calcularAtrasados } from "./utils";

// Auxiliar para criar datas no passado
function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

describe("calcularAtrasados", () => {
  it("retorna 0 quando não há pedidos atrasados", () => {
    // Regra atual: só conta status "aberto" e
    // prioridade alta > 2 dias, média > 5 dias, baixa > 10 dias
    const pedidos: Pedido[] = [
      {
        id: "1",
        titulo: "Pedido recente aberto",
        descricao: "x",
        status: "aberto",
        prioridade: "media",
        data_criacao: daysAgo(2),
      },
      {
        id: "2",
        titulo: "Pedido antigo mas concluído",
        descricao: "y",
        status: "concluido",
        prioridade: "alta",
        data_criacao: daysAgo(30),
      },
    ];

    const result = calcularAtrasados(pedidos);
    expect(result).toBe(0);
  });

  it("conta pedidos não concluídos com data_criacao mais antigo que o limite como atrasados", () => {
    // Regra atual: só conta status "aberto" e
    // prioridade alta > 2 dias, média > 5 dias, baixa > 10 dias
    const pedidos: Pedido[] = [
      {
        id: "1",
        titulo: "Antigo aberto",
        descricao: "x",
        status: "aberto",
        prioridade: "media",
        data_criacao: daysAgo(10), // atrasado (média > 5)
      },
      {
        id: "2",
        titulo: "Antigo aberto",
        descricao: "y",
        status: "aberto",
        prioridade: "baixa",
        data_criacao: daysAgo(20), // atrasado (baixa > 10)
      },
      {
        id: "3",
        titulo: "Antigo concluído",
        descricao: "z",
        status: "concluido",
        prioridade: "alta",
        data_criacao: daysAgo(50), // não conta (concluído)
      },
      {
        id: "4",
        titulo: "Recente aberto",
        descricao: "w",
        status: "aberto",
        prioridade: "media",
        data_criacao: daysAgo(1), // não atrasado
      },
    ];

    const result = calcularAtrasados(pedidos);
    expect(result).toBe(2);
  });
});
