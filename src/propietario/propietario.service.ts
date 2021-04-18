import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePropietario } from './dto/creaetPropietario.dto';
import { Propietario } from './interface/propietario.interface';

@Injectable()
export class PropietarioService {
  constructor(
    @InjectModel('Propietario') private propietarioModel: Model<Propietario>,
  ) {}

  async create(createDto: CreatePropietario): Promise<Propietario> {
    const create = new this.propietarioModel(createDto);
    return await create.save();
  }

  async getPropietario(id: string): Promise<Propietario> {
    const propietario = await this.propietarioModel.findById(id);
    return propietario;
  }

  async getPropietarios(): Promise<Propietario[]> {
    const propietarios = await this.propietarioModel.find();
    return propietarios;
  }

  async editCategoria(
    id: number,
    editPro: CreatePropietario,
  ): Promise<Propietario> {
    const Edit = await this.propietarioModel.findByIdAndUpdate(id, editPro, {
      new: true,
    });
    return Edit;
  }

  async delete(id: number): Promise<Propietario> {
    const deleted = await this.propietarioModel.findByIdAndDelete(id);
    return deleted;
  }
}
