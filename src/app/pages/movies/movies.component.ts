import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/Movie';
import { MovieService } from '../../services/movie.service';
import { ActorService } from '../../services/actor.service';
import { Actor } from '../../models/Actor';
import { Casting } from '../../models/Casting';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit{

  movies: Movie[] = [];
  actores: Actor [] = [];
  movie: Movie | null = null;
  currentMovieIndex: number = 0;

  constructor(private movieService: MovieService, private actorService : ActorService) { }

  ngOnInit(): void {
    this.loadMovies();
    this.loadActores();
  }

  loadMovies(): void {
    this.movieService.getMoviesConActores().subscribe(
      (data: Movie[]) => {
        this.movies = data;
        console.log(data);
        if (this.movies.length > 0) {
          console.log(this.movie);
          this.movie = this.movies[this.currentMovieIndex];
        }
      },
      (error: any) => {
        console.error('Error fetching movies:', error);
      }
    );
  }
  loadActores(): void {
    this.actorService.getActores().subscribe(
      (data: Actor[]) => {
        this.actores = data;
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  nextMovie(): void {
    if (this.currentMovieIndex < this.movies.length - 1) {
      this.currentMovieIndex++;
      this.updateCurrentMovie();
    }
  }

  prevMovie(): void {
    if (this.currentMovieIndex > 0) {
      this.currentMovieIndex--;
      this.updateCurrentMovie();
    }
  }

  updateCurrentMovie(): void {
    console.log(this.movie);
    this.movie = this.movies[this.currentMovieIndex];
  }

  createActing(data: any): void {
    console.log('Datos actualizados:', data);
    const selectedActor = this.actores.find(actor => actor.Nombre === data.nombre);
    const cleanData = JSON.parse(JSON.stringify(data.data));
    console.log(cleanData);
    const castingData = {
      idPelicula: this.movie? this.movie.id : 0, 
      idActor: selectedActor?.idActor || 0,
    };  
    console.log('Casting data:', castingData);
    this.actorService.postCasting(castingData).subscribe(
      (response: any) => {
        console.log('Casting creado:', response);
      },
      (error: any) => {
        console.error('Error al crear el casting:', error);
      }
    );
  }

  deletingCasting(data: any):void {
    const selectedActor = this.actores.find(actor => actor.Nombre === data.nombre);
    const cleanData = JSON.parse(JSON.stringify(data.data));
    const castingData = {
      idPelicula: this.movie? this.movie.id : 0, 
      idActor: selectedActor?.idActor || 0,
    };
    console.log(castingData);
    this.actorService.deleteCasting( castingData.idPelicula,castingData.idActor).subscribe(
      (response: any) => {
        console.log('Casting creado:', response);
      },
      (error: any) => {
        console.error('Error al crear el casting:', error);
      }
    ) ; 
  }

}

