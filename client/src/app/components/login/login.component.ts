import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault(); // Evita que se envíe el formulario y recargue la página

    console.log(this.username);
    console.log(this.password);

    // Llamar al servicio de autenticación para realizar la lógica de inicio de sesión
    this.authService.login(this.username, this.password).subscribe(
      result => {
        console.log(result);
        this.authService.setToken(result.user);
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error durante el inicio de sesión', error);
        // Manejar el error adecuadamente
      }
    );
  }
}
