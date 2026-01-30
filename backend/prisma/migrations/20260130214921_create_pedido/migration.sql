-- CreateEnum
CREATE TYPE "PedidoStatus" AS ENUM ('aberto', 'em_andamento', 'concluido');

-- CreateEnum
CREATE TYPE "PedidoPrioridade" AS ENUM ('baixa', 'media', 'alta');

-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "PedidoStatus" NOT NULL DEFAULT 'aberto',
    "prioridade" "PedidoPrioridade" NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comentario_pedidoId_idx" ON "Comentario"("pedidoId");

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;
