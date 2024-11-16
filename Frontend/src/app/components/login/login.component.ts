import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AutenticacionService } from "../../services/autenticacion.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <div class="content">
        <img src="assets/images/interior.jpg" alt="Imagen de registro" />
        <div class="form-container">
          <h2>Iniciar Sesion</h2>
          <form class="form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              [(ngModel)]="email"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              [(ngModel)]="password"
              required
            />
            <button (click)="validateUserCredentials()">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrl: "./login.component.css",
})
export class LoginComponent {

  // Obtenemos los datos del usuario desde el formulario
  public email: string = ""; // Email del usuario ingresado en el formulario
  public password: string = ""; // Contraseña del usuario ingresada en el formulario
  public apiResponse: any = ""; // Variable que se va a utilizar para almacenar la respuesta de la API

  // Inyectamos los servicios que vamos a utilizar en el componente con el constructor
  constructor(
    private http: HttpClient, // Se inyecta el servicio HttpClient para realizar petic
    private router: Router, // Se inyecta el servicio Router para redirigir a otras rutas
    private autenticacionService: AutenticacionService // Se inyecta el servicio AutenticacionService para guardar el token
  ) {}

  public validateUserCredentials(): void {
    const url = "http://localhost:9898/login"; // Url de la API que se va a consumir

    const body = {
      email: this.email.trim(),
      password: this.password.trim(),
      // Se envían las credenciales del usuario en el cuerpo de la petición y se almacenan en la variable body
      // Limpiamos los espacios en blanco de los campos email y password con la función trim()
    };

    // POST permite tener mayor seguridad en la transmisión de datos ya que los datos viajan en el cuerpo de la petición
    // y no en la URL como en el caso de GET
    this.http
      .post(url, body, { headers: this.autenticacionService.getAuthHeaders() })
      .subscribe({
        next: (res) => {

          // A partir del componente se obtiene la respuesta de la API
          this.apiResponse = res; // respuesta de la API en la variable apiResponse

          // Variables que permiten un mejor manejo de los datos
          const token = this.apiResponse.token; // token de la respuesta de la API
          const user = this.apiResponse.usuario; // usuario de la respuesta de la API

          // this hace referencia a la clase actual (LoginComponent), obtenemos el token y el usuario de la respuesta de la API
          this.autenticacionService.setToken(token); // Token
          this.autenticacionService.setUser(user); // Usuario

          // console.log(this.apiResponse); // Se imprime la respuesta de la API en la consola

          // Al enviar las credenciales correctas, se redirige a la ruta inicio
          this.router.navigate(["inicio"]);
        },
        error: (err) => {
          alert("Las credenciales no coinciden"); // Se muestra un mensaje de error si las credenciales no coinciden
          console.log("Las credenciales no coinciden", err);
        },
      });
  }
}
