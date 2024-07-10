import { Component } from '@angular/core';
import { Movie } from '../../models/Movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
      movies: Movie = {
        id: 0,
        titulo: 'The Matrix',
        estreno: 1990,
        valoracion: 50.25,
        sinopsis: "era hace un vez",
        idDirector: 0,
        idGenero: 0,
      }; 
}
