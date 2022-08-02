//Traigo el carrito.
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

console.log(carrito);
//Creo variable para que se unifique la cantidad si agregó con mas de un click.
const unificadoObjeto = {};

//Unifico cantidades en un objeto{nombre.plato,producto}
for (prodComprado of carrito) {
  //creo constantes para facilitar el codigo
  const nombre = prodComprado.producto.nombre;
  const cant = prodComprado.cantidad;
  //Recorre todos los objetos del carrito y los agrega a el objeto(unificadoObjeto), si el nombre del plato no esta, crea el objeto(nombrePlato,Producto)
  if (!unificadoObjeto[nombre]) {
    unificadoObjeto[nombre] = prodComprado.producto;
  }
  //Si el plato ya estaba, le cambia la cantidad a la cantidad que habia mas la de ahora, y si no estaba se le asigana la cantidad
  unificadoObjeto[nombre].cantidad += cant;
  //Esto es igual a: unificadoObjeto[nombre].cantidad = unificadoObjeto[nombre].cantidad + cantidad;
}
console.log(unificadoObjeto);

//Cracion de un array con los values(objetos de cada plato agregado al carrito)
const unificadoProd = Object.values(unificadoObjeto);
/* console.log(unificadoProd[0]); */

/*
//otros object que podria sacar de un objeto:
const uniKeys = Object.keys(unificadoObjeto);
const entries = Object.entries(unificadoObjeto); // tira arrays con arrays donde 1er valor la key y seg el value
console.log(uniKeys);
console.log(entries); */

//Creacion de HTML del carrito

//Traigo los contenedores padre que voy a usar
let prodAddItem = document.getElementById("prodDetalle");
let prodAgregados = document.getElementById("productosAgregados");
let precioFinal = 0;
let filtrados;

function createPlatoCarrito(producto) {
  //Creo el div del producto
  const prodCarrito = document.createElement("div");
  //Imagen que va al div del producto.
  const image = document.createElement("img");
  image.src = producto.img;
  image.className = "imgCarrito";
  prodCarrito.append(image);
  //Nombre que va al div del producto.
  const nombre = document.createElement("p");
  nombre.innerText = producto.nombre;
  nombre.className = "nombreCarrito";
  prodCarrito.append(nombre);
  //Precio que va al div del producto.
  const precio = document.createElement("p");
  precio.innerText = `$ ${producto.precio.toFixed(2)}`;
  precio.className = "precioCarrito";
  prodCarrito.append(precio);
  //Cantidad que va al div del producto.
  const cantidad = document.createElement("p");
  cantidad.innerText = producto.cantidad;
  cantidad.className = "cantidadCarrito";
  prodCarrito.append(cantidad);
  //Precio total que va al div del producto
  const precioTotal = document.createElement("p");
  precioTotal.innerText = `$ ${(producto.precio * producto.cantidad).toFixed(
    2
  )}`;
  precioTotal.className = "totalCarrito";
  prodCarrito.append(precioTotal);
  //Boton de eliminar
  const eliminarProd = document.createElement("button");
  eliminarProd.innerText = "X";
  eliminarProd.className = "eliminarProd";
  prodCarrito.append(eliminarProd);

  //Agrego al precioFinal el precioTotal por cada prducto.
  precioFinal +=  producto.precio * producto.cantidad;

  eliminarProd.addEventListener("click", (e) => {
    prodCarrito.remove();
    const nuevoCarrito = JSON.parse(localStorage.getItem("carrito"));
    filtrados = nuevoCarrito.filter(
      (item) => item.producto.nombre != producto.nombre
    );
    localStorage.setItem("carrito", JSON.stringify(filtrados));
    precioFinal -= producto.precio * producto.cantidad;
    totalAPagar.innerHTML = `<p>Total A Pagar $ ${precioFinal.toFixed(2)}</p>`;
    prodAgregados.append(totalAPagar);
  });

  return prodCarrito;
}

console.log(unificadoProd);

for (productos of unificadoProd) {
  //Creo el div con la funcion
  const item = createPlatoCarrito(productos);
  //Agrego el div del producto que se creo al div del carrito que incluye todos los productos y le asigno clase.
  prodAddItem.append(item);
  item.className = "productoCarrito";
}

console.log(precioFinal);

const totalAPagar = document.createElement("div");
totalAPagar.innerHTML = `<p>Total a Pagar $ ${precioFinal.toFixed(2)}</p>`;
totalAPagar.id = "totalAPagar";
prodAgregados.append(totalAPagar);

let vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("submit", limpiarCarrito);
function limpiarCarrito(e) {
  e.preventDefault();
  prodAddItem.remove();
  localStorage.clear();
  precioFinal = 0;
  totalAPagar.innerHTML = `<p>Total A Pagar $ ${precioFinal.toFixed(2)}</p>`;
  prodAgregados.append(totalAPagar);
}
