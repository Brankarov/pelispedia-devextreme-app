import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReporteGeneral } from '../../models/GeneralReporte';
import { ReporteService } from '../../services/reporte.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit {
  reporteGeneral: ReporteGeneral| null = null;

  constructor(private reportservice: ReporteService) {}
  ngOnInit() {
    this.loadReporte();
  }

  loadReporte(): void{
    this.reportservice.getGeneralReporte().subscribe(
      (data: ReporteGeneral) => {
        this.reporteGeneral = data;
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching movies:', error);
      }
    );
  };
}
