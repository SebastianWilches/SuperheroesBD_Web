//Global var
const API_URL = "https://peticiones---giweb-default-rtdb.firebaseio.com/heroes";
let globalData = {};
let principalContainer = document.getElementById('container-heroes');
let modalContainer = document.getElementById("modalContainer");



/*                          Actualizar DOM                      */
function updatePage() {
    console.log(globalData);

    Object.entries(globalData).forEach(([key, value]) => {
        // console.log(heroe)
        principalContainer.innerHTML += `<div class="col">
                                            <div class="card h-100" style="width: 18rem;" id="${value.heroe}">
                                                <img src="${value.imagen}" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                <h5 class="card-title">${value.heroe}</h5>
                                                <p class="card-text">Nombre: ${value.nombre}</p>
                                                <p class="card-text">Edad: ${value.edad}</p>
                                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal${value.heroe}">
                                                    Más Información
                                                </button>
                                                <button type="button" class="btn btn-danger" onclick="deleteHero('${key}')">BORRAR SUPERHEROE</button>
                                                </div>
                                            </div>
                                        </div>`;


        modalContainer.innerHTML += `
        <div class="modal fade" id="modal${value.heroe}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${value.heroe}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <p>Superpoder: ${value.superpoder}</p>
                    <p>Descripción: ${value.descripcion}</p>
                    <p>Debilidad: ${value.debilidad}</p>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`
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
}

//DELETE
const deleteHero = async(id) => {
    const response = await fetch(`${API_URL}/${id}.json`,{
        method: "DELETE"
    })
    const data = await response.json();
    console.log(data);
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

//Funcion test para borrar
const enviarMensaje = (mensaje) => {
    console.log(mensaje);
}

/*                          EVENTOS              */
//crearObjeto haciendo uso de la función addHero y getData
const createHero = () => {
    addHero(getData());
    location.reload();
}

/*                      LLamar funciones            */
getAll(); //Traer heroes de la BD
