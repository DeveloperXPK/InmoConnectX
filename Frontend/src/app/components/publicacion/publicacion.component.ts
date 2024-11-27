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
      <div class="container-left">
        <h1>{{ post.titulo }}</h1>
        <img class="main" src="assets/images/casa.jpg" alt="Principal" />
        <section class="group-images">
          <img src="assets/images/casa.jpg" alt="secondary" />
          <img src="assets/images/casa.jpg" alt="secondary" />
          <img src="assets/images/casa.jpg" alt="secondary" />
          <img src="assets/images/casa.jpg" alt="secondary" />
        </section>
      </div>
      <div class="container-right">
        <section class="info">
          <div class="post-info">
            <h3>⭐⭐⭐⭐⭐</h3>
            <h2>
              {{ post.precio | currency : "COP" : "symbol-narrow" : "1.0-0" }}
            </h2>
            <p>{{ post.descripcion }}</p>
            <p>{{ post.ubicacion }}</p>
          </div>
        </section>
        <section class="cards">
          @for (inmueble of inmuebles; track inmueble._id) {

          <ng-container *ngIf="inmueble._id !== post._id">
            <div class="property-card">
              <div class="property-info">
                <img
                  src="assets/images/casa.jpg"
                  [alt]="inmueble.titulo"
                  width="200"
                />
                <h2>{{ inmueble.titulo }}</h2>
                <h3>
                  {{
                    inmueble.precio
                      | currency : "COP" : "symbol-narrow" : "1.0-0"
                  }}
                </h3>
                <p>{{ inmueble.descripcion }}</p>
                <p>{{ inmueble.ubicacion }}</p>
                <a (click)="verDetalles(inmueble._id)">Saber más</a>
              </div>
            </div>
          </ng-container>
          }
        </section>
        <div class="options">
          <button (click)="volver()">Volver</button>
          <button *ngIf="isOwnerPost" (click)="eliminarPost(post._id)">
            Eliminar
          </button>
        </div>
      </div>
    </div>

    } @else {
    <p>Cargando publicación...</p>
    }
  `,
  styleUrl: "./publicacion.component.css",
})
export class PublicacionComponent implements OnInit {
  post?: Posts;
  inmuebles: Posts[] = []; // Se crea un arreglo de tipo Posts para almacenar los inmuebles
  isOwnerPost = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicacionesService: PublicacionesService,
    private autenticacionService: AutenticacionService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id"); // Obtener el id de la URL

    if (id) {
      this.publicacionesService.getPost(id).subscribe({
        next: (response) => {
          const user = this.autenticacionService.getUser();
          const postInfo = this.publicacionesService.getSessionPost(); // Obtener la información de la publicación

          console.log("Publicación cargada:", response);
          this.post = response.publicacion;
          this.publicacionesService.setPost(this.post); // Guardar la publicación en sessionStorage
          if (postInfo.usuario._id == user._id || user.rol == "admin") {
            this.isOwnerPost = true;
          }
          console.log(this.isOwnerPost);
        },
        error: (error) => {
          console.error("Error al cargar la publicación:", error);
          this.router.navigate(["/inicio"]); // Redirigir en caso de error
        },
      });

      this.cargarPosts();
    } else {
      this.router.navigate(["/inicio"]);
    }
  }

  volver() {
    this.router.navigate(["/inicio"]);
  }

  isOwner() {
    const User = this.autenticacionService.getUser(); // Obtener el id del usuario autenticado
    const postInfo = this.publicacionesService.getSessionPost(); // Obtener la información de la publicación
    if (postInfo.usuario._id == User._id || User.rol == "admin") {
      return (this.isOwnerPost = true);
    }

    return (this.isOwnerPost = false);
  }

  eliminarPost(id: string) {
    const User = this.autenticacionService.getUser(); // Obtener el id del usuario autenticado
    const postInfo = this.publicacionesService.getSessionPost(); // Obtener la información de la publicación

    // Verificar si el usuario autenticado es el autor de la publicación o es un administrador
    // Si no es el autor o no es un administrador, no se permite eliminar la publicación
    if (postInfo.usuario._id == User._id || User.rol == "admin") {
      this.publicacionesService.deletePost(id).subscribe({
        next: (response) => {
          console.log("Publicación eliminada:", response);
          this.router.navigate(["/inicio"]);
        },
        error: (error) => {
          console.error("Error al eliminar la publicación:", error);
        },
      });
      return; // El return se hace para que no se ejecute el código que sigue
    }

    alert("No tienes permisos para eliminar esta publicación");
    // console.error("No tienes permisos para eliminar esta publicación");
    return; // El return se hace para que no se ejecute el código que sigue
  }

  // Metodo para cargar los posts
  cargarPosts() {
    // Se llama al metodo getPosts del servicio PublicacionesService y se suscribe a la respuesta
    this.publicacionesService.getPosts().subscribe({
      next: (data) => {
        this.inmuebles = data.publicaciones; // data.publicaciones es el nombre del objeto que se recibe del backend
        // console.log("Posts cargados", this.inmuebles); // Se imprime en consola los posts cargados
      },
      // En caso de error, se imprime en consola el error
      error: (error) => {
        console.log("Error al cargar los posts", error);
      },
    });
  }

  verDetalles(id: string) {
    this.router.navigate(["/publicacion", id]); // Se redirige a la ruta /publicacion/:id
  }
}
