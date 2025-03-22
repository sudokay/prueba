import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
// Importa el módulo de Angular Material
import { MaterialModule } from './material.module';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { HomeComponent } from './components/main/home/home.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';  // Asegúrate de importar el archivo correcto


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    HomeComponent,
    UserLoginComponent
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
