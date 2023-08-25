import { IsNotEmpty, IsEmail, IsString, MinLength } from "class-validator"
export class LoginUsuarioDTO{
    @IsNotEmpty({message:'el mensaje no puede estar vacio'})
    @IsEmail({},{message:'el email no es vailido'})
    email: string

    @IsNotEmpty({message:'la clave no puede estar vacia'})
    @MinLength(8,{message:'la clave no puede tener menosde 8'})
    clave: string
}