// selectores
const formTuNombre = document.querySelector("#tu-nombre");
// funciones
function bienvenida(e) {
  e.preventDefault();
  // Extrae el nombre ingresado por el usuario del campo de entrada con el id "id-nombre"
  const inputNombre = document.querySelector("#id-nombre").value;
  // Oculta el div con el id "div-bienvenida"
  document.querySelector("#div-bienvenida").style.display = "none"; // ocultar el div que pregunta el nombre

  // Crea un nuevo contenido HTML para mostrar un mensaje de bienvenida y opciones de categorías
  const contenedor = document.querySelector("#container");
  contenedor.innerHTML = `
  <div class="row justify-content-center w-auto">
       <div class="col-md-6">

          <h2 class="mb-4 text-center">Hola ${inputNombre}</h2>
          <form class="form-control w-auto text-center" id="categorias">
                <label class="form-label"> Selecciona una categoria:</label>
                <select id="opciones">
                  <option selected>---</option>
                  <option id="bigbang" value= "bigbang.html">The big bang theory</option>
                  <option id="malcolm" value= "malcolm.html">Malcolm in the middle</option>
                </select>
              </form>
        </div>     
  </div>
    `;
  // Evento de cambio para el elemento select con id "opciones"
  let opciones = document.querySelector("#opciones");
  opciones.onchange = function () {
    const valor = this.value; // Obtiene el valor seleccionado
    redireccionar(valor); // Llama a la función redireccionar con el valor seleccionado como argumento
  };
}

function redireccionar(contenido) {
  location.href = contenido; // Redirecciona a la URL proporcionada en el argumento "contenido"
  e.preventDefault(); // Evita que la página se recargue
}

// Agrega un evento de escucha al formulario con el id "tu-nombre"
formTuNombre.addEventListener("submit", bienvenida);
