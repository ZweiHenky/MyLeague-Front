export interface Datum {
    id:      number;
    nombre:  string;
    logo:    null | string;
    usuario: Usuario;
}

export interface Usuario {
    id:       number;
    nombre:   string | null;
    apellido: string | null;
    telefono: string | null;
    email:    string | null;
}

export interface ListTeamResponse {
    message: string;
    status:  boolean;
    data:    Datum[];
}

export interface CreateTeamResponse {
    message: string;
    status:  boolean;
    data:    Datum;
}