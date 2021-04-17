import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreatePedido {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  direccion: string;

  @IsString()
  referencia: string;

  @IsPhoneNumber('PR')
  celular: number;
  @IsEmail()
  email: string;

  @IsString()
  producto: string;
}
