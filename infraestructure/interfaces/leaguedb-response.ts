export interface ListLeagueResponse{
    message: string;
    status:  boolean;
    data:    Datum[];
}

export interface Datum {
    id:          number;
    nombre:      string;
    descripcion: string;
    direccion:   string;
    premio:      number;
    logo:        string;
    division:    number;
    usuario:     Usuario;
}

export interface Usuario {
    id:       number;
    nombre:   string;
    apellido: string;
    telefono: string;
    email:    string;
}


export interface PostLeagueResponse {
    message: string;
    status:  boolean;
    data:    Datum;
}

