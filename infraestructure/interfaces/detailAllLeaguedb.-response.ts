export interface DetailLeagueResponse {
    message: string;
    status:  boolean;
    data:    Data;
}

export interface Data {
    id:          number;
    nombre:      string;
    descripcion: string;
    direccion:   string;
    logo:        string;
    divisiones:  Divisione[];
}

export interface Divisione {
    id:               number;
    nombre:           string;
    descripcion:      string;
    edad_minima:      number;
    edad_maxima:      number;
    premio:           number;
    arbitraje:        number;
    ultimaJornada:    UltimaJornada;
    penultimaJornada: null;
    partidos:         Partido[];
}

export interface Partido {
    id:              number;
    fecha:           Date;
    horaInicio:      string;
    horaFin:         string;
    golesLocal:      number;
    golesVisitante:  number;
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


export interface UltimaJornada {
    id:          number;
    numero:      number;
    fechaInicio: null;
    fechaFin:    null;
    divisionId:  null;
    partidos:    Partido[];
}
