

let Directorio = JSON.parse( localStorage.getItem("Directorio")) || [];

const inputNombre = document.getElementById("Nombre");
const inputApellido = document.getElementById("Apellido");
const inputTelefono = document.getElementById("Telefono");
const inputAnotaciones = document.getElementById("Anotaciones");

// Estas son las referencias a mis botones
const btnBORRAR = document.getElementById("btnBORRAR");
const btnEDITAR = document.getElementById("btnEDITAR");
const btnIngresar = document.getElementById("btnIngresar")

const divDirectorio = document.getElementById("divDirectorio");
const alertSinDirectorio = document.getElementById("alertSinDirectorio");

let indexEditar = null;

class Contacto {
    constructor(Nombre, Apellido, Telefono, Anotaciones) {
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Telefono = Telefono;
        this.Anotaciones = Anotaciones;
    }
}
function guardarContacto() {
    let Nombre =      inputNombre.value;
    let Apellido =    inputApellido.value;
    let Telefono =    inputTelefono.value;
    let Anotaciones = inputAnotaciones.value;

    let contacto = new Contacto(
        Nombre,
        Apellido,
        Telefono,
        Anotaciones,
    );

    if (indexEditar === null) {
        console.log("Agregar CONTACTO");
        Directorio.push(contacto);
    } else {
        Directorio[indexEditar] = contacto;
        indexEditar = null;
        console.log("Editar CONTACTO");
    }
    LimpiarFormularioDirectorio();
    localStorage.setItem("Directorio", JSON.stringify(Directorio))
    console.log("Entro funcion guardar CONTACTO");
    mostrarDirectorio();
}

function borrarTodo(){
    localStorage.clear();
    Directorio = [];
    mostrarDirectorio();
    alert("se elimino directorio");
}

console.log(inputNombre.value)

function editarContacto(index){
    let ContactoAEditar = Directorio[index];
    inputNombre.value = ContactoAEditar.Nombre;
    inputApellido.value = ContactoAEditar.Apellido;
    inputTelefono.value = ContactoAEditar.Telefono;
    inputAnotaciones.value = ContactoAEditar.Anotaciones;
    indexEditar = index;
}

function borrarContacto(index){
    console.log(`Entro a brorar todo ${index}`);
    Directorio.splice(index, 1);
    localStorage.setItem("Directorio",JSON.stringify(Directorio));
    mostrarDirectorio();
}

function mostrarDirectorio() {
    if(Directorio.length === 0){
        divDirectorio.innerHTML = `
        <div class="row">
          no hay contactos
        </div>`;
    }
    else{
        divDirectorio.innerHTML = "";
        Directorio.forEach(({Nombre, Apellido, Telefono, Anotaciones}, index) => {
          divDirectorio.innerHTML += `
          <div class="bg-light p-3 text-black">
            <div class="card">
              <h3 class="card-header">
                ${Nombre} ${Apellido}
              </h3>
              <div class="card-body">
                  <h5 class="card-title">${Telefono}</h5>
                  <p class="card-text">${Anotaciones}</p>
                  <button type="button" class="btn btn-secondary col-2 me-md-3" id="editar-${index}" onclick="editarContacto(${index})">EDITAR</button>
                  <button type="button" class="btn btn-danger col-2 me-md-3" id="eliminar-${index}" onclick="borrarContacto(${index})">BORRAR</button>
              </div>
            </div>
          </div>
            `;
        });
      }
    }

    function LimpiarFormularioDirectorio (){
        inputNombre.value = "";
        inputApellido.value = "";
        inputTelefono.value = "";
        inputAnotaciones.value = "";
    }



btnIngresar.addEventListener("click", guardarContacto);
btnBORRAR.addEventListener("click", borrarTodo);

mostrarDirectorio();