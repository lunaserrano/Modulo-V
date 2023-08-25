import { IsNotEmpty, IsEmail, IsString, MinLength } from "class-validator"

export class CreateUsuarioDto {

    @IsNotEmpty({message:'el email no puede estar vacio'})
    @IsEmail({},{message:'el email no es valido'})
    email:string 

    @IsString({message:'El nombre debe ser una cadena de texto'})
    nombre:string

    @IsNotEmpty({message:'La clave no puede estar vacia'})
    @MinLength(8,{message:'La contraseña tiene que tener 8 caracteres o mas'})
    clave:string

    @IsNotEmpty({message:'El telefono no puede estar vacio'})
    @IsString({message:'Debe de ser una cadena de texto'})
    telefono:string
}
