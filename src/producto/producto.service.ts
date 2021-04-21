import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from './dto/pagination.dto';
import { CreateProducto } from './dto/producto.dto';
import { Producto } from './interface/producto.interface';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel('Producto') private productoModel: Model<Producto>,
  ) {}

  async create(createDto: CreateProducto): Promise<Producto> {
    const create = new this.productoModel(createDto);
    return await create.save();
  }

  async getProductos(paginationQuery: PaginationQueryDto): Promise<Producto[]> {
    const { limit, offset } = paginationQuery;
    return await this.productoModel
      .find()
      .skip(Number(offset))
      .limit(Number(limit))
      .exec();
  }
  async getProductosPropietarios(
    propietario: string,
    categoria: string,
  ): Promise<Producto[]> {
    const productos = await this.productoModel.find({
      propietario: propietario,
      categoria: categoria,
    });
    return productos;
  }

  async getProducto(id: string): Promise<Producto> {
    const producto = await this.productoModel.findById(id);
    return producto;
  }
  async editṔroducto(id: number, edit: CreateProducto): Promise<Producto> {
    const editProducto = await this.productoModel.findByIdAndUpdate(id, edit, {
      new: true,
    });
    return editProducto;
  }

  async delete(id: number): Promise<Producto> {
    const deleted = await this.productoModel.findByIdAndDelete(id);
    return deleted;
  }
}
