// INVENTARIO DE PRODUCTOS - INICIO
let products = []
$.ajax(
    {
        url: "productos.json",
        method: "GET",
        dataType: "json",
        success: function(data, status, jqXHR){
            products = [...data]
            renderProducts(data)
        },
        error: function(jqXHR, data, status){}
    }
)
console.log(products)
// INVENTARIO DE PRODUCTOS - FIN



// TRAIGO INVENTARIO AL HTML - INICIO
function renderProducts(products) {
    products.forEach(product => $("#dynamicTienda").append(`
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="diamond-container">
                <div class="diamond">
                    <div class="diamond-wrapper">
                        <div class="diamond-content">$ ${product.price}</div>
                    </div>
                </div>
            </div>    
            <img src="${product.image}" alt="${product.altText}" class="shadow p-3 mb-1 bg-body rounded w100">
            <div>
                <div class="prod-title p-3">${product.title}</div>
                <div class="prod-description">    
                    <div>${product.description}</div>
                    <div class= "cart-section">
                        <button type="button" value="${product.id}" class="btn addToCartButton">
                            <img src="images/addToCart.png"></img>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `)    
    )
eventAddToCartButton()    
}  
// TRAIGO INVENTARIO AL HTML - FIN



//FUNCIONES LOCAL STORAGE - INICIO
function saveToLocalStorage(key,value) {
    let stringifiedItem = JSON.stringify(value);
    localStorage.setItem(key,stringifiedItem);
}

function getFromLocal(key) {
    return JSON.parse(localStorage.getItem(key));
}

// function updateLocalStorage(){}
//FUNCIONES LOCAL STORAGE - FIN



//AGREGAR AL CARRITO - INICIO
const cart = []

function addToCart(e) {
    const targetValue = (e.target.closest("button").value) 
    
    //.find() es un método de los arrays que te devuelve el elemento que coincida con la búsqueda. 
    //en este caso busco que me traiga el product.id que coincida con el value del botón
    const productToCart = products.find(product => product.id === parseInt(targetValue));
    console.log(productToCart);


    if(!productToCart) {
        console.log('hmm no consigo el producto');
        return;
    }
    cart.push(productToCart);
    console.log(cart)
    saveToLocalStorage("cart", cart)
    refreshCartView()
}

function eventAddToCartButton() {
    $(".addToCartButton").each(function() {
        $(this).click(addToCart)
    })
}
//AGREGAR AL CARRITO - FIN



//ARMAR CARRITO - INICIO
function refreshCartView() {
    let productsInCart = JSON.parse(localStorage.getItem('cart'));
    if (!productsInCart) {
        $(".cart-products").append(`
            <div class="cart-product empty">
                <p>Tu carrito está vacío.</p>
            </div>
        `)
    }
    else {
        $(".cart-products").empty();
        productsInCart.forEach(productInCart => $(".cart-products").append(`
            <div class="cart-product">    
                <img class="cart-image" src="${productInCart.image}" alt="${productInCart.category} - ${productInCart.title}">
                <div class="cart-product-info"> 
                    <span class="product-quantity">${productInCart.quantity}</span>
                    <p class="product-name">${productInCart.title}</p>
                    <p class="product-category">(${productInCart.category})</p>
                    <p class="product-price">$${productInCart.price}</p>
                    <p>
                        <button class="change-quantity">-</button>
                        <button class="change-quantity">+</button>
                        <button type="button" class="remove-item">
                            <img src="images/trash.png">
                        </button>
                    </p>
                </div>
            </div>
        `))
    }
}
//ARMAR CARRITO - FIN



// MOSTRAR / OCULTAR CARRITO - INICIO
function openCloseCart() {
    const containerCart = document.querySelectorAll(".cart-products")[0];

  containerCart.classList.forEach(item => {
    if (item === "hidden") {
      $(containerCart).fadeIn(600,function(){})  
      containerCart.classList.remove("hidden");
      containerCart.classList.add("active")
    return;
    }

    if (item === "active") {
      $(containerCart).fadeOut(600,function(){})
      containerCart.classList.remove("active");
      containerCart.classList.add("hidden");
      return;
    }
  });
}
// MOSTRAR / OCULTAR CARRITO - FIN



// FUNCIONES DE CARRITO - INICIO
refreshCartView() //Lo ejecuto para que me cargue el carrito al cargar la página

//Quitar un elemento del carrito
const removeCartItemButton = document.querySelectorAll(".remove-item");
console.log(removeCartItemButton)

for (let i = 0; i < removeCartItemButton.length; i++) {
    button = removeCartItemButton[i]
    button.addEventListener("click", function(e) {
        e.target.parentElement.parentElement.parentElement.parentElement.remove()
        // updateLocalStorage()
    })
}

//Cantidad: Aumentar

//Cantidad: Disminuir

//Vaciar el carrito

//Actualizar el total
function updateCartTotal() {
    const cartProduct = document.querySelectorAll(".cart-product");
    for (let i = 0; i > cartProduct.length; i++) {
        let product = cartProduct[i];
        let productPrice = document.querySelectorAll(".product-price")[0]
        let productQuantity = document.querySelectorAll(".product-quantity")
    }
}


//Finalizar compra


// FUNCIONES DE CARRITO - FIN
