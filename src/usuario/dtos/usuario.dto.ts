import {
  IsArray,
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AppRoles } from 'src/app.roles';

export class CreateUsuarioDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  readonly password: string;

  @IsArray()
  @IsEnum(AppRoles, {
    each: true,
    message: 'debe ser un rol valido',
  })
  readonly roles: string[];
}
