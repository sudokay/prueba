import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Para manejar las respuestas asincrónicas

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  private apiUrl = 'http://localhost:8080/user'; // URL de la API de ejemplo

  constructor(private http: HttpClient) { }

  // Método para obtener datos de la API
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);  // Realizamos una solicitud GET a la API
  }
}
