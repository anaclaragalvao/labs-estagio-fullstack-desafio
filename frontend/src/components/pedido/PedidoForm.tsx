"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPedido } from "@/src/lib/api";
import type { pedidoPrioridade, pedidoStatus } from "@/src/lib/types";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";

export function PedidoForm() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState<pedidoPrioridade>("media");
  const [status, setStatus] = useState<pedidoStatus>("aberto");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // validação simples client-side
    if (!titulo.trim()) {
      setError("Título é obrigatório.");
      return;
    }

    setSaving(true);
    try {
      await createPedido({
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        prioridade,
        status,
      });

      // volta pra listagem
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err?.message ?? "Erro ao criar pedido.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="grid gap-2">
        <Label htmlFor="titulo">Título</Label>
        <Input
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ex.: Landing page campanha X"
        />
      </div>

      <div className="mt-4 grid gap-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreva o que precisa ser feito..."
          rows={5}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>Prioridade</Label>
          <Select value={prioridade} onValueChange={(v) => setPrioridade(v as pedidoPrioridade)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baixa">Baixa</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as pedidoStatus)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aberto">Aberto</SelectItem>
              <SelectItem value="em_andamento">Em andamento</SelectItem>
              <SelectItem value="concluido">Concluído</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-zinc-500">
            Obs.: se prioridade for <b>alta</b>, o backend pode bloquear criação já como <b>concluído</b>.
          </p>
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-end gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Salvando..." : "Criar pedido"}
        </Button>
      </div>
    </form>
  );
}
