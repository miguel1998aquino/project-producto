import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Put(':id')
  async edited(@Param('id') id: number, @Body() edit: CreateCategoria) {
    const data = await this.Serviecategoria.editCategoria(id, edit);
    return { message: 'EDITADO CON EXITO', data };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleted = await this.Serviecategoria.deleted(id);
    return { message: 'ELIMINADO CON EXITO', deleted };
  }
}
