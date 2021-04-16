import { Document } from 'mongoose';

export interface Usuario extends Document {
  readonly email: string;

  password: string;

  readonly roles: string[];
}
