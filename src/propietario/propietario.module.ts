import { Module } from '@nestjs/common';
import { PropietarioService } from './propietario.service';
import { PropietarioController } from './propietario.controller';
import { PropietarioSchema } from './schema/propietario.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Propietario', schema: PropietarioSchema },
    ]),
  ],
  providers: [PropietarioService],
  controllers: [PropietarioController],
  exports: [PropietarioService],
})
export class PropietarioModule {}
