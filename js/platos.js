//funcion constructora de productos
class Producto {
  constructor(nombre, precio, img, tipo) {
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.tipo = tipo;
    this.cantidad = 0;
  }

  vender(cantidad) {
    precioTotal = suma(precioTotal, cantidad * this.precio);
    this.cantidad = this.cantidad + cantidad;
  }
}

//Productos
const productos = [
  new Producto("Lasagna de acelga", 10, "../img/vegie1.jpeg", "vegie"),
  new Producto("Guiso de lentejas", 20, "../img/vegie2.jpeg", "vegie"),
  new Producto("Malfatti de espinaca", 30, "../img/vegie3.jpeg", "vegie"),
  new Producto(
    "Fideos de zucchini y zanahoria",
    40,
    "../img/vegie4.jpeg",
    "vegie"
  ),
  new Producto("Fideos de repollo", 50, "../img/vegie5.jpeg", "vegie"),
  new Producto("Pan de carne relleno", 60, "../img/carne1.jpeg", "carne"),
  new Producto(
    "Rollito de cerdo c/pure de coliflor",
    70,
    "../img/carne2.jpeg",
    "carne"
  ),
  new Producto("Pechuga rellena", 80, "../img/carne3.jpeg", "carne"),
  new Producto("Tacos de pollo", 90, "../img/carne4.jpeg", "carne"),
  new Producto(
    "Empanadas de carne c/ masa de calabaza",
    100,
    "../img/carne5.jpeg",
    "carne"
  ),
];

/* console.log(productos[]); */

//Creación del carrito y la funcion que agrega al carrito.
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const guardarCarrito = (producto, cant) => {
  carrito.push({ producto: producto, cantidad: cant });
};

//Function que crea el div de cada producto
function createPlato(producto) {
  //Creación del div del producto
  const plato = document.createElement("div");

  //Imagen del producto, que se agrega al div plato.
  const image = document.createElement("img");
  image.src = producto.img;
  image.className = "plato";
  plato.append(image);

  //Nombre del producto, que se agrega al div plato.
  const paragraph = document.createElement("p");
  paragraph.innerText = producto.nombre;
  plato.append(paragraph);

  //Boton de comprar, que se agrega al div plato.
  const button = document.createElement("button");
  button.className = "btn";/* 
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", "#modalComprar"); */
  button.innerText = "Comprar";
  plato.append(button);

  //Input de cantidad, que se agrega al div plato.
  const input = document.createElement("input");
  input.type = "number";
  input.className = "campoCantidad";
  input.value = "1";
  plato.append(input);

  //Event Listener de que cuando compras se guarde en el localStorage carrito el producto y la cantidad indicada en el input.
  button.addEventListener("click", (e) => {
    guardarCarrito(producto, parseInt(input.value));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire({
      position: 'middle',
      icon: 'success',
      title: 'Producto agregado al carrito!',
      showConfirmButton: false,
      timer: 1000
    })
  });
  
  //La function me devuelve el div del plato creado
  return plato;
}

//Creación de las secciones segun "tipo" y los productos en el html.
let contenedorVegie = document.getElementById("platos-vegie");
let contenedorCarne = document.getElementById("platos-carne");

for (const prod of productos) {
  const prods = createPlato(prod);

  if (prod.tipo === "vegie") {
    contenedorVegie.append(prods);
  } else {
    contenedorCarne.append(prods);
  }
  prods.className = "platos";
}


