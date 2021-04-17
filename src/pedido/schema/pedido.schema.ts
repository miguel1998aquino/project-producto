import { Schema } from 'mongoose';

export const PedidoSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  direccion: { type: String, required: true },
  referencia: { type: String, required: true },
  celular: { type: Number, required: true },
  email: { type: String, required: true },
  producto: {
    type: Schema.Types.ObjectId,
    ref: 'Producto',
    autopopulate: true,
  },
});
