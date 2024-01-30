// selectores
const formTuNombre= document.querySelector('#tu-nombre');


// funciones
function bienvenida(e) {
  e.preventDefault();
  const inputNombre= document.querySelector('#id-nombre').value; //extraer el nombre del jugador
  document.querySelector('#div-bienvenida').style.display = "none";// ocultar el div que pregunta el nombre

    // crear el div para saludar y elegir
  const contenedor= document.querySelector('#container');
  const cambio= 
  contenedor.innerHTML= `
  <div class="row justify-content-center w-auto">
       <div class="col-md-6">

          <h2 class="mb-4">Hola ${inputNombre}</h2>
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
    `

    let opciones =document.querySelector('#opciones')
    opciones.onchange= function() {
      const valor= this.value;
      redireccionar(valor);
    }
    
}

function redireccionar(contenido) {
  location.href= contenido;
  e.preventDefault();
}


formTuNombre.addEventListener('submit', bienvenida);






 



