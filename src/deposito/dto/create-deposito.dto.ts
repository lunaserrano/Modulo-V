import { IsNotEmpty,IsEmail,IsString,MinLength } from "class-validator"
import { Usuario } from "../../usuarios/entities/usuario.entity"

export class CreateDepositoDto {

    @IsString({message:'La descripcion debe ser una cadena de texto'})
    descripcion:string

    @IsNotEmpty({message:'La cantidad de deposito no puede estar vacia'})
    cantidad: string

    @IsNotEmpty({message:'El usuario del deposito no puede estar vacia'})
    usuarioId_FK: number

}