# 🛠️ Desafio Final: Estágio Fullstack - Labs (AZZAS 2154 / Grupo Soma)

**Bem-vindo ao desafio!** Inquietos e acelerados, criativos ou cartesianos – queremos ver seu raciocínio!

**Tempo estimado**: 4-6 horas.  
**Stack esperada**: Next.js (React + shadcn/ui) + NestJS + PostgreSQL/SQLite (via Prisma).  

---

## Contexto

Você fará um mini-sistema interno para o time do Labs registrar pedidos de produtos que outras áreas pedem (ex.: "landing page para campanha X", "ferramenta interna Y").

O objetivo não é ter uma UI perfeita, e sim ver como você estrutura o raciocínio, a lógica e o código.

---

## Requisitos

### Entidades

**Pedido:**
- id
- título
- descrição
- status (ex.: "aberto", "em_andamento", "concluido")
- prioridade ("baixa", "media", "alta")
- data de criação

**Comentário:**
- id
- pedidoId
- autor (string simples)
- mensagem
- data

### Backend (NestJS)

Endpoints REST:
```
POST   /pedidos                    - cria pedido
GET    /pedidos?status=X&prioridade=Y - lista com filtros opcionais
PATCH  /pedidos/:id/status         - atualiza status
POST   /pedidos/:id/comentarios    - adiciona comentário
GET    /pedidos/:id/comentarios    - lista comentários
```

**Regras de negócio:**
- Não permitir criar pedido sem título
- Não permitir comentário vazio
- **Regra importante:** Pedidos de prioridade "alta" não podem ser criados ou alterados para status "concluido" diretamente

**Persistência:**
- Pode ser em memória (array), SQLite ou PostgreSQL
- Diferencial: usar Prisma + PostgreSQL com Docker

### Frontend (Next.js + React)

**Página de listagem:**
- Exibe todos os pedidos
- Filtros por status e prioridade
- Indicação visual de prioridade

**Formulário de criação:**
- Criar novo pedido

**Página de detalhes:**
- Exibe dados do pedido
- Lista comentários
- Permite adicionar novo comentário
- Botões para mudar status

**Diferencial:** usar shadcn/ui para componentes

### Lógica Extra (Teste de Raciocínio)

Implemente uma função:
```typescript
calcularAtrasados(pedidos: Pedido[]): number
```

Que retorna a **quantidade** de pedidos "atrasados" considerando:
- Prioridade **alta**: mais de 2 dias em status "aberto"
- Prioridade **média**: mais de 5 dias em status "aberto"
- Prioridade **baixa**: mais de 10 dias em status "aberto"

**Escreva 2 testes unitários** para essa função.

---

## Como entregar

1. **Fork este repositório**
2. **Implemente a solução** na estrutura que preferir (monorepo, pastas separadas, etc.)
3. **Crie um README.md** no seu fork explicando:
   - Como rodar o projeto (comandos, requisitos)
   - Decisões técnicas que você tomou
   - O que você melhoraria se tivesse mais tempo
4. **Abra um Pull Request** para este repositório
5. **Compartilhe o link do PR** no formulário de candidatura

---

## Critérios de avaliação

- ✅ Lógica correta e regras de negócio implementadas
- ✅ Código organizado e legível
- ✅ Capacidade de explicar decisões (no PR e README)
- ✅ Tratamento de erros
- 🌟 **Diferenciais:** testes, Docker, deploy (Vercel/Cloud Run), uso de shadcn/ui

---

## Dúvidas?

Comente no seu PR ou pergunte durante o processo seletivo.

**GENTE É O QUE SOMA!** 🚀