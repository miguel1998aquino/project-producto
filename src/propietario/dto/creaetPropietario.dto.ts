import {
  IsArray,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AppRoles } from 'src/app.roles';

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
  @MinLength(8)
  @MaxLength(128)
  readonly password: string;

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
  celular: number;

  @IsString()
  descripcion: string;

  @IsArray()
  @IsEnum(AppRoles, {
    each: true,
    message: 'debe ser un rol valido',
  })
  readonly roles: string[];

  @IsString()
  logo: string;
}
