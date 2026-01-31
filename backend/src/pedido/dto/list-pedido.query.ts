import { IsEnum, IsOptional } from 'class-validator';

export class ListPedidosQuery {
  @IsOptional()
  @IsEnum(['aberto', 'em_andamento', 'concluido'])
  status?: 'aberto' | 'em_andamento' | 'concluido';

  @IsOptional()
  @IsEnum(['baixa', 'media', 'alta'])
  prioridade?: 'baixa' | 'media' | 'alta';
}
