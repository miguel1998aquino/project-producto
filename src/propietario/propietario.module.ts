import { Module } from '@nestjs/common';
import { PropietarioService } from './propietario.service';
import { PropietarioController } from './propietario.controller';

@Module({
  providers: [PropietarioService],
  controllers: [PropietarioController]
})
export class PropietarioModule {}
