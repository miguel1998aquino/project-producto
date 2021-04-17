import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePedido } from './dto/pedido.dto';
import { PedidoService } from './pedido.service';

@Controller('pedido')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  @Get()
  async getPedidos() {
    const pedidos = await this.pedidoService.getPedidos();
    return {
      pedidos,
    };
  }

  @Post('create')
  async create(@Body() dto: CreatePedido) {
    const create = await this.pedidoService.create(dto);
    return {
      message: 'CREADO CON EXITO',
      create,
    };
  }

  @Get(':id')
  async getPedido(@Param('id') id: string) {
    const Pedido = await this.pedidoService.getPedido(id);
    return {
      Pedido,
    };
  }

  @Put(':id')
  async Edit(@Param('id') id: number, @Body() edit: CreatePedido) {
    const Edit = await this.pedidoService.editCategoria(id, edit);
    return { message: 'Editado con exito', Edit };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleted = await this.pedidoService.delete(id);
    return { message: 'Eliminado con exito', deleted };
  }
}
