import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUsuarioDTO } from './dtos/usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get()
  async getUsuarios() {
    const usuarios = await this.usuarioService.getUsuarios();
    return {
      usuarios,
    };
  }

  @Post('create')
  async create(@Body() dto: CreateUsuarioDTO) {
    const create = await this.usuarioService.create(dto);
    return {
      message: 'CREADO CON EXITO',
      create,
    };
  }

  @Get(':id')
  async getUsuario(@Param('id') id: string) {
    const usuario = await this.usuarioService.getUsuario(id);
    return { usuario };
  }

  @Put(':id')
  async edited(@Param('id') id: number, @Body() edit: CreateUsuarioDTO) {
    const edited = await this.usuarioService.editUsuario(id, edit);
    return { message: 'EDITADO CON EXITO', edited };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleted = await this.usuarioService.Deleted(id);
    return { message: 'ELIMINADO CON EXITO', deleted };
  }
}
