import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private token: string = 'session_token'; // Nombre de la clave para guardar el token en sessionStorage

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
  }

  // Metodo para eliminar el token de la sesión
  clearToken(): void {
    sessionStorage.removeItem(this.token); // Elimina el token de sessionStorage
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
