console.log("hola, si estoy bien conectado");
const contenedorProductos = document.getElementById('ContenedorProductos');
const tituloNuevo = document.getElementById('titulo');
const descripcionNuevo = document.getElementById('descripcion');
const codigoNuevo = document.getElementById('codigo');
const precioNuevo = document.getElementById('precio');
const stockNuevo = document.getElementById('stock');
const categoriaNuevo = document.getElementById('categoria');

const botonAdd = document.getElementById('addButton');

let productoNuevo;

botonAdd.addEventListener('click', (event) => {
    event.preventDefault();
    productoNuevo = { title: tituloNuevo.value, description: descripcionNuevo.value, code: codigoNuevo.value, price: precioNuevo.value, stock: stockNuevo.value, category: categoriaNuevo.value, thumbnails: [] }

    socket.emit("agregar", productoNuevo)
})

// const eliminarItem = async (id) => {
//     await manager.deleteProduct(id);
// };


const socket = io();


socket.emit("mensaje", "hola Backend soy el front");
socket.on("array", (data) => {
    console.log("dataaaa",data);
    contenedorProductos.innerHTML = "";
    data.docs.forEach(element => {
        const card = document.createElement('div');
        card.classList.add("card");
        card.classList.add("m-3");
        card.style = "width: 18rem";
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.description}</p>
                <p class="card-text">$${element.price}</p>
                <p class="card-text">Stock: ${element.stock}</p>

 
                             
            </div>`
        const botonEliminar = document.createElement('button');
        botonEliminar.id = `${element._id}`;
        botonEliminar.classList.add("btn");
        botonEliminar.classList.add("btn-danger");
        botonEliminar.classList.add("m-3");
        botonEliminar.textContent = "Eliminar";


        botonEliminar.addEventListener('click', () => {
            socket.emit("eliminar", element._id);
            console.log(`se apreto el boton${element._id}`)
        })
        card.append(botonEliminar);
        contenedorProductos.append(card);
    });




})