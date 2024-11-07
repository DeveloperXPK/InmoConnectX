import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-post',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
    <div class="content">
      <img src="assets/images/interior.jpg" alt="Imagen de registro"> <!-- Coloca aquí la ruta de tu imagen -->
      <div class="form-container">
        <h2>Crear Publicacion</h2>
        <form class="form-group">
          <input type="text" placeholder="Titulo" name="titulo" [(ngModel)]='titulo' required>
          <input type="text" placeholder="Descripcion" name="descripcion" [(ngModel)]='descripcion' required>
          <input type="text" placeholder="Precio" name="precio" [(ngModel)]='precio' required>
          <input type="text" placeholder="Ubicacion" name="ubicacion" [(ngModel)]='ubicacion' required>
          <input type="text" placeholder="Imagen" name="imagen" [(ngModel)]='imagen' required>
          <button (click)="createPost()">Crear Publicación</button>
        </form>
      </div>
    </div>
  </div>
  `,
  styleUrl: './crear-post.component.css'
})
export class CrearPostComponent {
  public titulo: string = '';
  public descripcion: string = '';
  public precio: string = '';
  public ubicacion: string = '';
  public imagen: string = '';
  public apiResponse: any = '';

  // Dentro del constructor inyectamos autenticacionService para verificar si el usuario esta autenticado
  constructor(private http: HttpClient, private router: Router, private autenticacionService: AutenticacionService) {}

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit() {
    if(!this.autenticacionService.isAuthenticated()){
      this.router.navigate(['/login']);
    }
  }

  public createPost(){
    const url = 'http://localhost:9898/publicaciones';

    const body = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      precio: this.precio,
      ubicacion: this.ubicacion,
      imagen: this.imagen
    }

    this.http.post(url, body, { headers: this.autenticacionService.getAuthHeaders()}).subscribe({
      next: res => {
        this.apiResponse = res;
        this.router.navigate(['/inicio']);
      },
      error: err => {
        console.log(err);
      }
    })


  }
}
