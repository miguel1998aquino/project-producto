import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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
  async getPropietario(@Param('id') id: string) {
    const data = await this.productoService.getProducto(id);
    return { data };
  }

  @Post('create')
  async create(@Body() dto: CreateProducto) {
    const created = await this.productoService.create(dto);
    return {
      message: 'CREADO CON EXITO',
      created,
    };
  }

  @Put(':id')
  async getProducto(@Param('id') id: number, @Body() edit: CreateProducto) {
    const data = await this.productoService.editṔroducto(id, edit);
    return {
      message: 'EDITADO CON EXITO',
      data,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleted = await this.productoService.delete(id);
    return { message: 'ELIMINADO CON EXITO', deleted };
  }
}
