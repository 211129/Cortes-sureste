class Carrito {

    //AddProduct
    addProduct(e) {
        e.preventDefault();
        if (e.target.classList.contains("agregar-carrito")) {
            const product = e.target.parentElement.parentElement;
            this.readProduct(product);
        }
    }

    //ReadProduct
    readProduct(product) {

        //Definir clase
        const productInfo = {
            image: product.querySelector('img').src,
            tittle: product.querySelector('h4').textContent,
            price: product.querySelector('.precio span').textContent,
            id: product.querySelector('a').getAttribute('data-id'),
            pieces: 1
        }
        let productsLS = this.getLocalStorageItems();
        productsLS.forEach((productLS) => {
            if (productLS.id === productInfo.id) {
                productsLS = productLS.id;
            }
        });
        if (productsLS === productInfo.id) {
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'El producto ya esta en el carrito!',
                timer: 1000,
                showConfirmButton: false
            })
        } else {
            this.setProduct(productInfo);
        }
    }

    setProduct(product) {
        const item = document.createElement('tr');
        item.innerHTML = `
            <td>
                <img src="${product.image}" width=100>
            </td>
            <td>${product.tittle}</td>
            <td>${product.price}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${product.id}"></a>
            </td>
        `;
        productList.appendChild(item);
        this.setProductsToLocalStorage(product);
    }

    //Eliminar Producto
    deleteProduct(e) {
        e.preventDefault();
        let product, productiD;
        if (e.target.classList.contains('borrar-producto')) {
            e.target.parentElement.parentElement.remove();
            product = e.target.parentElement.parentElement;
            productiD = product.querySelector('a').getAttribute('data-id');
        }
        this.deleteProductfromLocalStore(productiD);
        this.payment();
    }

    clearCar(e) {
        e.preventDefault()
        while (productList.firstChild) {
            productList.removeChild(productList.firstChild);
        }
        this.clearLocalStorage();
        return false;
    }

    setProductsToLocalStorage(product) {
        let products;
        products = this.getLocalStorageItems();
        products.push(product);
        localStorage.setItem('productos', JSON.stringify(products));
    }

    getLocalStorageItems() {
        let productLS;
        if (localStorage.getItem('productos') === null) {
            productLS = [];
        } else {
            productLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productLS;
    }

    deleteProductfromLocalStore(productiD) {
        let productsLS;
        productsLS = this.getLocalStorageItems();
        productsLS.forEach((productLS, index) => {
            if (productLS.id === productiD) {
                productsLS.splice(index, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productsLS));
    }

    //Cargar Productos en LS al Carrito
    loadLSproducts() {
        let productsLS;
        productsLS = this.getLocalStorageItems();
        productsLS.forEach((product) => {
            const item = document.createElement('tr');
            item.innerHTML = `
            <td>
                <img src="${product.image}" width=100>
            </td>
            <td>${product.tittle}</td>
            <td>${product.price}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${product.id}"></a>
            </td>
            `;
            productList.appendChild(item);
        });
    }

    //Cargar Carrito/LS al Checkout
    loadCheckout() {
        let productsLS;
        productsLS = this.getLocalStorageItems();
        productsLS.forEach((product) => {
            const item = document.createElement('tr');
            item.innerHTML = `
            <td>
                <img src="${product.image}" width=100>
            </td>
            <td>${product.tittle}</td>
            <td>${product.price}</td>
            <td>
                <input type="number" class="form-control cantidad" min="1" value="${product.pieces}">
            </td>
            <td>${product.price*product.pieces}</td>     
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${product.id}"></a>
            </td> 
            `;
            shopList.appendChild(item);
        });
    }

    //Vaciar LS
    clearLocalStorage() {
        localStorage.removeItem("productos");
    }

    //Procesar Pedido
    checkout(e) {
        e.preventDefault();
        if (this.getLocalStorageItems().length === 0) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'El carrito esta vacio, agregue algun producto!',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            location.href = "compra.html";
        }
    }

    //Calcular total e IVA de la compra
    payment() {
        let productLS = this.getLocalStorageItems();
        let total = 0;
        let subtotal = 0;
        let IVA = 0;

        for (let i = 0; i < productLS.length; i++) {
            let item = Number(productLS[i].price * productLS[i].pieces);
            total = total + item;
        }

        IVA = parseFloat(total * 0.17).toFixed(2);
        subtotal = parseFloat(total - IVA).toFixed(2);

        document.getElementById('subtotal').innerHTML = "$ " + subtotal;
        document.getElementById('igv').innerHTML = "$ " + IVA;
        document.getElementById('total').innerHTML = "$ " + total.toFixed(2);
    }

    obtenerEvento(e) {
        e.preventDefault();
        let id, pieces, product, productsLS;
        if (e.target.classList.contains('cantidad')) {
            product = e.target.parentElement.parentElement;
            id = product.querySelector('a').getAttribute('data-id');
            pieces = product.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotal');
            productsLS = this.getLocalStorageItems();
            productsLS.forEach(function(productLS, index) {
                if (productLS.id === id) {
                    productLS.pieces = pieces;
                    actualizarMontos[index].innerHTML = Number(pieces * productsLS[index].price);
                }
            });
            localStorage.setItem('productos', JSON.stringify(productsLS));

        } else {
            console.log("click afuera");
        }
    }


}