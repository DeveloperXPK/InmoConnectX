import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AutenticacionService } from "../../services/autenticacion.service";
import { Posts } from "../../interfaces/posts";
import { PublicacionesService } from "../../services/publicaciones.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-inicio",
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (inmuebles.length > 0) { 
      @for (inmueble of inmuebles; track
      inmueble._id) {
      <div class="property-card">
        <div class="property-info">
          <h2>{{ inmueble.titulo }}</h2>
          <h3>{{ inmueble.precio | currency : "COP" : "symbol-narrow" : "1.0-0"}}</h3>
          <p>{{ inmueble.descripcion }}</p>
          <p>{{ inmueble.ubicacion }}</p>
          <a (click)="verDetalles(inmueble._id)">Saber más</a>
        </div>
      </div>
      } 
    } @else {
      <h1>No hay inmuebles disponibles</h1>
    }
    <button (click)="logout()">Cerrar Sesión</button>
  `,
  styleUrl: "./inicio.component.css",
})
export class InicioComponent implements OnInit {
  inmuebles: Posts[] = [];

  constructor(
    private router: Router,
    private autenticacionService: AutenticacionService,
    private publicacionesService: PublicacionesService
  ) {}

  ngOnInit() {
    if (!this.autenticacionService.isAuthenticated()) {
      this.router.navigate(["/login"]);
      return;
    }

    this.cargarPosts();
  }

  cargarPosts() {
    this.publicacionesService.getPosts().subscribe({
      next: (data) => {
        this.inmuebles = data.publicaciones; // data.publicaciones es el nombre del objeto que se recibe del backend
        console.log("Posts cargados", this.inmuebles);
      },
      error: (error) => {
        console.log("Error al cargar los posts", error);
      },
    });
  }

  logout() {
    this.autenticacionService.clearToken();
    this.router.navigate(["/login"]);
  }


  verDetalles(id: string) {
    this.router.navigate(["/publicacion", id]);
  }
}
