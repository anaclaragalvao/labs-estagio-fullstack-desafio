import { IsEnum } from 'class-validator';

export class UpdateStatusDto {
  @IsEnum(['aberto', 'em_andamento', 'concluido'])
  status: 'aberto' | 'em_andamento' | 'concluido';
}
