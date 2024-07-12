import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Movie } from '../../models/Movie';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit{

  movies: Movie[] = [];
  selectedMovie: Movie | null = null;
  newActor: string = '';
  poster: string = 'public/poster.png';

  ngOnInit(): void {
   this.movies =  [
    {
      id: 1,
      titulo: 'Blade Runner',
      sinopsis: 'Al final del siglo XX, miles de hombres y mujeres dejaron la tierra para conquistar el espacio y escapar de las grandes ciudades',
      estreno: 1982,
      valoracion: 0.2,
      director: "rodert deniro",
      genero: "noir",
      actores: ['Harrison Ford']
    }
  ];
  console.log(this.movies);
    
  }
  constructor() {
    this.movies =  [
      {
        id: 1,
        titulo: 'Blade Runner',
        sinopsis: 'Al final del siglo XX, miles de hombres y mujeres dejaron la tierra para conquistar el espacio y escapar de las grandes ciudades',
        estreno: 1982,
        valoracion: 0.2,
        director: "rodert deniro",
        genero: "noir",
        actores: ['Harrison Ford']
      }
    ];
   }
}

