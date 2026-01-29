# 🛠️ Desafio Final: Estágio Fullstack - Labs (AZZAS 2154 / Grupo Soma)

**Bem-vindo ao desafio!** Inquietos e acelerados, criativos ou cartesianos – queremos ver seu raciocínio! [attached_file:1]

**Tempo estimado**: 4-6 horas.  
**Stack esperada**: Next.js (React + shadcn/ui) + NestJS + PostgreSQL/SQLite (via Prisma).  
**Entrega**: Fork deste repo, implemente, suba PR explicando decisões. Link do seu fork/PR no formulário de candidatura.

## Contexto
Sistema interno pra gerenciar "Pedidos de Produtos" no Labs (ex.: requests de landing pages, ferramentas internas). [attached_file:1]

## Requisitos

### Backend (NestJS)
```
Endpoints:
POST /pedidos - cria pedido {titulo, descricao, prioridade: 'baixa'|'media'|'alta'}
GET /pedidos?status=aberto&prioridade=alta - lista com filtros
PATCH /pedidos/:id/status - atualiza status
POST /pedidos/:id/comentarios - adiciona comentário {autor, mensagem}
GET /pedidos/:id/comentarios - lista comentários
```
- Valide campos obrigatórios.
- Regra: Não criar/alterar pedido `alta` pra status `concluido`.
- Use Prisma + SQLite/PostgreSQL (diferencial: Docker com Postgres).

### Frontend (Next.js + shadcn/ui)
- Lista de pedidos com filtros (dropdown status/prioridade).
- Form novo pedido.
- Detalhes: status buttons + lista/add comentário.
- UI limpa, responsiva.

### Lógica extra (teste de raciocínio)
Função `calcularAtrasados(pedidos: Pedido[])`:
- Retorna count de pedidos "atrasados":
  - Alta: >2 dias em 'aberto'
  - Média: >5 dias
  - Baixa: >10 dias
- Escreva 2 testes.

## Setup local
```bash
# Backend
cd backend
npm i
npx prisma db push  # ou docker compose up postgres
npm run start:dev

# Frontend
cd frontend
npm i
npm run dev
```

## Critérios de avaliação
- Lógica correta + regras de negócio.
- Código organizado, legível.
- Explicação das decisões no PR (por quê essa estrutura? O que melhoraria?).
- Diferenciais: testes, Docker, deploy (Vercel/Cloud Run).

**Dúvidas?** Comente no PR ou pergunte no processo seletivo.

GENTE É O QUE SOMA! 🚀