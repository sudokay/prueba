import { Component } from '@angular/core';
import { ApiLoginService } from '../../../services/user-services/api-login/api-login.service';
import { Router } from '@angular/router';// Usaremos el enrutador para redirigir

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  nickname: string = '';
  password: string = '';
  showError: string = ''; // Variable para mostrar el mensaje de error

  constructor(private apiLoginService: ApiLoginService, private router: Router) { }

  // Método para manejar el inicio de sesión
  onSubmit() {
    this.apiLoginService.login(this.nickname, this.password).subscribe(
      (response) => {
        console.log("epa la arepa", response);
        if (response) {
          // Si el login es correcto, redirige al componente de éxito (ejemplo: dashboard)
          this.router.navigate(['/AdminDashComponent']);
        } else {
          // Si el login no es correcto, muestra el modal
          console.log("error credenciales")
          this.showError = "error credenciales";
        }
      },
      (error) => {
        // En caso de error (por ejemplo, problemas con la API), muestra el modal
        console.log("error api", error)
        this.showError = "error api";
      }
    );
  };
}
