import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { DepositoService } from './deposito.service';
import { CreateDepositoDto } from 'src/deposito/dto/create-deposito.dto';

@Controller('deposito')
export class DepositoController {
  constructor(private readonly depositoService: DepositoService) {}

  @Get()
  findAll() {
    return this.depositoService.findAll();
  }

  @Delete("/:id")
  eliminar(@Param("id") id:number){ 
    return this.depositoService.remove(id);
  }

  
  @Get("/:id")
  buscarUno(@Param("id") id:number){ 
    return this.depositoService.findOne(id);
  }

  @Post('/registrarDeposito')
  registrarDeposito(@Body() CreateDepositoDto: CreateDepositoDto) {
    return this.depositoService.registrarDeposito(CreateDepositoDto);
  }


  /*@Patch("/:id")
actualizar(@Param("id") id: number, @Body() updateUsuarioDto: UpdateDepositoDto) {
  return this.depositoService.update(id, updateUsuarioDto);
}*/
   
 
  
}
