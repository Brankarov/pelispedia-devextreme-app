export interface Movie {
    id: number;
    titulo?: string;
    estreno: number;
    valoracion: number;
    sinopsis?: string;
    director: {};
    genero: {};
    actores: string[];
  }