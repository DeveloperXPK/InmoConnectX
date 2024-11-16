import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AutenticacionService } from "../../services/autenticacion.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <div class="content">
        <img src="assets/images/interior.jpg" alt="Imagen de registro" />
        <div class="form-container">
          <h2>Registro</h2>
          <form class="form-group">
            <input
              type="text"
              placeholder="Nombre"
              name="name"
              [(ngModel)]="name"
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              name="lastname"
              [(ngModel)]="lastname"
              required
            />
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
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              name="verifyPassword"
              [(ngModel)]="verifyPassword"
              required
            />
            <div class="checkbox">
              <input type="checkbox" required />
              <label>Aceptar términos y condiciones</label>
            </div>
            <button (click)="registerUser()">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  public name: string = "";
  public lastname: string = "";
  public email: string = "";
  public password: string = "";
  public verifyPassword: string = "";
  public apiResponse: any = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private autenticacionService: AutenticacionService
  ) {}

  public registerUser(): void {
    const url = "http://localhost:9898/registro"; // Url de la API que se va a consumir

    // Atrapamos los datos del formulario para inyectarlos en el body de la petición
    const body = {
      nombre: this.name,
      apellidos: this.lastname,
      email: this.email,
      password: this.password,
      rol: "user", // Asginamos el rol de usuario a los nuevos registros
    };

    // Validamos que todos los campos no estén vacios
    if (
      !this.name ||
      !this.lastname ||
      !this.email ||
      !this.password ||
      !this.verifyPassword
    ) {

      // Si alguno de los campos está vacio se muestra una alerta
      alert("Todos los campos son obligatorios");
      return;
    } 

    // Validamos que los campos de contraseña coincidan
    else if (this.password !== this.verifyPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }


    // Si todos los campos están llenos y las contraseñas coinciden se realiza la petición
    this.http
      .post(url, body, { headers: this.autenticacionService.getHeaders() })
      .subscribe({
        next: (res) => {
          this.apiResponse = res;
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
