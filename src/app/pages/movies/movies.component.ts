import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/Movie';
import { MovieService } from '../../services/movie.service';
import { ActorService } from '../../services/actor.service';
import { Actor } from '../../models/Actor';
import { Casting } from '../../models/Casting';
import {Casting_Front } from '../../models/Casting copy';

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
  
    // Verifica que data.data.nombre esté definido correctamente
    const actorName = data.data && data.data.nombre ? data.data.nombre : '';
  
    // Busca el actor en this.actores usando el nombre obtenido
    const selectedActor = this.actores.find(actor => actor.Nombre === actorName);
    console.log("Actor seleccionado:", selectedActor);
  
    // Verifica que data.data esté definido y luego haz una copia limpia de los datos si es necesario
    const cleanData = data.data ? JSON.parse(JSON.stringify(data.data)) : null;
    console.log('Datos limpios:', cleanData);
  
    // Crea el objeto castingData con la estructura de Casting_Front
    const castingData: Casting_Front = {
      idPelicula: this.movie ? this.movie.id : 0,
      Actor: actorName,
    };
    console.log('Casting data:', castingData);
  
    // Llama al servicio para enviar los datos de casting
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

