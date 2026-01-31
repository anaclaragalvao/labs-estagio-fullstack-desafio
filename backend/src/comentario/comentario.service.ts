import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@Injectable()
export class ComentariosService {
  constructor(private prisma: PrismaService) {}

  async create(pedidoId: string, dto: CreateComentarioDto) {
    // garante que pedido existe
    const pedido = await this.prisma.pedido.findUnique({ where: { id: pedidoId } });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');

    const autor = dto.autor.trim();
    const mensagem = dto.mensagem.trim();

    // Regra 2: não permitir comentário vazio
    if (!autor) throw new BadRequestException('Autor é obrigatório');
    if (!mensagem) throw new BadRequestException('Mensagem não pode ser vazia');

    return this.prisma.comentario.create({
      data: { pedidoId, autor, mensagem },
    });
  }

  listByPedido(pedidoId: string) {
    return this.prisma.comentario.findMany({
      where: { pedidoId },
      orderBy: { data: 'asc' },
    });
  }
}
