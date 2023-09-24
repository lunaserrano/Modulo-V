import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuario } from './interface/create-usuario.interface';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { LoginUsuario } from './interface/login-usuario.interface';
@Injectable()
export class UsuariosService {

  constructor(private readonly prismaService: PrismaService) {}
  async create({email, nombre, clave}:CreateUsuario) {
    const claveencriptada= await  bcrypt.hash(clave,10)

    const usuarioExistente= await this.prismaService.usuarios.findUnique({
      where:{
        email
      }
    })

    if(usuarioExistente){
      throw new HttpException("El usuario ya existe, no puede registrar.",409);
    }


    const usuario=await this.prismaService.usuarios.create({
      data:{
        email,
        nombre,
        clave:claveencriptada
      },
    })

    const token= jwt.sign(
      {email:usuario.email,nombre:usuario.nombre},
      process.env.CLAVE_SECRETA,
      {expiresIn:'36000s'}
      )
    
    return token
  }

  async login({email, clave}:LoginUsuario) {
    const claveencriptada= await  bcrypt.hash(clave,10)

    const usuarioExistente= await this.prismaService.usuarios.findUnique({
      where:{
        email
      }
    })

    if(usuarioExistente){
      //comprobar hash de la contraseña
      const passwordCorrecto= await bcrypt.compare(clave,usuarioExistente.clave);
      if(!passwordCorrecto){
        throw new HttpException("La clave es incorrecta.",400);
      }else{
        const token= jwt.sign(
          {email:usuarioExistente.email,nombre:usuarioExistente.nombre},
          process.env.CLAVE_SECRETA,
          {expiresIn:'36000s'}
          )
        
        return token
      }
    }else{
      throw new HttpException("El usuario no existe.",400);
    }


   
  }
  async findAll() {
    return await this.prismaService.usuarios.findMany()
  }

  //find one usuarios by id type number
  async findOne(id: number) {

    return await this.prismaService.usuarios.findUnique({
      where:{
        usuarioId: +id
      }
    })
  }
  

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
     //update query prisma ORM entity usuarios
    return await this.prismaService.usuarios.update({
      where:{
        usuarioId:+id
      },
      data:updateUsuarioDto
    })
  }

  async remove(id: number) {
    //delete query prisma ORM entity usuarios
    return await this.prismaService.usuarios.delete({
      where:{
        usuarioId:id
      }
    })
    
  }
}
