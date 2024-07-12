import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from '../models/Genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroServiceService {

  private apiUrl = "https://localhost:7204/api/Peliculas/GetGeneros";

  constructor(private Http: HttpClient) {}

  getGeneros(): Observable<Genero[]>{
    return this.Http.get<Genero[]>(this.apiUrl);
  } 
}
