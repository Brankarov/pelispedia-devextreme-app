import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteGeneral } from '../models/GeneralReporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = "https://localhost:7204/api/Report/GetGeneralReporte";

  constructor(private http: HttpClient) { }

  getGeneralReporte(): Observable<any>{
    return this.http.get<ReporteGeneral>(this.apiUrl);
  }
}
