
@Component({
  selector: "app-crear-post",
  standalone: true,
  imports: [FormsModule, CommonModule],
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
            <input type="file" name="imagen" (change)="onFileSelected($event)" required />
            <button (click)="createPost()">Crear Publicación</button>
          </form>
           <img *ngIf="previewUrl" [src]="previewUrl" alt="Vista previa" style="max-width: 200px;" />
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
  // public imagenes: string = ""; // Variable que almacena la imagen del post
  public apiResponse: any = ""; // Variable que almacena la respuesta de la API


  // Permite seleccionar un archivo, verifica que sea una imagen y lo almacena en la variable selectedFile
  public selectedFile: File | null = null; // Variable que almacena el archivo seleccionado

  // ArrayBuffer ayuda a convertir la imagen a un formato que se pueda mostrar en la vista
  public previewUrl: string | ArrayBuffer | null = null; // Variable que almacena la imagen seleccionada

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

  onFileSelected(event: Event): void {
    // Obtener el archivo seleccionado como input
    const input = event.target as HTMLInputElement;

    // Verificar si se selecciono un archivo
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Crear una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  public createPost() {
    const url = "http://localhost:9898/publicaciones";

    // Creamos un objeto body que contiene los datos del post
    // estos se obtienen de las variables del componente
    const body = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      precio: this.precio,
      ubicacion: this.ubicacion,
      usuario: {
        _id: this.autenticacionService.getUser()._id,
        nombre: this.autenticacionService.getUser().nombre,
        email: this.autenticacionService.getUser().email,
      },
    };

    // Hacemos una validacion para verificar que no haya campos vacios
    if (
      !this.titulo ||
      !this.descripcion ||
      !this.precio ||
      !this.ubicacion ||
      !this.selectedFile
    ) {
      alert("No deben haber campos vacios");
      console.log("Faltan datos");
      return;
    }

    const formData = new FormData();

    // formData.append("titulo", this.titulo);
    // formData.append("descripcion", this.descripcion);
    // formData.append("precio", this.precio);
    // formData.append("ubicacion", this.ubicacion);
    formData.append("imagen", this.selectedFile);
    // formData.append("usuario", this.autenticacionService.getUser()._id);


    // Si todos los campos estan llenos, se hace la peticion POST a la API
    // Se envia el body y los headers de autenticacion
    // Si la peticion es exitosa, se redirige al usuario a la pagina de inicio
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
