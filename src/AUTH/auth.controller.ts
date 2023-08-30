import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { LoginUsuarioDto } from '../usuarios/dto/login-usuario.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usuariosService: AuthService) {}

  @Post('/registrar')
  registrar(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.registrar(createUsuarioDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginUsuarioDto) {
    return this.usuariosService.login(loginDto);
  }

}
