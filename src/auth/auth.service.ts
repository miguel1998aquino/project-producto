import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PropietarioService } from 'src/propietario/propietario.service';

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
  roles: string[];
}
@Injectable()
export class AuthService {
  constructor(
    private propietarioService: PropietarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.propietarioService.findOne(email);
    if (user && (await compare(pass, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
  async login(email: string) {
    const Propietario = await this.propietarioService.findOne(email);
    const payload: JWTPayload = {
      userId: Propietario.id,
      username: Propietario.nombre,
      email: Propietario.email,
      roles: Propietario.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
