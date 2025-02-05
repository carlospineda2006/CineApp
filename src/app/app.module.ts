import { NgModule } from '@angular/core';
import { CarteleraComponent } from './pages/cartelera/cartelera.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { ReservaComponent } from './pages/reserva/reserva.component';
// import { ConfirmacionReservaComponent } from './pages/confirmacion-reserva/confirmacion-reserva.component';
import { FormsModule } from '@angular/forms';
import { DetallePeliculaComponent } from './pages/detalle-pelicula/detalle-pelicula.component';

@NgModule({
  declarations: [
    AppComponent,
    CarteleraComponent,
    DetallePeliculaComponent,
    // ReservaComponent,
    // ConfirmacionReservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
