import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  template: `
    @for (inmueble of inmuebles; track inmueble.id) {
            <div class="property-card">
                <div class="property-info">
                    <h2>{{inmueble.name}}</h2>
                    <h3>{{inmueble.price}}</h3>
                    <p>{{inmueble.description}}</p>
                    <a>Saber más</a> 
                    <!-- Aqui estoy intentando pasar el id para pasar a una pagina donde se muestren los datos de la publicacion -->
                    <!-- <app-publish-info [inmueble]="inmueble" /> -->
                </div>
            </div>
        }

      <button (click)='logout()'>Cerrar Sesión</button>
  `,
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  constructor(private router: Router, private autenticacionService: AutenticacionService) {}



  ngOnInit() {
    let token = sessionStorage.getItem('session_token');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  logout(){
    this.autenticacionService.clearToken();
    this.router.navigate(['/login'])
  }

  inmuebles = [
    {
      id: 1,
      name: 'Casa en Medellin',
      price: 500000000,
      location: 'Medellin',
      description: 'Casa en Medellin, 3 habitaciones, 2 baños, 1 parqueadero'
    },
    {
      id: 2,
      name: 'Apartamento en Bogota',
      price: 300000000,
      location: 'Bogota',
      description: 'Apartamento en Bogota, 2 habitaciones, 1 baño, 1 parqueadero'
    },
    {
      id: 3,
      name: 'Casa en Cali',
      price: 400000000,
      location: 'Cali',
      description: 'Casa en Cali, 4 habitaciones, 3 baños, 2 parqueadero'
    }
  ]
}
