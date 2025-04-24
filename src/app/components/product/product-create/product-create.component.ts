import { Component } from '@angular/core';
import { ApiProductService } from '../../../services/product-service/api-product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  product: any = {};
  selectedImage: File | null = null;
  constructor(private apiProductService: ApiProductService) { }
  saveProduct(): void {
    if (this.selectedImage) {
      this.apiProductService.createProduct(this.product, this.selectedImage).subscribe(
        () => {
          Swal.fire(
            'Éxito!',
            'Usuario editado correctamente.',
            'success'
          );
        },
        (error) => {
          console.error('Error al guardar los cambios del usuario', error);
          Swal.fire(
            'Error!',
            'Hubo un problema al guardar los cambios.',
            'error'
          );
        }
      );
    }
  }
  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }
}
