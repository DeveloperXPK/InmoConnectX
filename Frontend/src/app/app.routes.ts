import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PublicacionComponent } from './components/publicacion/publicacion.component';
import { CrearPostComponent } from './components/crear-post/crear-post.component';

export const routes: Routes = [

    // Ruta de inicio
    {path: 'inicio', component: InicioComponent},

    // Ruta de Login
    {path: 'login', component: LoginComponent},

    // Ruta de Registro
    {path: 'register', component: RegisterComponent},

    // Ruta de Publicacion por id
    {path: 'publicacion/:id', component: PublicacionComponent}, 

    // Rtura de Crear publicacion
    {path: 'crearPost', component: CrearPostComponent},
];
