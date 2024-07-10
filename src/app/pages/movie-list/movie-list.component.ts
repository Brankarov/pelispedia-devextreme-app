import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/Movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];

  constructor(private service: MovieService){}

  ngOnInit(): void {
    this.loadMovies();
    console.log("init");
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

}
