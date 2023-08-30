import { IsNotEmpty,IsEmail,MinLength } from "class-validator"

export class LoginUsuarioDto {
    @IsNotEmpty({message:'El email no puede estar vacio'})
    @IsEmail({},{message:'El email no es valido'})    
    email:string

    @IsNotEmpty({message:'La clave no puede estar vacia'})
    @MinLength(8,{message:'La clave debe tener al menos 8 caracteres'})
    clave:string
}
