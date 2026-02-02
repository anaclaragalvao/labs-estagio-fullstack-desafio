import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ComentariosService } from './comentario.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ComentariosService', () => {
  let service: ComentariosService;

  const prismaMock = {
    pedido: {
      findUnique: jest.fn(),
    },
    comentario: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        ComentariosService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = moduleRef.get(ComentariosService);
  });

  it('não permite comentário com mensagem vazia -> BadRequest', async () => {
    prismaMock.pedido.findUnique.mockResolvedValue({ id: 'p1' });

    await expect(
      service.create('p1', { autor: 'Ana', mensagem: '   ' }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(prismaMock.comentario.create).not.toHaveBeenCalled();
  });

  it('não permite comentário em pedido inexistente -> NotFound', async () => {
    prismaMock.pedido.findUnique.mockResolvedValue(null);

    await expect(
      service.create('p1', { autor: 'Ana', mensagem: 'Oi' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
