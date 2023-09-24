import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { JwtAuthGuard } from 'src/AUTH/auth.guard';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';

@Controller('usuarios')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Delete("/:id")
  eliminar(@Param("id") id:number){ 
    return this.usuariosService.remove(id);
  }

  
  @Get("/:id")
  buscarUno(@Param("id") id:number){ 
    return this.usuariosService.findOne(id);
  }


  @Patch("/:id")
actualizar(@Param("id") id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
  return this.usuariosService.update(id, updateUsuarioDto);
}
   
 
  
}
