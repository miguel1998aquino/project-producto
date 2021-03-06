import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePedido } from './dto/pedido.dto';
import { Pedido } from './interface/pedido.interface';

@Injectable()
export class PedidoService {
  constructor(@InjectModel('Pedido') private pedidoModel: Model<Pedido>) {}

  async create(createDto: CreatePedido): Promise<Pedido> {
    const create = new this.pedidoModel(createDto);
    return await create.save();
  }

  async getPedido(id: string): Promise<Pedido> {
    const Pedido = await this.pedidoModel.findById(id);
    return Pedido;
  }

  async getPedidos(): Promise<Pedido[]> {
    const pedidos = await this.pedidoModel.find();
    return pedidos;
  }

  async editCategoria(id: string, edit: CreatePedido): Promise<Pedido> {
    const Edit = await this.pedidoModel.findByIdAndUpdate(id, edit, {
      new: true,
    });
    return Edit;
  }

  async compararProduct(id: string, propietario: string): Promise<Pedido[]> {
    const buscar = await this.pedidoModel.find({
      _id: id,
      propietario: propietario,
    });
    return buscar;
  }

  async delete(id: string): Promise<Pedido> {
    const Delete = await this.pedidoModel.findByIdAndDelete(id);
    return Delete;
  }
}
