export interface DivisionResponse {
    message: string;
    status:  boolean;
    data:    Data;
}

export interface GetDivisionResponse {
    message: string;
    status:  boolean;
    data:    Data[];
}

export interface Data {
    id:          number;
    nombre:      string;
    descripcion: string;
    edad_minima: number | null;
    edad_maxima: number | null;
    premio:      number;
    arbitraje:   number;
    liga:        Liga;
}

export interface Liga {
    id:          number;
    nombre:      null;
    descripcion: null;
    direccion:   null;
    logo:        null;
    usuario:     Usuario | null;
}


export interface Usuario {
    id:       number;
    nombre:   string;
    apellido: string;
    telefono: string;
    email:    string;
}
