import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarteleraComponent } from './pages/cartelera/cartelera.component';
import { DetallePeliculaComponent } from './pages/detalle-pelicula/detalle-pelicula.component';
//import { ReservaComponent } from './pages/reserva/reserva.component';
//import { ConfirmacionReservaComponent } from './pages/confirmacion-reserva/confirmacion-reserva.component';

const routes: Routes = [
  { path: '', redirectTo: 'cartelera', pathMatch: 'full' },
  { path: 'cartelera', component: CarteleraComponent },
  { path: 'pelicula/:id', component: DetallePeliculaComponent },
 // { path: 'reserva/:id', component: ReservaComponent },
 // { path: 'confirmacion/:id', component: ConfirmacionReservaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
