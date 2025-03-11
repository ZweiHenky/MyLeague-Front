import { Usuario } from "./teamdb-response";

export default interface TeamInterface {
    id:      number;
    nombre:  string;
    logo:    string;
    usuario: Usuario;
    // jugadores: number;
}