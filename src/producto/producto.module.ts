import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductoSchema } from './schema/producto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Producto', schema: ProductoSchema }]),
  ],
  providers: [ProductoService],
  controllers: [ProductoController],
})
export class ProductoModule {}
