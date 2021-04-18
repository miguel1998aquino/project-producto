import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRolDto } from './dtos/createRol.dto';
import { Rol } from './interface/rol.interface';

@Injectable()
export class RolesService {
  constructor(@InjectModel('Rol') private rolModel: Model<Rol>) {}

  async create(createDto: CreateRolDto): Promise<Rol> {
    const create = new this.rolModel(createDto);
    return create.save();
  }

  async getRol(id: string): Promise<Rol> {
    const rol = await this.rolModel.findById(id);
    return rol;
  }

  async getRoles(): Promise<Rol[]> {
    const roles = await this.rolModel.find();
    return roles;
  }

  async editRol(id: number, edit: CreateRolDto): Promise<Rol> {
    const editado = await this.rolModel.findByIdAndUpdate(id, edit, {
      new: true,
    });
    return editado;
  }

  async deleteRol(id: number): Promise<Rol> {
    const deleted = await this.rolModel.findByIdAndDelete(id);
    return deleted;
  }
}
