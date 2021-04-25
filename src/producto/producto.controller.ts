import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PropietarioDecorator } from 'src/auth/decorator/propietario.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationQueryDto } from './dto/pagination.dto';
import { CreateProducto } from './dto/producto.dto';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {
  constructor(private productoService: ProductoService) {}

  @Get()
  async getProductos(@Query() paginationQuery: PaginationQueryDto) {
    const productos = await this.productoService.getProductos(paginationQuery);
    return { productos };
  }
  @Get('search/:propietario/:categoria')
  async getProductosPropietario(
    @Param('propietario') propietario: string,
    @Param('categoria') categoria: string,
  ) {
    const productos = await this.productoService.getProductosPropietarios(
      propietario,
      categoria,
    );
    return { productos };
  }
  @Get(':id')
  async getProducto(@Param('id') id: string) {
    const data = await this.productoService.getProducto(id);
    return { data };
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() dto: CreateProducto,
    @PropietarioDecorator() propietarios: any,
  ) {
    const re = {
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      imagen: dto.imagen,
      precio: dto.precio,
      propietario: propietarios._id,
      categoria: dto.categoria,
    };

    const created = await this.productoService.create(re);
    return {
      message: 'CREADO CON EXITO',
      created,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async editProducto(
    @Param('id') id: string,
    @Body() edit: CreateProducto,
    @PropietarioDecorator() propietarios: any,
  ) {
    const comparar = await this.productoService.compararProduct(
      id,
      propietarios._id,
    );
    if (comparar.length == 1) {
      const data = await this.productoService.editṔroducto(id, edit);
      return {
        message: 'EDITADO CON EXITO',
        data,
      };
    } else {
      throw new UnauthorizedException('No eres el propietario');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @PropietarioDecorator() propietarios: any,
  ) {
    const comparar = await this.productoService.compararProduct(
      id,
      propietarios._id,
    );
    if (comparar.length == 1) {
      const deleted = await this.productoService.delete(id);
      return { message: 'ELIMINADO CON EXITO', deleted };
    } else {
      throw new UnauthorizedException('No eres el propietario');
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
  async uploadFile(@Param('id') id: string, @UploadedFile() file) {
    console.log(file);
    const image = await this.productoService.setAvatar(id, file.filename);
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
