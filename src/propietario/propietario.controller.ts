import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePropietario } from './dto/creaetPropietario.dto';
import { PropietarioService } from './propietario.service';

@Controller('propietario')
export class PropietarioController {
  constructor(private servicePropietario: PropietarioService) {}

  @Get()
  async getPropietarios() {
    const propietarios = await this.servicePropietario.getPropietarios();
    return { propietarios };
  }

  @Post('create')
  async create(@Body() dto: CreatePropietario) {
    const created = await this.servicePropietario.create(dto);
    return {
      message: 'CREADO CONB EXITO',
      created,
    };
  }

  @Get(':id')
  async getPropietario(@Param('id') id: string) {
    const data = await this.servicePropietario.getPropietario(id);
    return { data };
  }

  @Put(':id')
  async edit(@Param('id') id: number, @Body() edit: CreatePropietario) {
    const edited = await this.servicePropietario.editCategoria(id, edit);
    return edited;
  }

  @Delete(';id')
  async delete(@Param('id') id: number) {
    const deleted = await this.servicePropietario.delete(id);
    return { message: 'ELIMINADO CON EXITO', deleted };
  }
}
