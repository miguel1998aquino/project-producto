import { Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Propietario } from '../interface/propietario.interface';

export const PropietarioSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  direccion: { type: String, required: true },
  correo: { type: String, required: true },
  password: { type: String, required: true },
  facebook: { type: String, required: true },
  instagran: String,
  ticktock: String,
  youtube: String,
  twiter: String,
  ruc: { type: String, required: true },
  tienda: { type: String, required: true },
  celular: { type: Number, required: true },
  descripcion: { type: String, required: true },
  roles: { type: Schema.Types.ObjectId, ref: 'Rol', autopopulate: true },
  logo: { type: String, default: 'imagen' },
  created_at: { type: Date, default: Date.now },
}).pre<Propietario>('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
