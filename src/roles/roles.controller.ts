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

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createRol(
    @Body() dto: CreateRolDto,
    @PropietarioDecorator() propietario: any,
  ) {
    if (propietario.roles.rolNombre.indexOf('admin') == 0) {
      const created = await this.rolService.create(dto);
      return {
        message: 'CREADO CON EXITO',
        created,
      };
    } else {
      throw new UnauthorizedException('No eres Admin');
    }
  }

  @Get(':id')
  async getRol(@Param(':id') id: string) {
    const rol = await this.rolService.getRol(id);
    return { rol };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async editRol(
    @Param('id') id: number,
    @Body() edit: CreateRolDto,
    @PropietarioDecorator() propietario: any,
  ) {
    if (propietario.roles.rolNombre.indexOf('admin') == 0) {
      const rol = await this.rolService.editRol(id, edit);
      return { message: 'EDITADO CON EXITO', rol };
    } else {
      throw new UnauthorizedException('No eres Admin');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteRol(
    @Param('id') id: number,
    @PropietarioDecorator() propietario: any,
  ) {
    if (propietario.roles.rolNombre.indexOf('admin') == 0) {
      const rolDeletd = await this.rolService.deleteRol(id);
      return { message: 'ELIMINADO CON EXITO', rolDeletd };
    } else {
      throw new UnauthorizedException('No eres Admin');
    }
  }
}
