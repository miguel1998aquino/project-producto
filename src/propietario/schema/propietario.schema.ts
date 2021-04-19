import { Schema } from 'mongoose';

export const PropietarioSchema = new Schema({
  nombre: String,
  apellido: String,
  direccion: String,
  correo: String,
  facebook: String,
  instagran: String,
  ticktock: String,
  youtube: String,
  twiter: String,
  ruc: String,
  tienda: String,
  telefono: String,
  celular: Number,
  descripcion: String,
  logo: { type: String, default: 'imagen' },
});
