import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRolDto } from './dtos/createRol.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolService: RolesService) {}

  @Get()
  async getRoles() {
    const roles = await this.rolService.getRoles();
    return {
      roles,
    };
  }

  @Post('create')
  async createRol(@Body() dto: CreateRolDto) {
    const created = await this.rolService.create(dto);
    return {
      message: 'CREADO CON EXITO',
      created,
    };
  }

  @Get(':id')
  async getRol(@Param(':id') id: string) {
    const rol = await this.rolService.getRol(id);
    return { rol };
  }

  @Put(':id')
  async editRol(@Param('id') id: number, @Body() edit: CreateRolDto) {
    const rol = await this.rolService.editRol(id, edit);
    return { message: 'EDITADO CON EXITO', rol };
  }

  @Delete(':id')
  async deleteRol(@Param('id') id: number) {
    const rolDeletd = await this.rolService.deleteRol(id);
    return { message: 'ELIMINADO CON EXITO', rolDeletd };
  }
}
