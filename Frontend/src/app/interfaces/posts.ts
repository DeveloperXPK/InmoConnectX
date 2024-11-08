export interface Posts {
    _id: string;
    titulo: string;
    descripcion: string;
    precio: number;
    ubicacion: string;
    imagen: string;
    usuario: {
        _id: string;
        nombre: string;
        email: string;
    };
    fechaCreacion: Date;
}

// Interface para la respuesta de la API de todos los posts
export interface PostsResponse {
    publicaciones: Posts[]; // Array de objetos de tipo Posts
    mensaje?: string; // ? significa que es opcional
}


// Interface para la respuesta de la API de un solo post
export interface singlePostResponse {
    publicacion: Posts; // Objeto de tipo Posts
    mensaje?: string; // ? significa que es opcional
}
