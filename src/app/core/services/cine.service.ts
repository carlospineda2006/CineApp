import { ApiResponse } from './../../shared/interfaces/ApiResponse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from '../../shared/interfaces/Sala';
import { Genero } from '../../shared/interfaces/Genero';
import { Pelicula } from '../../shared/interfaces/Pelicula';
import { VwFuncionesPorPeliculaId } from '../../shared/interfaces/VwFuncionePorPeliculaId';

@Injectable({
  providedIn: 'root'
})
export class CineService {
  private readonly apiUrl = 'https://localhost:7004/api';

  constructor(private readonly http: HttpClient) {}

  getPeliculas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pelicula/GetPeliculas`);
  }

  getPeliculaById(id: number): Observable<ApiResponse<Pelicula>> {
    return this.http.get<ApiResponse<Pelicula>>(`${this.apiUrl}/pelicula/GetPeliculaById?peliculaId=${id}`);
  }
  reservarEntrada(reserva: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservas`, reserva);
  }

  getFunciones(filtro:any): Observable<any> {
    let params = new HttpParams();

    if (filtro.salaId !== undefined) params = params.append('SalaId', filtro.salaId.toString());
    if (filtro.generoId !== undefined) params = params.append('GeneroId', filtro.generoId.toString());
    if (filtro.titulo) params = params.append('Titulo', filtro.titulo);
    if (filtro.horaInicio) params = params.append('HoraInicio', filtro.horaInicio);
console.log(params);
    return this.http.get<any>(`${this.apiUrl}/Funcion/GetFunciones`, { params });
  }

  getSalas(): Observable<ApiResponse<Sala[]>> {
    return this.http.get<ApiResponse<Sala[]>>(`${this.apiUrl}/sala/GetSalas`);
  }
  getGeneros(): Observable<ApiResponse<Genero[]>> {
    return this.http.get<ApiResponse<Genero[]>>(`${this.apiUrl}/genero/GetGeneros`);
  }

  getFuncionesByPeliculaId(peliculaId:number): Observable<ApiResponse<VwFuncionesPorPeliculaId[]>> {
    return this.http.get<ApiResponse<VwFuncionesPorPeliculaId[]>>(`${this.apiUrl}/Funcion/GetFuncionesByPeliculaId?peliculaId=${peliculaId}`);
  }
}
