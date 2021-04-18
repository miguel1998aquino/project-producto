import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProducto } from './dto/producto.dto';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {
  constructor(private productoService: ProductoService) {}

  @Get()
  async getProductos() {
    const productos = await this.productoService.getProductos();
    return { productos };
  }

  @Post('create')
  async create(@Body() dto: CreateProducto) {
    const created = await this.productoService.create(dto);
    return {
      message: 'CREADO CON EXITO',
      created,
    };
  }

  @Get(':id')
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
