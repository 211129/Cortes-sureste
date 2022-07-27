const compra = new Carrito();
const shopList = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const process = document.getElementById('procesar-compra');

const client = document.getElementById('cliente');
const mail = document.getElementById('correo')

loadEvents()

function loadEvents() {
    document.addEventListener('DOMContentLoaded', compra.loadCheckout());
    carrito.addEventListener('click', (e) => { compra.deleteProduct(e) });
    process.addEventListener('click', processPayment);
    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });
    compra.payment();
}

function getItems(){
    
};

function processPayment(e) {
    e.preventDefault();
    if (compra.getLocalStorageItems().length === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos en el carrito!',
            timer: 2000,
            showConfirmButton: false
        }).then((e) => {
            window.location = "index.html";
        });
    } else if (client.value === '' || mail.value === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese su Nombre y Email Correctamente',
            timer: 2000,
            showConfirmButton: false
        });
    } else {
        const GIF = document.querySelector('#cargando');
        GIF.style.display = 'block';
        const confirmation = document.createElement('img');
        confirmation.src = "img/mail.gif";
        confirmation.style.display = "block";
        confirmation.width = 150;
        setTimeout(() => {
            GIF.style.display = 'none';
            document.querySelector('#loaders').appendChild(confirmation);
            setTimeout(() => {
                confirmation.remove();
                compra.clearLocalStorage();
                Swal.fire({
                    type: 'success',
                    title: '¡Genial!',
                    text: 'Su compra ha sido realizada!',
                    timer: 2000,
                    showConfirmButton: false
                })
                window.location = "index.html";
            }, 2000);
        }, 3000);
        
    }
}