import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'correo', //'username
      passwordField: 'password', //'passport
    });
  }

  async validate(correo: string, password: string): Promise<any> {
    const propietario = await this.authService.validateUser(correo, password);
    if (!propietario) {
      throw new UnauthorizedException('las credenciales no son validas');
    }
    return propietario;
  }
}
