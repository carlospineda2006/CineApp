import { VwFuncion } from './../../shared/interfaces/VwFuncion';
import { Component, OnInit } from '@angular/core';
import { CineService } from '../../core/services/cine.service';
import { ApiResponse } from '../../shared/interfaces/ApiResponse';
import { Sala } from '../../shared/interfaces/Sala';
import { Genero } from '../../shared/interfaces/Genero';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrl: './cartelera.component.css',
})
export class CarteleraComponent implements OnInit {
  peliculas: VwFuncion[] = [];
  peliculasFiltradas: VwFuncion[] = [];
  salas: Sala[] = []; // Lista de salas
  generos: Genero[] = []; // Lista de géneros
  filtro = { // Filtro inicial
    sala: 0,
    genero: 0,
    titulo: '',
    horaInicio: '',
  };
  constructor(private readonly cineService: CineService) { }

  ngOnInit(): void {
    this.loadSalas();
    this.loadGeneros();
    this.loadPeliculas();
  }
  onFilterChange(): void {
    this.loadPeliculas();
  }

  loadSalas(): void {
    this.cineService.getSalas().subscribe((response: ApiResponse<Sala[]>) => {
      if (response.success) {
        this.salas = response.data;
      }
    });
  }
  loadGeneros(): void {
    this.cineService.getGeneros().subscribe((response: ApiResponse<Genero[]>) => {
      if (response.success) {
        this.generos = response.data;
      }
    });
  }
  loadPeliculas(): void {
    this.cineService.getFunciones(this.filtro).subscribe((response: ApiResponse<VwFuncion[]>) => {
      if (response.success) {
        this.peliculas = response.data;
        this.peliculasFiltradas = [...this.peliculas];
        this.applyFilters();
      }
    });
  }
  applyFilters(): void {
    this.peliculasFiltradas = this.peliculas.filter((pelicula) => {
      const peliculaHora = pelicula.horaInicio ? pelicula.horaInicio.substring(0, 5) : ''; // Extraer "HH:mm"

      return (
        (!this.filtro.sala || pelicula.salaId === +this.filtro.sala) &&
        (!this.filtro.genero || pelicula.generoId === +this.filtro.genero) &&
        (!this.filtro.titulo || pelicula.titulo.toLowerCase().includes(this.filtro.titulo.toLowerCase())) &&
        (!this.filtro.horaInicio || peliculaHora === this.filtro.horaInicio)
      );
    });
  }

}
