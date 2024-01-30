document.addEventListener("DOMContentLoaded", ready);

function ready() {

    data.sort(function() {return Math.random() - 0.5});

    let score= 0;
    let numero= 40;
    const resultado= document.querySelector('#preguntas')
    const conteo= document.createElement('h1');

    

    const timer= setInterval(() => {
        conteo.innerHTML= `Te quedan ${numero} segundos`;
        conteo.classList.add('text-danger', 'my-3')
        resultado.appendChild(conteo);
        numero--;
        if(numero === -1) {
            clearInterval(timer);
            resultado.innerHTML= `
            <div class="d-flex flex-row justify-content-center align-items-center">
                <h1 class="px-3">Perdiste</h1>
                <i class="bi bi-emoji-frown fs-1 text-danger px-3 fw-bold"></i>
            </div>
            <a class="btn btn-danger text-decoration-none text-light fw-bold my-4" href="/html/index.html">Volver a jugar</a>
            `;
        
        }
    },1000)

    mostrarPreguntas(data.shift())

    function mostrarPreguntas(question) {
        const {pregunta, imagen, distractores} = question;

        resultado.innerHTML= `
        <div class="row justify-content-center" w-auto>
            <div class="col-md-6">
                <div class="card w-auto ancho mt-4"> 
                    <h3 class="card-title mt-3">${pregunta}</h3>
                    <div class=card-body>
                        <img src="${imagen}" alt="imagen" class="img-fluid">
                        <form>
                            <fieldset id="form" class="mt-2"></fieldset>
                        </form>
                    </div>
                </div>    
            </div>       
        </div>
        `
        const formulario= document.querySelector('#form')
        const boton= document.querySelector('#boton')

        for(i=0; i < distractores.length; i++) {
        
            const contenido= document.createElement('P')
            contenido.classList.add('grupo-inputs', 'my-1', 'fs-3')
            contenido.innerHTML= `
                <input type="radio" value="${distractores[i]}" name="same">
                <label class="espacio">${distractores[i]}</label>
            `
            formulario.insertBefore(contenido, boton)      
        }
    
        form.onchange= function() {
            const inputSeleccionado = document.querySelector('[name="same"]:checked').value;
            evaluarRespuesta(inputSeleccionado, question); 
        }
      
    }

    function evaluarRespuesta(respuestaOb, question) {
        
    const {respuesta} = question;

    const inputElements = Array.from(document.querySelectorAll('label'))
    let determinar= inputElements.filter( option=> option.innerHTML === respuesta )
    const cercano= determinar[0].parentNode;
    cercano.classList.add('d-flex', 'flex-row', 'justify-content-center')
    let icono = document.createElement('div');
    icono.style.width= "60px";

        if(respuestaOb === respuesta ) {
            score++;
            setTimeout(() => { 
                cercano.classList.add('verde');
                icono.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
              </svg>`;
              icono.classList.add('text-success', 'fw-bold')
                
            cercano.appendChild(icono);
            }, 1000);
            
        
            if(data.length === 3) {
                setTimeout(showScore, 2000)
                return;
            }
            
            setTimeout(() => { 
                mostrarPreguntas(data.shift())
            },1500 );
        
    
        } else {
            setTimeout(() => { 
                const label= document.querySelector(('[name="same"]:checked')).parentNode;
                label.classList.add('rojo','d-flex', 'flex-row', 'justify-content-center')
                icono.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
              </svg>`
              icono.classList.add('text-danger', 'fw-bold')
               label.appendChild(icono)
            }, 1000);
            
            
            setTimeout(() => { 
                cercano.classList.add('verde');
                icono.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
              </svg>`;
              icono.classList.remove('text-danger')
              icono.classList.add('text-success', 'fw-bold')
               cercano.appendChild(icono);
                
            },2000 );

            if(data.length === 3) {
                setTimeout(showScore, 3000)
                return;
            }
        
            setTimeout(() => { 
                mostrarPreguntas(data.shift())
            }, 3000);
        }   

    }
    function showScore() {
        // resultado.setAttribute("", "")
        //Modal

    const modalResultado= document.querySelector('#modal-resultado')
    console.log(modalResultado)
        resultado.innerHTML= `
            <h1>Obtuviste ${score * 100} puntos</h1>
         `;
        switch (score) {
            case 0:
                resultado.innerHTML+= `
                <p class="fs-4 mt-3 text-danger fw-bold">No sabes nada de nada.</p>
             `;
              break;
            case 1:
                resultado.innerHTML+= `
                    <p class="fs-4 mt-3 text-danger fw-bold">Muy mal, pero puedes mejorar.</p>
                 `;
                break;
            
            case 2:
                resultado.innerHTML+= `
                    <p class="fs-4 mt-3 text-danger fw-bold">Casi perfecto.</p>
                 `;
                break;
            
            case 3:
                resultado.innerHTML+= `
                    <p class="fs-4 mt-3 text-danger fw-bold">Eres un verdadero fan de esta serie.</p>
                 `;
                break;
                
          }

          resultado.innerHTML += `<a class="btn btn-danger text-decoration-none text-light fw-bold my-4" href="index.html">Volver a jugar</a>`
       
        clearInterval(timer);
        resultado.removeChild(conteo)
        
    }


    
    




}


