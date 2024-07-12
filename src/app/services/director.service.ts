import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Director } from '../models/Director';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private apiUrl = "https://localhost:7204/api/Peliculas/GetDirectores";

  constructor(private Http: HttpClient) {}

  getDirectores(): Observable<Director[]>{
    return this.Http.get<Director[]>(this.apiUrl);
  } 
}
