import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PublicacionesService } from "../../services/publicaciones.service";
import { AutenticacionService } from "../../services/autenticacion.service";
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
    private publicacionService: PublicacionesService,
    private autenticacionService: AutenticacionService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id"); // Obtener el id de la URL

    if (id) {
      this.publicacionService.getPost(id).subscribe({
        next: (response) => {
          this.post = response.publicacion;
          this.publicacionService.setPost(this.post); // Guardar la publicación en sessionStorage
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
    const User = this.autenticacionService.getUser(); // Obtener el id del usuario autenticado
    const postInfo = this.publicacionService.getSessionPost(); // Obtener la información de la publicación

    console.log("Id de usuario de la sesion" ,User._id);
    console.log("Id de usuario de la publicacion", postInfo.usuario);
    console.log("Rol de usuario de la sesion" ,User.rol);


    // Verificar si el usuario autenticado es el autor de la publicación o es un administrador
    // Si no es el autor o no es un administrador, no se permite eliminar la publicación
    if((postInfo.usuario == User._id) || (User.rol == 'admin')) {
      this.publicacionService.deletePost(id).subscribe({
        next: (response) => {
          console.log("Publicación eliminada:", response);
          this.router.navigate(["/inicio"]);
        },
        error: (error) => {
          console.error("Error al eliminar la publicación:", error);
        }
      })
      return; // El return se hace para que no se ejecute el código que sigue
    }

    alert("No tienes permisos para eliminar esta publicación");
    console.error("No tienes permisos para eliminar esta publicación");
    return; // El return se hace para que no se ejecute el código que sigue

    
  }
}
