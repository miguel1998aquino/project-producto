import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { PropietarioService } from 'src/propietario/propietario.service';
import { Propietario } from 'src/propietario/interface/propietario.interface';

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
  roles: string[];
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private propietarioService: PropietarioService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JWTPayload): Promise<Propietario> {
    const user = await this.propietarioService.getPropietario(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
