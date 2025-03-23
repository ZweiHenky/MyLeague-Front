import { Usuario } from "./teamdb-response";

export default interface TeamInterface {
    id:      number;
    nombre:  string;
    logo:    string | null;
    usuario: Usuario;
    // jugadores: number;
}