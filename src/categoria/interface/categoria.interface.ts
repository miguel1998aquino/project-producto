import { Document } from 'mongoose';

export interface Categoria extends Document {
  readonly nombre: string;
  readonly descripcion: string;
}
