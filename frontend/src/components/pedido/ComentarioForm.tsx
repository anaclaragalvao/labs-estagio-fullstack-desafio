"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createComentario } from "@/src/lib/api";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";  
import { Input } from "@/src/components/ui/input";


export function ComentarioForm({ pedidoId }: { pedidoId: string }) {
  const router = useRouter();
  const [autor, setAutor] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!autor.trim()) {
      setError("Autor é obrigatório.");
      return;
    }
    if (!mensagem.trim()) {
      setError("Mensagem não pode ser vazia.");
      return;
    }

    setSaving(true);
    try {
      await createComentario(pedidoId, {
        autor: autor.trim(),
        mensagem: mensagem.trim(),
      });

      setMensagem("");
      router.refresh();
    } catch (e: any) {
      setError(e?.message ?? "Erro ao criar comentário.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="grid gap-2">
        <Label htmlFor="autor">Autor</Label>
        <Input
          id="autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Seu nome"
        />
      </div>

      <div className="mt-4 grid gap-2">
        <Label htmlFor="mensagem">Comentário</Label>
        <Textarea
          id="mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Escreva um comentário..."
          rows={4}
        />
      </div>

      {error ? (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-4 flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? "Enviando..." : "Adicionar comentário"}
        </Button>
      </div>
    </form>
  );
}
