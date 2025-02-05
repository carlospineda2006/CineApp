import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CineService } from '../../core/services/cine.service';
import { Pelicula } from '../../shared/interfaces/Pelicula';
import { ApiResponse } from '../../shared/interfaces/ApiResponse';
import { VwFuncionesPorPeliculaId } from '../../shared/interfaces/VwFuncionePorPeliculaId';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css'
})
export class DetallePeliculaComponent implements OnInit {
  pelicula: Pelicula ={}as Pelicula;
  funciones: VwFuncionesPorPeliculaId[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cineService: CineService) {}

  ngOnInit(): void {
    const peliculaId = Number(this.route.snapshot.paramMap.get('id'));
    if (peliculaId) {
      this.cineService.getPeliculaById(peliculaId).subscribe(
        (response: ApiResponse<Pelicula>) => {
          if (response.success) {
            this.pelicula = response.data;
            console.log('Película cargada:', this.pelicula);
          } else {
            console.error('No se pudo obtener la película');
          }
        },
        (error) => console.error('Error al obtener película:', error)
      );
    }
    this.loadFunciones(peliculaId);
  }

   loadFunciones(peliculaId :number): void {
      this.cineService.getFuncionesByPeliculaId(peliculaId).subscribe((response: ApiResponse<VwFuncionesPorPeliculaId[]>) => {
        if (response.success) {
          this.funciones = response.data;
        }
      });
    }
    reservarEntrada(funcion: any) {
      console.log("Reservando entrada para la función:", funcion);
      // Aquí puedes redirigir a otra página o abrir un modal
      // this.router.navigate(['/reserva', funcion.id]);
    }
    volverCartelera() {
      this.router.navigate(['/cartelera']);
    }
}
