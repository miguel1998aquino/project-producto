import { IsNumber, IsString } from 'class-validator';

export class CreateProducto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsString()
  imagen: string;

  @IsNumber()
  precio: number;

  @IsString()
  propietario: string;

  @IsString()
  categoria: string;
}
