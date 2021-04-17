import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PedidoSchema } from './schema/pedido.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pedido', schema: PedidoSchema }]),
  ],
  providers: [PedidoService],
  controllers: [PedidoController],
})
export class PedidoModule {}
