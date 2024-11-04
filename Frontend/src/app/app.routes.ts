import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PublicacionComponent } from './components/publicacion/publicacion.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'publicacion', component: PublicacionComponent},
];
