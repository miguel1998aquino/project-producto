import { Document } from 'mongoose';

export interface Producto extends Document {
  readonly nombre: string;
  readonly descripcion: string;
  readonly imagen: string;
  readonly precio: number;
  readonly propietario: string;
  readonly categoria: string;
}
