import { Component } from '@angular/core';
import { ApiUserService } from '../../../services/api-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create',
  standalone: false,
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {

  user:any = {};

   constructor(private apiUserService: ApiUserService) { }
    saveUser(): void {
      this.apiUserService.createUser(this.user).subscribe(
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
