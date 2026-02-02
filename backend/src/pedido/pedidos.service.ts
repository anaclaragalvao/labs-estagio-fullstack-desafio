import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { ListPedidosQuery } from './dto/list-pedido.query';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePedidoDto) {
    // Regra 1: não criar pedido sem título (não vazio)
    const titulo = dto.titulo.trim();
    if (!titulo) throw new BadRequestException('Título é obrigatório');

    const descricao = dto.descricao.trim();
    //if (!descricao) throw new BadRequestException('Descrição é obrigatória');

    const prioridade = dto.prioridade ?? 'media';
    const status = dto.status ?? 'aberto';

    // Regra 3 (na criação): prioridade alta não pode ser criada como concluido diretamente
    if (prioridade === 'alta' && status === 'concluido') {
      throw new BadRequestException('Pedido de prioridade alta não pode ser criado como concluído diretamente');
    }

    return this.prisma.pedido.create({
      data: {
        titulo,
        descricao,
        prioridade,
        status,
      },
    });
  }

  list(query: ListPedidosQuery) {
    return this.prisma.pedido.findMany({
      where: {
        ...(query.status ? { status: query.status } : {}),
        ...(query.prioridade ? { prioridade: query.prioridade } : {}),
      },
      orderBy: { data_criacao: 'desc' },
    });
  }

  async updateStatus(id: string, dto: UpdateStatusDto) {
    const pedido = await this.prisma.pedido.findUnique({ where: { id } });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');

    // Regra 3 (no update): prioridade alta não pode ir para concluido "diretamente"
    // Interpretação prática: se prioridade é alta, só pode ir para concluido vindo de em_andamento.
    if (
      pedido.prioridade === 'alta' &&
      dto.status === 'concluido' &&
      pedido.status !== 'em_andamento'
    ) {
      throw new BadRequestException(
        'Pedido de prioridade alta não pode ser concluído diretamente; mova para em_andamento antes',
      );
    }

    return this.prisma.pedido.update({
      where: { id },
      data: { status: dto.status },
    });
  }
  async getById(id: string) {
    const pedido = await this.prisma.pedido.findUnique({ where: { id } });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    return pedido;
  }

}
