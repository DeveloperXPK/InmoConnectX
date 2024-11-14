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
            <input
              type="text"
              placeholder="Imagen"
              name="imagen"
              [(ngModel)]="imagen"
              required
            />
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
  public imagen: string = ""; // Variable que almacena la imagen del post
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

    const body = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      precio: this.precio,
      ubicacion: this.ubicacion,
      imagen: this.imagen,
      usuario: {
        _id: this.autenticacionService.getUser()._id,
        nombre: this.autenticacionService.getUser().nombre,
        email: this.autenticacionService.getUser().email,
      },
    };

    if (
      !this.titulo ||
      !this.descripcion ||
      !this.precio ||
      !this.ubicacion ||
      !this.imagen
    ) {
      alert("No deben haber campos vacios");
      console.log("Faltan datos");
      return;
    }

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
