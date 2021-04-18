import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDTO } from './dtos/usuario.dto';
import { Usuario } from './interface/usuario.interface';

@Injectable()
export class UsuarioService {
  constructor(@InjectModel('Usuario') private usuarioModel: Model<Usuario>) {}

  async create(createDto: CreateUsuarioDTO): Promise<Usuario> {
    const create = new this.usuarioModel(createDto);
    return await create.save();
  }
  async getUsuario(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(id);
    return usuario;
  }

  async getUsuarios(): Promise<Usuario[]> {
    const usuarios = await this.usuarioModel.find();
    return usuarios;
  }

  async editUsuario(id: number, edit: CreateUsuarioDTO): Promise<Usuario> {
    const Edit = await this.usuarioModel.findByIdAndUpdate(id, edit, {
      new: true,
    });
    return Edit;
  }

  async Deleted(id: number): Promise<Usuario> {
    const deleted = await this.usuarioModel.findByIdAndDelete(id);
    return deleted;
  }
}
