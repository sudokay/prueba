import { Component, OnInit } from '@angular/core';
import { ApiUserService } from './api-user.service'; // Importar el servicio

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'age'];  // Columnas que se mostrarán en la tabla
  dataSource: any[] = [];  // Datos que se mostrarán en la tabla

  constructor(private apiService: ApiUserService) { }


  ////API
  ngOnInit() {
    this.apiService.getUsers().subscribe(
      (data) => {
        this.dataSource = data;  // Asignamos los datos obtenidos a la variable users
      },
      (error) => {
        console.error('Hubo un error al obtener los usuarios', error);  // Manejo de errores
      }
    );
  }
}
