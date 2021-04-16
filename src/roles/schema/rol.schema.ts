import { Schema } from 'mongoose';
import { RolNombre } from '../rol.enum';

export const RolSchema = new Schema({
  rolNombre: { type: RolNombre },
});
