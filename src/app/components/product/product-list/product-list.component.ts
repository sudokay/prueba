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
  selectedImage: string = '';

  filteredProducts: any[] = []; // Usuarios filtrados
  nicknameFilter: string = ''; // Filtro por nickname
  rolFilter: string = ''; // Filtro por rol
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
    this.filteredProducts = this.product.filter(user => {
      const matchesNickname = user.nickname.toLowerCase().includes(this.nicknameFilter.toLowerCase());
      const matchesRole = this.rolFilter ? user.rol.toLowerCase() === this.rolFilter.toLowerCase() : true;
      return matchesNickname && matchesRole;
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
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiProductService.deleteProduct(id).subscribe(
          () => {
            this.getProducts(); // Recargar la lista después de eliminar
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            );
          },
          (error) => {
            console.error('Error al eliminar el usuario', error);
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el usuario.',
              'error'
            );
          }
        );
      }
    });
  }

  // Método para guardar los cambios del usuario
  saveProduct(): void {
    // Para mostrar la imagen
    this.apiProductService.updateProduct(this.selectedProduct).subscribe(
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
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.selectedImage = reader.result as string; // Guarda la imagen como Base64
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }


  
}
