import { Module } from '@nestjs/common';
import { ComentariosController } from './comentario.controller';
import { ComentariosService } from './comentario.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ComentariosController],
  providers: [ComentariosService],
})
export class ComentariosModule {}
