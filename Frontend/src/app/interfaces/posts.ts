export interface Posts {
    _id: string;
    titulo: string;
    descripcion: string;
    precio: number;
    ubicacion: string;
    imagen: string;
}

export interface PostsResponse {
    publicaciones: Posts[];
    mensaje?: string; // ? significa que es opcional
}

export interface singlePostResponse {
    publicacion: Posts;
    mensaje?: string;
}
