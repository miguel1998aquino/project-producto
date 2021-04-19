import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePropietario } from './dto/creaetPropietario.dto';
import { PropietarioService } from './propietario.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  async uploadFile(@Param('id') id: number, @UploadedFile() file) {
    console.log(file);
    const image = await this.servicePropietario.setAvatar(id, file.filename);
    return {
      image,
      message: 'IMAGEN SUBIDA',
    };
  }

  @Get('imagen/:id')
  async serveAvatar(@Param('id') id: string, @Res() res: any): Promise<any> {
    res.sendFile(id, { root: 'image' });
  }
}
