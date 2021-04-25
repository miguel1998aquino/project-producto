import { Document } from 'mongoose';

export interface Pedido extends Document {
  readonly nombre: string;
  readonly apellido: string;
  readonly direccion: string;
  readonly referencia: string;
  readonly celular: number;
  readonly email: string;
  readonly producto: string;
  readonly propietario: string;
}
