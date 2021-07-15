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
            refreshCartView()
        },
        error: function(jqXHR, data, status){}
    }
)
console.log(products)



//FUNCIONES LOCAL STORAGE 
function saveToLocalStorage(key,value) {
    let stringifiedItem = JSON.stringify(value);
    localStorage.setItem(key,stringifiedItem);
}

function getFromLocal(key) {
    return JSON.parse(localStorage.getItem(key));
}


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




//AGREGAR AL CARRITO 
function addToCart(e) {
    const productId = (e.target.closest("button").value) 
    
    let cart = getFromLocal('cart')
    if (!cart) {
        cart = {}
    }
    if (productId in cart) {
        cart[productId] = cart[productId] + 1
    } else {
        cart[productId] = 1
    }

    saveToLocalStorage("cart", cart)

    refreshCartView()
}

//DISMINUIR CANTIDAD Y BORRAR DEL CARRITO
const deleteFromCart = productId => {
    console.log("El id del producto a borrar: ",productId);

    let cart = getFromLocal('cart')

    if (productId in cart) {
        cart[productId] = cart[productId] - 1
    } else {
        console.error('Producto no esta en el carrito')
    }

    if (cart[productId] === 0) {
        delete cart[productId]
    }

    saveToLocalStorage("cart", cart)

    refreshCartView()
}

//AGREGAR CANTIDAD
function oneMore (productId) {
    let cart = getFromLocal('cart')
    cart[productId] = cart[productId] + 1
    saveToLocalStorage("cart", cart)

    refreshCartView()
}

//VACIAR CARRITO

function clearCart () {
    let cart = {}
    saveToLocalStorage("cart", cart)

    refreshCartView()
}


//TOTAL CARRITO
function getCartTotal(purchasedProducts, cart) {
    let total = 0
    purchasedProducts.forEach(product => total += product.price * cart[product.id]) 
        
    return total;
}


//EVENT HANDLER BOTON DE AGREGAR AL CARRITO
function eventAddToCartButton() {
    $(".addToCartButton").each(function() {
        $(this).click(addToCart)
    })
}


//ARMAR CARRITO 
function refreshCartView() {
    let cart = getFromLocal('cart')
    if (cart === null) {
        cart = {}
    }
    let idsInCart = Object.keys(cart)

    if (idsInCart.length === 0) {
        $(".cart-products").empty(); 
        $(".cart-products").append(`
            <div class="cart-product empty">
                <p>Tu carrito está vacío.</p>
            </div>
        `)
        return;
    }
    $(".cart-products").empty();
    
    const uniqueProductsInCart = idsInCart.map(productId => products.find(product => product.id === Number(productId)))
    // [{id:11, nombre...},{id:13, nombre...}]
    const total = getCartTotal(uniqueProductsInCart, cart)

    console.log({
        cart,
        idsInCart,
        uniqueProductsInCart,
        products
    })
    uniqueProductsInCart.forEach(productInCart => $(".cart-products").append(`
        <div class="cart-product">    
            <img class="cart-image" src="${productInCart.image}" alt="${productInCart.category} - ${productInCart.title}">
            <div class="cart-product-info"> 
                <span class="product-quantity">${cart[productInCart.id]}</span>
                <p class="product-name">${productInCart.title}</p>
                <p class="product-category">(${productInCart.category})</p>
                <p class="product-price">$${productInCart.price}</p>
                <p>
                    <button class="change-quantity" onclick="oneMore(${productInCart.id})">+</button>
                    <button type="button" class="remove-item" onclick="deleteFromCart(${productInCart.id})">
                        <img src="images/trash.png">
                    </button>
                </p>
            </div>
        </div>
    `))
    $(".cart-products").append(`
    <button class="clear-cart" onclick="clearCart()">Borrar carrito</button>
    <p> Total de compra: ${total} </p>
    `)
}





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



//Falta armar Finalizar compra


