import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginUsuario } from "src/usuarios/interface/login-usuario.interface";
import { UsuariosService } from "src/usuarios/usuarios.service";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { CreateUsuario } from 'src/usuarios/interface/create-usuario.interface';


@Injectable()
export class AuthService{
    
    constructor(
        private readonly prismaService:PrismaService,
        private jwtService:JwtService,
        private readonly usuariosService:UsuariosService
    ){}

    async login({email, clave}:LoginUsuario):Promise<any> {
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
            const token= this.jwtService.sign({email:usuarioExistente.email,nombre:usuarioExistente.nombre})
            
            return token
          }
        }else{
          throw new HttpException("El usuario no existe.",400);
        }
    
    
       
      }


      async registrar({email, nombre, clave}:CreateUsuario) {
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
    
        const token= this.jwtService.sign({email:usuario.email,nombre:usuario.nombre})
        
        return token
      }


}