import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePedidoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  descricao: string;

  @IsOptional()
  @IsEnum(['aberto', 'em_andamento', 'concluido'])
  status?: 'aberto' | 'em_andamento' | 'concluido';

  @IsOptional()
  @IsEnum(['baixa', 'media', 'alta'])
  prioridade?: 'baixa' | 'media' | 'alta';
}
