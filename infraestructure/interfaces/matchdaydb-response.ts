export interface MatchDetailItemResponse {
    message: string;
    status:  boolean;
    data:    Data;
}

export interface Data {
    id:          number;
    numero:      number;
    fechaInicio: null;
    fechaFin:    null;
    divisionId:  number;
    partidos:    Partido[];
}

export interface Partido {
    id:number
    fecha:           Date;
    horaInicio:      string;
    horaFin:         string;
    golesLocal:      null;
    golesVisitante:  null;
    equipoLocal:     Equipo;
    equipoVisitante: Equipo;
}

export interface Equipo {
    id:      number;
    nombre:  string;
    logo:    null | string;
    usuario: Usuario;
}

export interface Usuario {
    id:       number;
    nombre:   string;
    apellido: string;
    telefono: string;
    email:    string;
}
