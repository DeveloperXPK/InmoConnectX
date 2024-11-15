import { Component, OnInit } from "@angular/core";
import { AutenticacionService } from "../../services/autenticacion.service";
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header>
      <div class="logo">
        <h1>InmoConnect</h1>
      </div>
      <nav>
        <ul>
          <li><a class="menu" routerLink="inicio">Inicio</a></li>
          <li *ngIf="isLogged">
            <a class="menu" routerLink="crearPost">Crear Publicacion</a>
          </li>
        </ul>
        <ul>
          <li *ngIf="!isLogged">
            <a class="login-btn" routerLink="login">Iniciar Sesión</a>
          </li>
          <li *ngIf="!isLogged">
            <a class="login-btn" routerLink="register">Registrarse</a>
          </li>
          <li *ngIf="isLogged">
            <a class="login-btn" (click)="logout()">Cerrar Sesion</a>
          </li>
        </ul>
      </nav>
    </header>
  `,
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit {
  isLogged = false;

  // Se pone ! para indicar que la variable no es nula y se inicializa con un valor vacio
  private authSubscription!: Subscription;  

  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authSubscription = this.autenticacionService.authStatus$.subscribe({
      next: (status) => {
        this.isLogged = status;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // Metodo para cerrar sesion
  logout() {
    // Se llama al metodo clearSesion del servicio AutenticacionService que limpia los datos de la sesion
    this.autenticacionService.clearSesion();
    this.router.navigate(["/login"]); // Se redirige al login
  }
}
