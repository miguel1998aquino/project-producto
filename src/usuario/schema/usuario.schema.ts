import { Schema } from 'mongoose';
import { Usuario } from '../interface/usuario.interface';
import * as bcrypt from 'bcryptjs';

export const UsuarioSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: Schema.Types.ObjectId, ref: 'Rol', autopopulate: true },
  created_at: { type: Date, default: Date.now },
}).pre<Usuario>('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
