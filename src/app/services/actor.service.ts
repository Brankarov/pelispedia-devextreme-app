import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from '../models/Actor';
import { Casting } from '../models/Casting';
import { Casting_Front } from '../models/Casting copy';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private apiUrl = "https://localhost:7204/api/Director/GetActores";
  private sendApiUrl = "https://localhost:7204/api/Director/PostCasting";
  private deletingUrl = "https://localhost:7204/api/Director/DeleteCasting"

  constructor(private Http: HttpClient) {}

  getActores(): Observable<Actor[]>{
    return this.Http.get<Actor[]>(this.apiUrl);
  }

  postCasting(castingData: Casting_Front): Observable<Casting_Front> {
    return this.Http.post<Casting_Front>(this.sendApiUrl, castingData);
  }
  
  deleteCasting(idPelicula: number, idActor: number): Observable<void> {
    const url = `${this.deletingUrl}?idPelicula=${idPelicula}&idActor=${idActor}`;
    return this.Http.delete<void>(url);
  }
}
