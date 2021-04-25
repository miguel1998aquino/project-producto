import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PropietarioDecorator } from 'src/auth/decorator/propietario.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CategoriaService } from './categoria.service';
import { CreateCategoria } from './dto/categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private Serviecategoria: CategoriaService) {}

  @Get()
  async getCategorias() {
    const categories = await this.Serviecategoria.getCategorias();
    return {
      categories,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async created(@Body() dto: CreateCategoria) {
    const created = await this.Serviecategoria.create(dto);
    return {
      message: 'CREADO CON EXITO',
      created,
    };
  }

  @Get(':id')
  async getCategoria(@Param('id') id: string) {
    const Categoria = await this.Serviecategoria.getCategoria(id);
    return { Categoria };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async edited(
    @Param('id') id: number,
    @Body() edit: CreateCategoria,
    @PropietarioDecorator() propietario: any,
  ) {
    if (propietario.roles.rolNombre.indexOf('admin') == 0) {
      const data = await this.Serviecategoria.editCategoria(id, edit);
      return { message: 'EDITADO CON EXITO', data };
    } else {
      throw new UnauthorizedException('No eres Admin');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @PropietarioDecorator() propietario: any,
  ) {
    if (propietario.roles.rolNombre.indexOf('admin') == 0) {
      const deleted = await this.Serviecategoria.deleted(id);
      return { message: 'ELIMINADO CON EXITO', deleted };
    } else {
      throw new UnauthorizedException('No eres Admin');
    }
  }
}
