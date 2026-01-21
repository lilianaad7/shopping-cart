const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarcarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');

//Inicializamos el carrito vacío
let productosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    // Cuando agregas  un curso presionando "Agregar al carrito"
    listaProductos.addEventListener('click', agregarProducto);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarProducto);

     // Vaciar carrito
    vaciarcarritoBtn.addEventListener('click', () => {
        productosCarrito = []; //reseteamos el arreglo
        limpiarHTML(); //Eliminamos todo el HTML
    })
}

//Funciones
function agregarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        // console.log(e.target.parentElement.parentElement)
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }

}

//Elimina un curso del carrito
function eliminarProducto(d) {
    if (d.target.classList.contains('borrar-producto')) {
        const productoId = d.target.getAttribute('data-id');
        // Elimina del arreglo de productosCarrito por el data-id
        productosCarrito = productosCarrito.filter(producto => producto.id !== productoId);
        carritoHTML();// Iterar sobre el carrito y mostrar su HTML|
    }
}

//Lee el contenido del html al que le dimos click y extrae la información del producto
function leerDatosProducto(producto) {
    console.log(producto);

    //Crear un objeto  con el contenido del producto actual
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('p').textContent,
        precio: producto.querySelector('span').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = productosCarrito.some(producto => producto.id === infoProducto.id);
    if (existe) {
        //Actualizamos la cantidad
        const productos = productosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto; // retorna el objeto actualizado
            } else {
                return producto; // retorna los objetos que no son los duplicados
            }
        });
        productosCarrito = [...productos];
    } else {
        //Agrega elementos al arreglo carrito
       productosCarrito = [...productosCarrito, infoProducto];
    }
    console.log(productosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en html
function carritoHTML() {
    //limpiar el carrito
    limpiarHTML();
    productosCarrito.forEach(producto => {
        const row = document.createElement('tr');
        const{imagen, titulo, precio, cantidad, id}=producto;
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
             <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
           <td><a href="#" class="btn btn-outline-warning borrar-producto" data-id="${id}"><i class="fa fa-trash"></i></a></td>
            `;
            
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

//Elimina los productos del tbody
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}