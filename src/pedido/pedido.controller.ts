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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async Edit(
    @Param('id') id: string,
    @Body() edit: CreatePedido,
    @PropietarioDecorator() propietarios: any,
  ) {
    const comparar = await this.pedidoService.compararProduct(
      id,
      propietarios._id,
    );
    if (comparar.length == 1) {
      const Edit = await this.pedidoService.editCategoria(id, edit);
      return { message: 'Editado con exito', Edit };
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
    const comparar = await this.pedidoService.compararProduct(
      id,
      propietarios._id,
    );
    if (comparar.length == 1) {
      const deleted = await this.pedidoService.delete(id);
      return { message: 'Eliminado con exito', deleted };
    } else {
      throw new UnauthorizedException('No eres el propietario');
    }
  }
}
