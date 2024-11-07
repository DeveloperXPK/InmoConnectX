import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PublicacionesService } from "../../services/publicaciones.service";
import { Posts } from "../../interfaces/posts";

@Component({
  selector: "app-publicacion",
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (post) {
    <div class="container">
      <h2>{{ post.titulo }}</h2>
      <div class="main-image">
        @if (post.imagen) {
        <img [src]="post.imagen" [alt]="post.titulo" />
        }
      </div>
      <div class="details">
        <p class="price">
          {{ post.precio | currency : "COP" : "symbol-narrow" : "1.0-0" }}
        </p>
        <p class="description">{{ post.descripcion }}</p>
        <p class="location">{{ post.ubicacion }}</p>
      </div>
      <button (click)="volver()">Volver</button>
      <button (click)="eliminarPost(post._id)">Eliminar</button>
    </div>
    } @else {
    <p>Cargando publicación...</p>
    }
  `,
  styleUrl: "./publicacion.component.css",
})
export class PublicacionComponent implements OnInit {
  post?: Posts;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicacionService: PublicacionesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id"); // Obtener el id de la URL

    if (id) {
      this.publicacionService.getPost(id).subscribe({
        next: (response) => {
          this.post = response.publicacion;
        },
        error: (error) => {
          console.error("Error al cargar la publicación:", error);
          this.router.navigate(["/inicio"]); // Redirigir en caso de error
        },
      });
    } else {
      this.router.navigate(["/inicio"]);
    }
  }

  volver() {
    this.router.navigate(["/inicio"]);
  }

  eliminarPost(id: string) {
    this.publicacionService.deletePost(id).subscribe({
      next: (response) => {
        console.log("Publicación eliminada:", response);
        this.router.navigate(["/inicio"]);
      },
      error: (error) => {
        console.error("Error al eliminar la publicación:", error);
      }
    })
  }
}
