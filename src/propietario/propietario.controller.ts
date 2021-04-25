import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePropietario } from './dto/creaetPropietario.dto';
import { PropietarioService } from './propietario.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PropietarioDecorator } from 'src/auth/decorator/propietario.decorator';

@Controller('propietario')
export class PropietarioController {
  constructor(private servicePropietario: PropietarioService) {}

  @Get()
  async getPropietarios() {
    const propietarios = await this.servicePropietario.getPropietarios();
    return { propietarios };
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() dto: CreatePropietario,
    @PropietarioDecorator() propietario: any,
  ) {
    if (propietario.roles.rolNombre.indexOf('admin') == 0) {
      const created = await this.servicePropietario.create(dto);
      return {
        message: 'CREADO CONB EXITO',
        created,
      };
    } else {
      throw new UnauthorizedException('No eres Admin');
    }
  }

  @Get(':id')
  async getPropietario(@Param('id') id: string) {
    const data = await this.servicePropietario.getPropietario(id);
    return { data };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async edit(
    @Param('id') id: number,
    @Body() edit: CreatePropietario,
    @PropietarioDecorator() propietario: any,
  ) {
    if (
      propietario.id == id &&
      propietario.roles.rolNombre.indexOf('usuario') == 0
    ) {
      console.log('es el mismo');
      const edited = await this.servicePropietario.editCategoria(id, edit);
      return { message: 'EDITADO CON EXITO', edited };
    } else if (propietario.roles.rolNombre.indexOf('admin') == 0) {
      console.log('es el Admin');
      const edited = await this.servicePropietario.editCategoria(id, edit);
      return { message: 'EDITADO CON EXITO', edited };
    } else {
      throw new UnauthorizedException(
        'No Tienes Acceso a editar otros usuarios',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(';id')
  async delete(
    @Param('id') id: number,
    @PropietarioDecorator() propietario: any,
  ) {
    if (propietario.roles.rolNombre.indexOf('admin') == 0) {
      const deleted = await this.servicePropietario.delete(id);
      return { message: 'ELIMINADO CON EXITO', deleted };
    } else {
      throw new UnauthorizedException('No Tienes Acceso');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './image',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(
    @Param('id') id: number,
    @UploadedFile() file,
    @PropietarioDecorator() propietario: any,
  ) {
    if (
      propietario.id == id &&
      propietario.roles.rolNombre.indexOf('usuario') == 0
    ) {
      const image = await this.servicePropietario.setAvatar(id, file.filename);
      return {
        image,
        message: 'IMAGEN SUBIDA',
      };
    } else if (propietario.roles.rolNombre.indexOf('admin') == 0) {
      const image = await this.servicePropietario.setAvatar(id, file.filename);
      return {
        image,
        message: 'IMAGEN SUBIDA',
      };
    } else {
      throw new UnauthorizedException(
        'No Tienes Acceso a editar otros usuarios',
      );
    }
  }

  @Get('imagen/:id')
  async serveAvatar(@Param('id') id: string, @Res() res: any): Promise<any> {
    res.sendFile(id, { root: 'image' });
  }
}
