import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
// Importa el módulo de Angular Material
import { MaterialModule } from './material.module';  // Asegúrate de importar el archivo correcto


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  // Agregar HttpClientModule en la sección de imports (apis)
    MaterialModule  // Aquí se importa el módulo que contiene todos los módulos de Angular Material

  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
