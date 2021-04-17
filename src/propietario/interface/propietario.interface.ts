import { Document } from 'mongoose';

export interface Propietario extends Document {
  readonly nombre: string;
  readonly apellido: string;
  readonly direccion: string;
  readonly correo: string;
  readonly facebook: string;
  readonly instagran: string;
  readonly ticktock: string;
  readonly youtube: string;
  readonly twiter: string;
  readonly ruc: string;
  readonly tienda: string;
  readonly telefono: string;
  readonly celular: number;
  readonly descripcion: string;
  readonly logo: string;
}
