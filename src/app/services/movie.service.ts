import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = "https://localhost:7204/api/Peliculas";
 
  constructor(private Http: HttpClient) {}

  getMovies(): Observable<Movie[]>{
    return this.Http.get<Movie[]>(this.apiUrl);
  }
}
