import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {

  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  createProduct(product: any, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stock', product.price);
    formData.append('image', image);

    return this.http.post(this.apiUrl, formData);
  }

  // Obtener todos los productos
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Actualizar un usuario
  updateProduct(product: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${product.id}`, product);
  }

  // Método para eliminar un usuario
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
