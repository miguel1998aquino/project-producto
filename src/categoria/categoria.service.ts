import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoria } from './dto/categoria.dto';
import { Categoria } from './interface/categoria.interface';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectModel('Categoria') private categoriaModel: Model<Categoria>,
  ) {}

  async create(createDto: CreateCategoria): Promise<Categoria> {
    const Create = new this.categoriaModel(createDto);
    return await Create.save();
  }

  async getCategoria(id: string): Promise<Categoria> {
    const categoria = await this.categoriaModel.findById(id);
    return categoria;
  }

  async getCategorias(): Promise<Categoria[]> {
    const categorias = await this.categoriaModel.find();
    return categorias;
  }

  async editCategoria(
    id: number,
    editCat: CreateCategoria,
  ): Promise<Categoria> {
    const Edit = await this.categoriaModel.findByIdAndUpdate(id, editCat, {
      new: true,
    });
    return Edit;
  }

  async deleted(id: number): Promise<Categoria> {
    const Deleted = await this.categoriaModel.findByIdAndDelete(id);
    return Deleted;
  }
}
