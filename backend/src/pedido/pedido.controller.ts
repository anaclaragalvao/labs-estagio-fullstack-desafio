import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { ListPedidosQuery } from './dto/list-pedido.query';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  // POST /pedidos
  @Post()
  create(@Body() dto: CreatePedidoDto) {
    return this.pedidosService.create(dto);
  }

  // GET /pedidos?status&prioridade
  @Get()
  list(@Query() query: ListPedidosQuery) {
    return this.pedidosService.list(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.pedidosService.getById(id);
  }

  // PATCH /pedidos/:id/status
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.pedidosService.updateStatus(id, dto);
  }
}
