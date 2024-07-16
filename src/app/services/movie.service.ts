import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = "https://localhost:7204/api/Peliculas/GetDetailedMovies";
  private sendUrl = "https://localhost:7204/api/Peliculas/UpdateMovie";
  private movieActoresUrl = "https://localhost:7204/api/Peliculas/GetPelisConActores";
 
  constructor(private Http: HttpClient) {}

  getMovies(): Observable<Movie[]>{
    return this.Http.get<Movie[]>(this.apiUrl);
  }
  getMoviesConActores(): Observable<Movie[]>{
    return this.Http.get<Movie[]>(this.movieActoresUrl);
  }

  updateMovie(movieData: any): Observable<any> {
    const payload = {
      id: movieData.id,
      titulo: movieData.titulo,
      estreno: movieData.estreno,
      valoracion: movieData.valoracion,
      sinopsis: movieData.sinopsis,
      director: {
        idDirector: movieData.director.idDirector || 0,
        nombreDirector: movieData.director,
      },
      genero: {
        idGenero: movieData.genero.idGenero || 0,
        nombreGenero: movieData.genero,
      },
      actores: movieData.actores || []
    };
    console.log(" se envia", payload);
    return this.Http.put<any>(this.sendUrl, payload); 
  }

  createMovie(movieData : any): Observable<any>{
    const url = "https://localhost:7204/api/Peliculas/AddMovie";
    return this.Http.post<any>(url, movieData);
  }
}
