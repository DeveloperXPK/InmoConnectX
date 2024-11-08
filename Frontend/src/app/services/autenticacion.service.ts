import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private token: string = 'session_token'; // Nombre de la clave para guardar el token en sessionStorage
  private user: any = 'session_user'; // Nombre de la clave para guardar el usuario en sessionStorage


  constructor(private http: HttpClient, private router: Router) {} 

  // Método para obtener el token de la sesión
  getToken(): string | null {
    return sessionStorage.getItem(this.token); // Retorna el token de la sesión si existe
  }

  // Metodo para verificar si el usuario esta autenticado
  isAuthenticated(): boolean {
    return !!this.getToken(); // Retorna true si el token existe (!! convierte el valor a booleano)
  }

  // Metodo para enviar el token al servidor
  setToken(token: string): void {
    sessionStorage.setItem(this.token, token); // Guarda el token en sessionStorage
    // los parametros de la funcion setItem son el nombre de la clave y el valor que se va a guardar
    // en este caso el nombre de la clave es this.token y el valor es token el cual es el token que se recibe como parametro
  }

  setUser(user: any): void {
    // El parametro que se recibe es un objeto con los datos del usuario
    // por ello al guardar el usuario en sessionStorage se convierte a string con JSON.stringify
    // para poder recuperarlo posteriormente con JSON.parse

    sessionStorage.setItem(this.user, JSON.stringify(user)); // Guarda el usuario en sessionStorage
  }

  getUser(): any {
    return JSON.parse(sessionStorage.getItem(this.user) || '{}'); // Retorna el usuario de la sesión
    // se agrega || '{}' para que si no existe el usuario en sessionStorage retorne un objeto vacio
  }

  // Metodo para eliminar el token de la sesión
  clearSesion(): void {
    sessionStorage.removeItem(this.token); // Elimina el token de sessionStorage
    sessionStorage.removeItem(this.user); // Elimina el usuario de sessionStorage
    sessionStorage.removeItem('session_post'); // Elimina la publicación de sessionStorage
  }

  // Metodo para obtener el header con el token
  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json', // Indica que el contenido es de tipo JSON
      'Authorization': `Bearer ${this.getToken()}` // Agrega el token al header
    })
  }
  
  // Metodo para obtener el header sin el token
  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json' // Indica que el contenido es de tipo JSON
    });
  }

}
