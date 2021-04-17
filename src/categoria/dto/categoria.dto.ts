import { IsString } from 'class-validator';

export class CreateCategoria {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}
