const car = new Carrito();
const carrito = document.getElementById('carrito');
const product = document.getElementById('lista-productos');
const productList = document.querySelector('#lista-carrito tbody');
const clearcar = document.getElementById('vaciar-carrito');
const checkout = document.getElementById('procesar-pedido');

loadEvents();

function loadEvents() {
    product.addEventListener('click', (e)=>{car.addProduct(e)});
    carrito.addEventListener('click', (e)=>{car.deleteProduct(e)});
    clearcar.addEventListener('click', (e)=>{car.clearCar(e)});
    checkout.addEventListener('click', (e)=>{car.checkout(e)})
    document.addEventListener('DOMContentLoaded', car.loadLSproducts());
}

