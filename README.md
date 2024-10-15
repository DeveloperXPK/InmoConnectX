# Inmoconnect

El presente trabajo aborda el desarrollo de InmoConnect, una plataforma web integral
destinada al sector inmobiliario. Esta plataforma permite a los usuarios registrarse, crear 
perfiles y publicar propiedades como terrenos, casas y apartamentos para la venta o alquiler. 
InmoConnect busca facilitar el proceso de compra, venta y arrendamiento de inmuebles al 
proporcionar una interfaz intuitiva que conecta a compradores y arrendadores con 
vendedores y propietarios. La metodología empleada en el desarrollo se centra en la 
creación de una experiencia de usuario optimizada, brindando a los usuarios herramientas 
efectivas para la gestión de sus propiedades y su visibilidad en el mercado inmobiliario. 
Además, se presenta una arquitectura sólida que permite la escalabilidad y seguridad de los 
datos, asegurando que tanto la experiencia del usuario como la administración del sistema 
sea eficiente.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Uso](#uso)
- [Casos de Uso](#casos-de-uso)


## Características

- Búsqueda de propiedades para venta, alquiler y compra.
- Filtros avanzados para tipo de propiedad (casa, terreno, apartamento), rango de precios, localización, entre otros.
- Cuentas de usuario para publicar y gestionar inmuebles.
- Información de contacto de los propietarios o agentes.

## Tecnologías Utilizadas

- **Frontend:**
  - TypeScript, Angular, CSS, HTML
  
- **Backend:**
  - Node.js, Express, body-parser, mongoose, jwt-simple, bcrypt, moment
  - MongoDB 

- **Herramientas de desarrollo:**
  - Cursor, Visual Studio Code
  
- **Metodologías Ágiles:**
  - Scrum
  - Roles: Product Owner, Scrum Master, Development Team
  - Herramienta: Trello

## Uso

- Los usuarios pueden registrarse e iniciar sesión para publicar sus propiedades.
- Los usuarios pueden publicar sus propiedades, editarlas y eliminarlas.
- Para buscar propiedades, utiliza la barra de búsqueda y los filtros en la página principal.
- Selecciona una propiedad para ver más detalles y contactar con el propietario o agente.


## Casos de Uso

### Caso de Uso 1: Registro y Creación de Perfil
- Actor: Usuario
- Descripción: El usuario accede a la plataforma y se registra para crear un perfil.
- Resultado Esperado: El usuario crea un perfil y puede publicar propiedades.

### Caso de Uso 2: Publicación de Propiedades
- Actor: Usuario
- Descripción: El usuario crea un perfil y publica una propiedad.
- Resultado Esperado: La propiedad queda listada en el sistema y visible para otros usuarios.

### Caso de Uso 3: Búsqueda de Propiedades
- Actor: Usuario visitante
- Descripción: El usuario visita la plataforma y busca propiedades utilizando la barra de búsqueda y filtros.
- Resultado Esperado: Se muestran las propiedades que cumplen con los criterios de búsqueda del usuario.

### Caso de Uso 4: Visualización de Detalles de Propiedad
- Actor: Usuario visitante
- Descripción: El usuario selecciona una propiedad para ver los detalles.
- Resultado Esperado: Se muestran los detalles de la propiedad, incluyendo imágenes, descripción, precio, características y contacto con el propietario o agente.

### Caso de Uso 5: Contacto con el Propietario o Agente
- Actor: Usuario visitante
- Descripción: El usuario desea contactar con el propietario o agente de una propiedad.
- Resultado Esperado: El usuario tiene acceso a los datos de contacto del propietario o agente.

### Caso de Uso 6: Edición y Eliminación de Propiedades
- Actor: Usuario
- Descripción: El usuario puede editar y eliminar sus propias propiedades.
- Resultado Esperado: La propiedad se modifica o se elimina según las opciones del usuario.