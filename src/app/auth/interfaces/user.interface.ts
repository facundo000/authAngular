export interface User {
    email:    string;
    nombre:   string;
    apellido: string;
    telefono: string;
    id:       string;
    esActivo: boolean;
    roles:    string[];
    token:    string;
}
