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
    <div class="container">
      @for (inmueble of inmuebles; track inmueble._id) {

      <div class="property-card">
        <div class="property-info">
          <img
            src="assets/images/casa.jpg"
            [alt]="inmueble.titulo"
            width="200"
          />
          <h2>{{ inmueble.titulo }}</h2>
          <h3>
            {{ inmueble.precio | currency : "COP" : "symbol-narrow" : "1.0-0" }}
          </h3>
          <p>{{ inmueble.descripcion }}</p>
          <p>{{ inmueble.ubicacion }}</p>
          <a (click)="verDetalles(inmueble._id)">Saber más</a>
        </div>
      </div>

      }
    </div>
    } @else {
    <h1>No hay inmuebles disponibles</h1>
    }
  `,
  styleUrl: "./inicio.component.css",
})
export class InicioComponent implements OnInit {
  inmuebles: Posts[] = []; // Se crea un arreglo de tipo Posts para almacenar los inmuebles

  // Se inyectan los servicios de AutenticacionService y PublicacionesService
  constructor(
    private router: Router,
    private autenticacionService: AutenticacionService,
    private publicacionesService: PublicacionesService
  ) {}

  // Metodo que se ejecuta al cargar el componente
  ngOnInit() {
    // Si no hay una sesion activa, se redirige al login
    if (!this.autenticacionService.isAuthenticated()) {
      this.router.navigate(["/login"]);
      return; // Se finaliza la ejecucion del metodo
    }

    // Si existe una sesion activa, se cargan los posts
    this.cargarPosts();
  }

  // Metodo para cargar los posts
  cargarPosts() {
    // Se llama al metodo getPosts del servicio PublicacionesService y se suscribe a la respuesta
    this.publicacionesService.getPosts().subscribe({
      next: (data) => {
        this.inmuebles = data.publicaciones; // data.publicaciones es el nombre del objeto que se recibe del backend
        console.log("Posts cargados", this.inmuebles); // Se imprime en consola los posts cargados
      },
      // En caso de error, se imprime en consola el error
      error: (error) => {
        console.log("Error al cargar los posts", error);
      },
    });
  }

  // Metodo para ver los detalles de un inmueble
  // Recibe como parametro el id del inmueble y asi anexar el id al path de la ruta
  verDetalles(id: string) {
    this.router.navigate(["/publicacion", id]); // Se redirige a la ruta /publicacion/:id
  }
}
