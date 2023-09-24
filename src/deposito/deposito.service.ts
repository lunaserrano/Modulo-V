import { PrismaService } from "src/prisma/prisma.service";
import { CreateDeposito } from "./interface/create-deposito.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DepositoService {
    constructor(private readonly prismaService: PrismaService) {}
async create({ descripcion, cantidad, usuarioId_FK }: CreateDeposito) {
    const deposito = await this.prismaService.deposito.create({
        data: {
            descripcion,
            cantidad,
            usuarioId_FK,
        },
    });

    return deposito
}

async findAll() {
    return await this.prismaService.deposito.findMany()
  }

  //find one usuarios by id type number
  async findOne(id: number) {

    return await this.prismaService.deposito.findUnique({
      where:{
        depositoId: +id
      }
    })
  }

  async registrarDeposito({ descripcion, cantidad, usuarioId_FK }: CreateDeposito) {
   
    const deposito = await this.prismaService.deposito.create({
      data: {
        descripcion,
        cantidad,
        usuarioId_FK,
      },
    });

    return deposito
  }
  

  /*async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
     //update query prisma ORM entity usuarios
    return await this.prismaService.usuarios.update({
      where:{
        usuarioId:+id
      },
      data:updateUsuarioDto
    })
  }*/

  async remove(id: number) {
    //delete query prisma ORM entity usuarios
    return await this.prismaService.deposito.delete({
      where:{
        depositoId:id
      }
    })
    
  }

}
