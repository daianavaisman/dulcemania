function saveToLocalStorage(key,value) {
    let stringifiedItem = JSON.stringify(value);
    localStorage.setItem(key,stringifiedItem);
}

function getFromLocal(key) {
    return JSON.parse(localStorage.getItem(key));
}

// getSemitotal = function (cantidad) {
//     return this.precio * cantidad
// }
//     //Semitotal es el precio del producto por la cantidad. Será el precio de la compra de ese producto.
//     //El Total será la suma de los semitotales.

// getCompraProducto = function (cantidad) {
//     return {
//         item: this,
//         cantidad: cantidad,
//         monto: this.getSemitotal(cantidad)
//     }
// }
//    //CompraProducto me va a indicar qué producto se compró (mediante "item"), cuántos items (cantidad), y semitotal.
//     //Esta CompraProducto va a alimentar mi carrito.

//     agregarAlCarrito = function (cantidad) {
//         cartArray.push(this.getCompraProducto(cantidad))
//     }