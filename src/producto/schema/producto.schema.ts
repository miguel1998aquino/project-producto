import { Schema } from 'mongoose';

export const ProductoSchema = new Schema({
  nombre: String,
  descripcion: String,
  imagen: String,
  precio: Number,
  propietario: {
    type: Schema.Types.ObjectId,
    ref: 'Propietario',
    autopopulate: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    autopopulate: true,
  },
});
