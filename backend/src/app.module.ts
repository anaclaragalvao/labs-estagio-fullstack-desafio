import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PedidosModule } from './pedido/pedido.module';
import { ComentariosModule } from './comentario/comentario.module';

@Module({
  imports: [PrismaModule, PedidosModule, ComentariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
