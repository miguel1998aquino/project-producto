import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreatePropietario {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  direccion: string;

  @IsEmail()
  correo: string;

  @IsString()
  facebook: string;

  @IsString()
  instagran: string;

  @IsString()
  ticktock: string;

  @IsString()
  youtube: string;

  @IsString()
  twiter: string;

  @IsString()
  ruc: string;

  @IsString()
  tienda: string;

  @IsPhoneNumber('PR')
  telefono: number;

  @IsPhoneNumber('PR')
  celular: number;

  @IsString()
  descripcion: string;

  @IsString()
  logo: string;
}
