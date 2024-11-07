import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PostsResponse, singlePostResponse } from "../interfaces/posts";
import { AutenticacionService } from "./autenticacion.service";

@Injectable({
  providedIn: "root",
})
export class PublicacionesService {
  // Se define la url del backend (API) que se va a consumir
  private url = "http://localhost:9898/publicaciones";

  // Se inyecta el servicio de autenticacion para poder enviar el token en las peticiones
  constructor(
    private http: HttpClient, // Se inyecta el servicio HttpClient para realizar peticiones
    private autenticacionService: AutenticacionService // Se inyecta el servicio AutenticacionService para guardar el token
  ) {}

  // Metodo para obtener todas las publicaciones
  // Observable<PostsResponse> es el tipo de dato que se espera recibir del backend
  getPosts(): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(this.url, {
      headers: this.autenticacionService.getAuthHeaders(), // Se envia el token en la peticion
    });
  }

  // Metodo para obtener una sola publicacion
  // Observable<singlePostResponse> es el tipo de dato que se espera recibir del backend
  getPost(id: string): Observable<singlePostResponse> {
    return this.http.get<singlePostResponse>(`${this.url}/${id}`, {
      headers: this.autenticacionService.getAuthHeaders(), // Se envia el token en la peticion
    });
  }

  // Metodo para eliminar una publicacion
  // Obtener el id de la publicacion que se va a eliminar
  deletePost(id: string): Observable<singlePostResponse> {

    // Se realiza la peticion de tipo delete al backend
    return this.http.delete<singlePostResponse>(`${this.url}/${id}`, {
      headers: this.autenticacionService.getAuthHeaders(), // Se envia el token en la peticion
    });
  }
}
