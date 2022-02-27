//Global var
const API_URL = "https://peticiones---giweb-default-rtdb.firebaseio.com/heroes";
/*ESTRUCTURA FIREBASE
BD => HEROES => ID => (debilidad, descripcion, edad, heroe, imagen, nombre, superpoder)
*/
let globalData = {};
let principalContainer = document.getElementById('container-heroes');
let modalContainerInfoHeroe = document.getElementById("modalContainerInfoHeroe");
let modalContainerUpdateHeroe = document.getElementById("modalContainerUpdateHeroe");
let modalContainerDeleteHero = document.getElementById("modalContainerDeleteHero");



/*                          Actualizar DOM                      */
function updatePage() {
    console.log(globalData);

    Object.entries(globalData).forEach(([key, value]) => {
        // console.log(heroe)
        principalContainer.innerHTML += `<div class="col">
                                            <div class="card h-100" style="width: 18rem;" id="${key}">
                                                <img src="${value.imagen}" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                    <h5 class="card-title">${value.heroe}</h5>
                                                    <p class="card-text">Nombre: ${value.nombre}</p>
                                                    <p class="card-text">Edad: ${value.edad}</p>
                                                    <div class="d-flex justify-content-between">
                                                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modal${key}Info">
                                                            Más Información
                                                        </button>
                                                        <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modal${key}Delete">BORRAR SUPERHEROE</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;


        modalContainerInfoHeroe.innerHTML += `
        <div class="modal fade" id="modal${key}Info" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${value.heroe}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p><span class="bold">Nombre: </span>${value.nombre}</p>
                        <p><span class="bold">Edad: </span>${value.edad}</p>
                        <p><span class="bold">Superpoder: </span>${value.superpoder}</p>
                        <p><span class="bold">Descripción: </span>${value.descripcion}</p>
                        <p><span class="bold">Debilidad: </span>${value.debilidad}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modal${key}Update">Actualizar información</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`;

        modalContainerUpdateHeroe.innerHTML += `
        <div class="modal fade" id="modal${key}Update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${value.heroe}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                        <label for="${key}HeroeInputUpdate" class="form-label">Heroe</label>
                        <input type="text" class="form-control" id="${key}HeroeInputUpdate" placeholder="Heroe" value="${value.heroe}">
                        </div>
                        <div class="mb-3">
                        <label for="${key}NombreInputUpdate" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="${key}NombreInputUpdate" placeholder="Nombre" value="${value.nombre}">
                        </div>
                        <div class="mb-3">
                        <label for="${key}EdadInputUpdate" class="form-label">Edad</label>
                        <input type="text" class="form-control" id="${key}EdadInputUpdate" placeholder="Edad" value="${value.edad}">
                        </div>
                        <div class="mb-3">
                        <label for="${key}SuperpoderInputUpdate" class="form-label">Superpoder</label>
                        <input type="text" class="form-control" id="${key}SuperpoderInputUpdate" placeholder="Superpoder" value="${value.superpoder}">
                        </div>
                        <div class="mb-3">
                        <label for="${key}DescripcionInputUpdate" class="form-label">Descripcion</label>
                        <input type="text" class="form-control" id="${key}DescripcionInputUpdate" placeholder="Descripcion" value="${value.descripcion}">
                        </div>
                        <div class="mb-3">
                        <label for="${key}DebilidadInputUpdate" class="form-label">Debilidad</label>
                        <input type="text" class="form-control" id="${key}DebilidadInputUpdate" placeholder="Debilidad" value="${value.debilidad}">
                        </div>
                        <div class="mb-3">
                        <label for="${key}ImagenInputUpdate" class="form-label">Imagen</label>
                        <input type="text" class="form-control" id="${key}ImagenInputUpdate" placeholder="Imagen" value="${value.imagen}">
                        </div>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-dark" onclick=eventUpdateHero('${key}HeroeInputUpdate','${key}EdadInputUpdate','${key}ImagenInputUpdate','${key}NombreInputUpdate','${key}SuperpoderInputUpdate','${key}DescripcionInputUpdate','${key}DebilidadInputUpdate','${key}')>Actualizar información</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`


        modalContainerDeleteHero.innerHTML += `
        <div class="modal fade" id="modal${key}Delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <h5 class="modal-title" id="exampleModalLabel">¿Esta seguro que desea borrar a ${value.nombre}?</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" onclick="deleteHero('${key}')">BORRAR SUPERHEROE</button>
                        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `
    })
}




/*                          Operaciones                         */
//GET ALL
const getAll = async() => {
    const response = await fetch(API_URL+".json");
    const data = await response.json();
    console.log(data);


    globalData = data;
    updatePage();
}

//GET 1 ELEMENT
const getHero = async(id) => {
    const response = await fetch(`${API_URL}/${id}.json`);
    const data = await response.json();
    console.log(data);
}

//POST
const addHero = async(objectHero) =>{
    const response = await fetch(API_URL+".json",
        {
            method : 'POST', 
            body : JSON.stringify(objectHero),
            headers: {
                'Content-Type': 'application/json'
            }
        });  
    const data = await response.json();
    console.log(data);

    //Actualizar pagina para mostrar la info    
    recargarPagina();
}

//PUT
const updateHero = async(id, objectHero) =>{
    const response = await fetch(`${API_URL}/${id}.json`,{
        method: "PUT",
        body : JSON.stringify(objectHero),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log(data);


    //Actualizar pagina para mostrar la info    
    recargarPagina();    
}

//DELETE
const deleteHero = async(id) => {
    const response = await fetch(`${API_URL}/${id}.json`,{
        method: "DELETE"
    })
    const data = await response.json();
    console.log(data);


    //Actualizar pagina para mostrar la info    
    recargarPagina();
}


//getDataForm
const getData = () => {
    const heroe = document.getElementById("HeroeInput").value;
    const edad = document.getElementById("EdadInput").value;
    const imagen = document.getElementById("ImagenInput").value;
    const nombre = document.getElementById("NombreInput").value;
    const superpoder = document.getElementById("SuperpoderInput").value;
    const descripcion = document.getElementById("DescripcionInput").value;
    const debilidad = document.getElementById("DebilidadInput").value;
    
    let objetoForm = {
        debilidad: debilidad,
        descripcion: descripcion,
        edad: edad,
        heroe: heroe,
        imagen: imagen,
        nombre: nombre,
        superpoder: superpoder,
    }
    
    return objetoForm;
}

const recargarPagina = () => {
    location.reload();
}


/*                          EVENTOS              */
//crearObjeto haciendo uso de la función addHero y getData
const createHero = () => {
    addHero(getData());
}


//Obtener un solo heroe del modal de updateHero
const eventUpdateHero = (inputHeroe, inputEdad, inputImagen, inputNombre, inputSuperpoder, inputDescripcion, inputDebilidad, id) => {
    const heroe = document.getElementById(inputHeroe).value;
    const edad = document.getElementById(inputEdad).value;
    const imagen = document.getElementById(inputImagen).value;
    const nombre = document.getElementById(inputNombre).value;
    const superpoder = document.getElementById(inputSuperpoder).value;
    const descripcion = document.getElementById(inputDescripcion).value;
    const debilidad = document.getElementById(inputDebilidad).value;
    
    let objetoForm = {
        debilidad: debilidad,
        descripcion: descripcion,
        edad: edad,
        heroe: heroe,
        imagen: imagen,
        nombre: nombre,
        superpoder: superpoder,
    }
    
    updateHero(id, objetoForm);


    
}

/*                      LLamar funciones            */
getAll(); //Traer heroes de la BD

