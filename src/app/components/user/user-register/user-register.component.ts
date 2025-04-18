import { Component } from '@angular/core';
import { ApiUserService } from '../../../services/api-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  standalone: false,
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  user: any = {};
  confirmPass: String = "";
  result: Boolean = true;



  constructor(private apiUserService: ApiUserService) { }
  saveUser(): void {

    this.user.rol = "user";
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
