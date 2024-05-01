// Evento que se ejecuta cuando el DOM ha sido completamente cargado
document.addEventListener("DOMContentLoaded", ready);

// Función que se ejecuta cuando el DOM está listo
function ready() {
  // Se ordena aleatoriamente el array "data"
  data.sort(function () {
    return Math.random() - 0.5;
  });
  // Inicialización de variables
  let score = 0;
  let numero = 40; // Duración del temporizador en segundos
  const resultado = document.querySelector("#preguntas"); // Elemento HTML donde se mostrarán las preguntas
  const conteo = document.createElement("h1"); // Elemento para mostrar el temporizador

  // Temporizador que actualiza el conteo regresivo cada segundo
  const timer = setInterval(() => {
    // Actualiza el contenido del temporizador
    conteo.innerHTML = `Te quedan ${numero} segundos`;
    conteo.classList.add("text-danger", "my-3"); // Añade clases de estilo al temporizador
    resultado.appendChild(conteo); // Agrega el temporizador al elemento HTML "resultado"
    numero--; // Decrementa el contador
    // Si se agota el tiempo, muestra un mensaje de pérdida y un botón para volver a jugar
    if (numero === -1) {
      clearInterval(timer); // Detiene el temporizador
      resultado.innerHTML = `
            <div class="d-flex flex-row justify-content-center align-items-center">
                <h1 class="px-3">Perdiste</h1>
                <i class="bi bi-emoji-frown fs-1 text-danger px-3 fw-bold"></i>
            </div>
            <a class="btn btn-danger text-decoration-none text-light fw-bold my-4" href="/html/index.html">Volver a jugar</a>
            `;
    }
  }, 1000);

  mostrarPreguntas(data.shift());

  // Función para mostrar las preguntas
  function mostrarPreguntas(question) {
    // Extrae los datos de la pregunta, imagen y distractores del objeto "question"
    const { pregunta, imagen, distractores } = question;
    // Actualiza el contenido HTML para mostrar la pregunta y sus opciones
    resultado.innerHTML = `
        <div class="row justify-content-center" w-auto>
            <div class="col-md-6">
                <div class="card w-auto ancho mt-4"> 
                    <h3 class="card-title mt-3">${pregunta}</h3>
                    <div class=card-body>
                        <img loading="lazy" src="${imagen}" alt="imagen" class="img-fluid">
                        <form>
                            <fieldset id="form" class="mt-2"></fieldset>
                        </form>
                    </div>
                </div>    
            </div>       
        </div>
        `;
    // Selecciona el formulario y el botón de envío
    const formulario = document.querySelector("#form");
    const boton = document.querySelector("#boton");

    // Itera sobre los distractores y crea los elementos de las opciones
    for (i = 0; i < distractores.length; i++) {
      const contenido = document.createElement("P");
      contenido.classList.add("grupo-inputs", "my-1", "fs-3");
      contenido.innerHTML = `
                <input type="radio" value="${distractores[i]}" name="same">
                <label class="espacio">${distractores[i]}</label>
            `;
      formulario.insertBefore(contenido, boton);
    }
    // Evento de cambio para el formulario
    form.onchange = function () {
      const inputSeleccionado = document.querySelector(
        '[name="same"]:checked'
      ).value;
      // Deshabilita todos los inputs del formulario
      const inputs = document.querySelectorAll('[name="same"]');
      inputs.forEach((input) => {
        input.disabled = true;
      });
      evaluarRespuesta(inputSeleccionado, question);
    };
  }
  // Función para evaluar la respuesta seleccionada
  function evaluarRespuesta(respuestaOb, question) {
    // Extrae la respuesta correcta de la pregunta
    const { respuesta } = question;
    // Selecciona el elemento correspondiente a la respuesta correcta
    const inputElements = Array.from(document.querySelectorAll("label"));
    let determinar = inputElements.filter(
      (option) => option.innerHTML === respuesta
    );
    const cercano = determinar[0].parentNode;
    cercano.classList.add("d-flex", "flex-row", "justify-content-center");
    let icono = document.createElement("div");
    icono.style.width = "60px";

    // Comprueba si la respuesta seleccionada es correcta
    if (respuestaOb === respuesta) {
      score++; // Incrementa el puntaje
      // Muestra un icono de confirmación y actualiza la pregunta si quedan más disponibles
      setTimeout(() => {
        cercano.classList.add("verde");
        icono.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
              </svg>`;
        icono.classList.add("text-success", "fw-bold");

        cercano.appendChild(icono);
      }, 1000);

      // Si no quedan más preguntas, muestra el puntaje final
      if (data.length === 3) {
        setTimeout(showScore, 2000);
        return;
      }
      // Si quedan más preguntas, muestra la siguiente pregunta después de un breve tiempo
      setTimeout(() => {
        mostrarPreguntas(data.shift());
      }, 1500);
    } else {
      // Si la respuesta seleccionada es incorrecta, muestra un icono de error y la respuesta correcta
      setTimeout(() => {
        const label = document.querySelector(
          '[name="same"]:checked'
        ).parentNode;
        label.classList.add(
          "rojo",
          "d-flex",
          "flex-row",
          "justify-content-center"
        );
        icono.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
              </svg>`;
        icono.classList.add("text-danger", "fw-bold");
        label.appendChild(icono);
      }, 1000);

      // Muestra un icono de confirmación y la respuesta correcta después de un breve tiempo
      setTimeout(() => {
        cercano.classList.add("verde");
        icono.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
              </svg>`;
        icono.classList.remove("text-danger");
        icono.classList.add("text-success", "fw-bold");
        cercano.appendChild(icono);
      }, 2000);
      // Si no quedan más preguntas, muestra el puntaje final
      if (data.length === 3) {
        setTimeout(showScore, 3000);
        return;
      }
      // Si quedan más preguntas, muestra la siguiente pregunta después de un breve tiempo
      setTimeout(() => {
        mostrarPreguntas(data.shift());
      }, 3000);
    }
  }
  // Función para mostrar el puntaje final
  function showScore() {
    // Muestra el puntaje obtenido y un mensaje según el puntaje
    const modalResultado = document.querySelector("#modal-resultado");
    console.log(modalResultado);
    resultado.innerHTML = `
            <h1>Obtuviste ${score * 100} puntos</h1>
         `;
    switch (score) {
      case 0:
        resultado.innerHTML += `
                <p class="fs-4 mt-3 text-danger fw-bold">No sabes nada de nada.</p>
             `;
        break;
      case 1:
        resultado.innerHTML += `
                    <p class="fs-4 mt-3 text-danger fw-bold">Muy mal, pero puedes mejorar.</p>
                 `;
        break;

      case 2:
        resultado.innerHTML += `
                    <p class="fs-4 mt-3 text-danger fw-bold">Casi perfecto.</p>
                 `;
        break;

      case 3:
        resultado.innerHTML += `
                    <p class="fs-4 mt-3 text-danger fw-bold">Eres un verdadero fan de esta serie.</p>
                 `;
        break;
    }
    // Agrega un botón para volver a jugar
    resultado.innerHTML += `<a class="btn btn-danger text-decoration-none text-light fw-bold my-4" href="index.html">Volver a jugar</a>`;

    clearInterval(timer); // Detiene el temporizador
    resultado.removeChild(conteo); // Elimina el temporizador del DOM
  }
}
