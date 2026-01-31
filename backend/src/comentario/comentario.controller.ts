import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ComentariosService } from './comentario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@Controller('pedidos/:id/comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  // POST /pedidos/:id/comentarios
  @Post()
  create(@Param('id') pedidoId: string, @Body() dto: CreateComentarioDto) {
    return this.comentariosService.create(pedidoId, dto);
  }

  // GET /pedidos/:id/comentarios
  @Get()
  list(@Param('id') pedidoId: string) {
    return this.comentariosService.listByPedido(pedidoId);
  }
}
