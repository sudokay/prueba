import { Component } from '@angular/core';
import { ApiProductService } from '../../../services/product-service/api-product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  product: any[] = [];
  selectedProduct: any = {};
  selectedImage: File | null = null;
  
  
  categoryFilter: string = ''; // Filtro por rol
  filteredProducts: any[] = []; // Usuarios filtrados
  productIdFilter: string = ""; // Filtro por nickname
  nameFilter: string = ''; // Filtro por rol
  base64Image: string | null = null;

  constructor(private apiProductService: ApiProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.apiProductService.getProducts().subscribe(
      (data) => {
        this.product = data;
        this.filteredProducts = data; // Inicializa la lista filtrada con todos los usuarios
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
      }
    )
  };


  // Aplicar los filtros
  applyFilters(): void {
    this.filteredProducts = this.product.filter(product => {
      const matchesProductId = (product.productId ?? '').toString().includes((this.productIdFilter??'').toString());
      const matchesName = (product.name?? '').toString().toLowerCase().includes((this.nameFilter??'').toLowerCase());
      const matchesCategory = (product.category??'').toLowerCase().includes((this.categoryFilter??'').toLowerCase());
      return matchesProductId && matchesName && matchesCategory;
    });
  }

  // Método para abrir el modal y preparar el usuario para edición
  editProduct(product: any): void {
    this.selectedProduct = { ...product }; // Clonamos el usuario para editarlo sin modificar el original
    // Abre el modal de Bootstrap
    const modalElement = document.getElementById('editProductModal');
    const modal = new (window as any).bootstrap.Modal(modalElement);
    modal.show();
  }

  deleteProduct(id: number): void {
    Swal.fire({
      title: "Estas seguro?",
      text: "No seleccionaste una imagen, deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, continuar",
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiProductService.deleteProduct(id).subscribe({
          next: (response) => {
            this.getProducts();
            Swal.fire(
              'Éxito!',
              'producto registrado correctamente.',
              'success'
            );
          },
          error: (error) => {
            console.error('Error al guardar los cambios del usuario', error);
            Swal.fire(
              'Error!',
              'Hubo un problema al guardar los cambios.',
              'error'
            );
          }
        })
      }
    });
  }

  // Método para guardar los cambios del usuario
  saveProduct(): void {
    if (this.selectedImage) {
      // Para mostrar la imagen
      this.apiProductService.updateProduct(this.selectedProduct, this.selectedImage).subscribe(
        () => {
          // Cerrar el modal después de guardar
          const modalElement = document.getElementById('editUserModal');
          const modal = new (window as any).bootstrap.Modal(modalElement);
          modal.hide();
          this.getProducts(); // Recargar la lista de usuarios
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
    } else {
      Swal.fire({
        title: "Estas seguro?",
        text: "No seleccionaste una imagen, deseas continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, continuar",
        cancelButtonText: "No, cancelar"
      }).then((result) => {
        if (result.isConfirmed) {

          this.apiProductService.updateProduct(this.product, this.selectedImage).subscribe(
            () => {
              Swal.fire(
                'Éxito!',
                'producto editado correctamente.',
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
          )
        }
      });
    }
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }



}
