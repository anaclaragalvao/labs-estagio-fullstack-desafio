# Desafio Final — Estágio Fullstack (Labs)

Mini-sistema para registro de pedidos internos com comentários, filtros e atualização de status.

## Stack

- **Frontend:** Next.js (React) + shadcn/ui
- **Backend:** NestJS (Node/TS)
- **Banco:** PostgreSQL
- **ORM/Migrations:** Prisma
- **Deploy:** Front na Vercel e Back no Cloud Run (com Cloud SQL)
## Como rodar o projeto

### Requisitos

- Node.js 20+
- npm 10+
- Docker e Docker Compose

### Link em produção
https://labs-estagio-fullstack-desafio.vercel.app/

### Backend (NestJS + Prisma)

1) Suba o banco local:

```
cd backend
docker compose up -d
```

2) Configure o banco (já existe .env com DATABASE_URL):

```
npm install
npx prisma generate
npx prisma migrate dev
```

3) Rode o servidor:

```
npm run start:dev
```

O backend sobe em http://localhost:3000.

### Frontend (Next.js)

1) Ajuste a URL da API em frontend/.env.local:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

2) Rode o app:

```
cd frontend
npm install
npm run dev -- -p 3001
```

Abra http://localhost:3001.

### Testes

Frontend:

```
cd frontend
npm run test
```

Backend:

```
cd backend
npm run test
```

## Decisões técnicas

- Repositório com pastas separadas, backend e frontend.
- Prisma + PostgreSQL com Docker para persistência e migrações. Em produção, usei CloudSQL (Postgres gerenciado) para evitar persistência frágil dentro de containers.
- Regras de negócio concentradas nos serviços (NestJS), como não criar pedido com título vazio, não pode ter prioridade alta sem passar por em andamento.
- Não estava nos requisitos, mas deixei tanto o comentário quanto o autor não poder ser vazio para que caso o comentário seja confuso, seja mais fácil de discutir.
- shadcn/ui para UI consistente e acessível.
- Testes unitários no frontend (Vitest).
- Testes de regras no backend com Jest (mocks do Prisma).

## O que eu melhoraria com mais tempo

- Implementar a visualização de número de pedidos atrasados.
- Melhor padronização de variáveis.
- Deixar a migração no mesmo timezone.
- Colocar DATABASE_URL em Secret Manager (em vez de env plain)
- Autenticação e controle de acesso.
- Paginação e ordenação no endpoint de listagem.
- Melhorar estados de loading/skeleton e feedback de erro.
- Cobertura de testes (e2e para endpoints e integração no frontend).
- CI/CD (lint, testes e deploy automatizado).


## Observações

- Essas instruções para rodar pode fazer, mas já está em produção: https://labs-estagio-fullstack-desafio.vercel.app/
- Há um .env local no frontend com a URL de produção; para rodar localmente, ajuste para http://localhost:3000.
- A regra de negócio de prioridade alta para concluir foi implementada no backend.
