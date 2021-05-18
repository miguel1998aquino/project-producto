import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { PropietarioDecorator } from './auth/decorator/propietario.decorator';
import { LoginDto } from './auth/dto/login.dto';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() login: LoginDto) {
    const { correo, password } = login;
    return await this.authService.login(correo);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@PropietarioDecorator() propietario: any) {
    return propietario;
  }
}
