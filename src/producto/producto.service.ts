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

  async getProductos(paginationQuery: PaginationQueryDto): Promise<any> {
    const { limit, page } = paginationQuery;
    const total = await this.productoModel.find().countDocuments();
    const paginate = await this.productoModel
      .find()
      .skip(Number(page))
      .limit(Number(limit))
      .exec();
    return { paginate, total, pages: total / limit };
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
  async editṔroducto(id: string, edit: CreateProducto): Promise<Producto> {
    const editProducto = await this.productoModel.findByIdAndUpdate(id, edit, {
      new: true,
      useFindAndModify: false,
    });
    return editProducto;
  }
  async compararProduct(id: string, propietario: string): Promise<Producto[]> {
    const buscar = await this.productoModel.find({
      _id: id,
      propietario: propietario,
    });
    return buscar;
  }

  async delete(id: string): Promise<Producto> {
    const deleted = await this.productoModel.findByIdAndDelete(id);
    return deleted;
  }

  async setAvatar(userId: string, avatarUrl: string) {
    const avatar = await this.productoModel.findByIdAndUpdate(
      userId,
      {
        imagen: avatarUrl,
      },
      { new: true, useFindAndModify: false },
    );
    return avatar;
  }
}
