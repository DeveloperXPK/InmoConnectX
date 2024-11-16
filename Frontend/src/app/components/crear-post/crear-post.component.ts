import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AutenticacionService } from "../../services/autenticacion.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-crear-post",
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <div class="content">
        <img src="assets/images/interior.jpg" alt="Imagen de registro" />
        <div class="form-container">
          <h2>Crear Publicacion</h2>
          <form class="form-group">
            <input
              type="text"
              placeholder="Titulo"
              name="titulo"
              [(ngModel)]="titulo"
              required
            />
            <input
              type="text"
              placeholder="Descripcion"
              name="descripcion"
              [(ngModel)]="descripcion"
              required
            />
            <input
              type="number"
              placeholder="Precio"
              name="precio"
              [(ngModel)]="precio"
              required
            />
            <input
              type="text"
              placeholder="Ubicacion"
              name="ubicacion"
              [(ngModel)]="ubicacion"
              required
            />
            <input type="file" name="imagen" [(ngModel)]="imagenes" required />
            <button (click)="createPost()">Crear Publicación</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrl: "./crear-post.component.css",
})
export class CrearPostComponent {
  public titulo: string = ""; // Variable que almacena el titulo del post
  public descripcion: string = ""; // Variable que almacena la descripcion del post
  public precio: string = ""; // Variable que almacena el precio del post
  public ubicacion: string = ""; // Variable que almacena la ubicacion del post
  public imagenes: string = ""; // Variable que almacena la imagen del post
  public apiResponse: any = ""; // Variable que almacena la respuesta de la API

  // Dentro del constructor inyectamos autenticacionService para verificar si el usuario esta autenticado
  constructor(
    private http: HttpClient,
    private router: Router,
    private autenticacionService: AutenticacionService
  ) {}

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit() {
    if (!this.autenticacionService.isAuthenticated()) {
      this.router.navigate(["/login"]);
    }
  }

  public createPost() {
    const url = "http://localhost:9898/publicaciones";

    // Creamos un objeto body que contiene los datos del post
    // estos se obtienen 
    const body = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      precio: this.precio,
      ubicacion: this.ubicacion,
      imagenes: this.imagenes,
      usuario: {
        _id: this.autenticacionService.getUser()._id,
        nombre: this.autenticacionService.getUser().nombre,
        email: this.autenticacionService.getUser().email,
      },
    };

    // Hacemos una validacion para verificar que no haya campos vacios
    if (
      !this.titulo ||
      !this.descripcion ||
      !this.precio ||
      !this.ubicacion ||
      !this.imagenes
    ) {
      alert("No deben haber campos vacios");
      console.log("Faltan datos");
      return;
    }

    // Si todos los campos estan llenos, se hace la peticion POST a la API
    // Se envia el body y los headers de autenticacion
    // Si la peticion es exitosa, se redirige al usuario a la pagina de inicio
    this.http
      .post(url, body, { headers: this.autenticacionService.getAuthHeaders() })
      .subscribe({
        next: (res) => {
          this.apiResponse = res;
          console.log(this.apiResponse);
          console.log(this.autenticacionService.getUser()._id);
          this.router.navigate(["/inicio"]);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
