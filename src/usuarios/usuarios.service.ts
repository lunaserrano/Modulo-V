import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuario } from './interface/create-usuario.interface';
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';


@Injectable()
export class UsuariosService {

constructor(private readonly prismaService: PrismaService) {}
  async create({email, nombre, telefono, clave}:CreateUsuario) {
    const claveencriptada= await  bcrypt.hash(clave,10)
    const usuario=await this.prismaService.usuarios.create({
      data:{
        email,
        nombre,
        telefono,
        clave:claveencriptada
      },
    })


    return usuario
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
