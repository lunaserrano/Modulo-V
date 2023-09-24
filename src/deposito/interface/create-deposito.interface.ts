import { Usuario } from "src/usuarios/entities/usuario.entity";

export interface CreateDeposito{
    descripcion:string;
    cantidad:string;
    usuarioId_FK: number;
}