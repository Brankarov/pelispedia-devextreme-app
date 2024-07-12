import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/Movie';
import { Router } from '@angular/router';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { GeneroServiceService } from '../../services/genero.service';
import { Genero } from '../../models/Genero';
import { Director } from '../../models/Director';
import { DirectorService } from '../../services/director.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];
  generos: Genero[] = [];
  directores: Director[] = [];

  constructor(private service: MovieService, private router: Router, private generoService: GeneroServiceService, 
    private directorService: DirectorService) { }

  ngOnInit(): void {
    console.log("fetching");
    this.loadMovies();
    this.loadGeneros();
    this.loadDirectores();
  }

  loadMovies(): void {
    this.service.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
      console.log(movies);
    },
      (error: any) => {
        console.error('Error fetching movies', error)
      }
    )
  }

  loadGeneros(): void {
    this.generoService.getGeneros().subscribe((generos: Genero[]) => {
      this.generos = generos;
    }, 
    (error: any) => { console.error('Error fetching generos', error)
      }
    )
  }

  loadDirectores(): void {
    this.directorService.getDirectores().subscribe((directores: Director[]) => {
      this.directores = directores;
    },
      (error: any) => { console.error('Error fetching generos', error)
      }
    )
  }

  saveMovie(updatedData: any): void {
    console.log('Datos actualizados:', updatedData);
    const cleanData = JSON.parse(JSON.stringify(updatedData.data));
    console.log(cleanData);
    this.service.updateMovie(cleanData).subscribe(
      (response: any) => {
        console.log('Película actualizada:', response);
      },
      (error: any) => {
        console.error('Error al actualizar la película:', error);
      }
    );
  }

  sendMovie(sendData: any) : void {
    const cleanData = JSON.parse(JSON.stringify(sendData.data));
    console.log('Datos enviados:', sendData.data);
    console.log(cleanData);
    this.service.createMovie(cleanData).subscribe(
      (response: any) =>{
        console.log('Película creada:', response);
      },
      (error: any) => {
        console.error('Error al crear la película:', error);
      }
    )
  }

  validateValoracion(e: any) {
    const value = e.value;
    return value >= 0 && value <= 1;
  }

}
