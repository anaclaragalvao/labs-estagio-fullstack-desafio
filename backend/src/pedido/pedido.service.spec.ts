import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PedidosService', () => {
  let service: PedidosService;
  
  const prismaMock = {
    pedido: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        PedidosService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = moduleRef.get(PedidosService);
  });

  it('não cria pedido sem título (vazio/espacos) -> BadRequest', async () => {
    await expect(
      service.create({
        titulo: '   ',
        descricao: 'desc ok',
        prioridade: 'media',
        status: 'aberto',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(prismaMock.pedido.create).not.toHaveBeenCalled();
  });

  it('bloqueia prioridade alta criada como concluído diretamente -> BadRequest', async () => {
    await expect(
      service.create({
        titulo: 'Teste',
        descricao: 'desc',
        prioridade: 'alta',
        status: 'concluido',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(prismaMock.pedido.create).not.toHaveBeenCalled();
  });

  it('bloqueia update para concluído direto quando prioridade alta e status atual != em_andamento', async () => {
    prismaMock.pedido.findUnique.mockResolvedValue({
      id: 'p1',
      prioridade: 'alta',
      status: 'aberto',
    });

    await expect(
      service.updateStatus('p1', { status: 'concluido' }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(prismaMock.pedido.update).not.toHaveBeenCalled();
  });

  it('permite update para concluído quando prioridade alta e status atual = em_andamento', async () => {
    prismaMock.pedido.findUnique.mockResolvedValue({
      id: 'p1',
      prioridade: 'alta',
      status: 'em_andamento',
    });

    prismaMock.pedido.update.mockResolvedValue({
      id: 'p1',
      prioridade: 'alta',
      status: 'concluido',
    });

    const result = await service.updateStatus('p1', { status: 'concluido' });

    expect(prismaMock.pedido.update).toHaveBeenCalledWith({
      where: { id: 'p1' },
      data: { status: 'concluido' },
    });
    expect(result.status).toBe('concluido');
  });
});
