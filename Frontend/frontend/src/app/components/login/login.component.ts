import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
  <div class="container">
    <div class="image-section">
      <img src="assets/images/interior.jpg" alt="Imagen de fondo">
    </div>
    <div class="form-section">
      <h2>Inicio Sesión</h2>
      <form>
        <input type="text" placeholder="Email" name="email" [(ngModel)]='email' required>
        <input type="password" placeholder="Contraseña" name="password" [(ngModel)]='password' required>
        <button (click)="validateUserCredentials()">Ingresar</button>
      </form>
    </div>
  </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';
  public apiResponse: any = ''; // Variable que se va a utilizar para almacenar la respuesta de la API

  constructor(private http: HttpClient, private router: Router, private autenticacionService: AutenticacionService){}

  public validateUserCredentials(): void {
    const url = 'http://localhost:9898/login'; // Url de la API que se va a consumir

    const body = {
      email: this.email,
      password: this.password
    }

    // POST permite tener mayor seguridad en la transmisión de datos ya que los datos viajan en el cuerpo de la petición
    // y no en la URL como en el caso de GET
    this.http.post(url, body, {headers: this.autenticacionService.getAuthHeaders()}).subscribe({
      next: res => {
        console.log("Se ingreso con exito");
        this.apiResponse = res; // Se almacena la respuesta de la API en la variable apiResponse
        let token = this.apiResponse.token; // Se obtiene el token de la respuesta de la API

        this.autenticacionService.setToken(token); // Se guarda el token en sessionStorage

        this.router.navigate(['inicio'])
      },
      error: err => {
        alert('Las credenciales no coinciden');
        console.log('Las credenciales no coinciden', err);
      }
    })

  }

}
