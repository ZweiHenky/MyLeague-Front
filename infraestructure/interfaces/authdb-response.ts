
export interface AuthResponse {
    token:        string;
    id:       number;
    nombre:     string;
    apellido:     string;
    email:    string;
    telefono:      string;
    refreshToken: string;
}

export interface RegisterResponse {
    message: string;
    status:  boolean;
}