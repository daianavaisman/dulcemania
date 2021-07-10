// INVENTARIO DE PRODUCTOS - INICIO

// const products = [
//     { id: 10, title:"Degustación Manía",        price: 550, image: "images/ch1.jpg", altText: "Choco 1", description: "Almendras, cajú, avellanas, sal de montaña y pimienta rosa"},
//     { id: 11, title:"Manía de la Montaña",      price: 500, image: "images/ch1.jpg", altText: "Choco 2", description: "Chocolate amargo con 80% cacao y sal del Himalaya gruesa"},
//     { id: 12, title:"Manía de Almendras",       price: 500, image: "images/ch1.jpg", altText: "Choco 3", description: "Chocolate amargo con 80% cacao con almendras tostadas"},
//     { id: 13, title:"Manía Pura",               price: 550, image: "images/ch1.jpg", altText: "Choco 4", description: "Increible tableta de chocolate amargo puro con 80% de cacao"},
//     { id: 21, title:"Oreo Manía",               price: 500, image: "images/ch2.jpg", altText: "Choco 1", description: "Con galletitas oreo"},
//     { id: 22, title:"Manía Dulce Tentación",    price: 500, image: "images/ch2.jpg", altText: "Choco 2", description: "Relleno de dulce de leche"},
//     { id: 23, title:"Manía de Almendras",       price: 500, image: "images/ch2.jpg", altText: "Choco 3", description: "Almendras tostadas"},
//     { id: 24, title:"Marroc Manía",             price: 500, image: "images/ch2.jpg", altText: "Choco 4", description: "Corazón de marroc"},
//     { id: 25, title:"Manía Pura",               price: 500, image: "images/ch2.jpg", altText: "Choco 5", description: "Chocolate con leche"},
//     { id: 31, title:"Manía de Almendras",       price: 500, image: "images/ch3.jpg", altText: "Choco 1", description: "Almendras tostadas"},
//     { id: 32, title:"Oreo Manía",               price: 500, image: "images/ch3.jpg", altText: "Choco 2", description: "Con galletitas oreo"},
//     { id: 33, title:"Manía Dulce Tentación",    price: 500, image: "images/ch3.jpg", altText: "Choco 3", description: "Relleno de dulce de leche"},
//     { id: 34, title:"Chocolina Manía",          price: 500, image: "images/ch3.jpg", altText: "Choco 4", description: "Con galletitas chocolinas"},
//     { id: 35, title:"Manía Pura",               price: 500, image: "images/ch3.jpg", altText: "Choco 5", description: "Chocolate blanco"}
// ]
let products = []
$.ajax(
    {
        url: "productos.json",
        method: "GET",
        dataType: "json",
        success: function(data, status, jqXHR){
            renderProducts(data)
            products = data
        },
        error: function(jqXHR, data, status){}
    }
)

// INVENTARIO DE PRODUCTOS - FIN



// TRAIGO INVENTARIO AL HTML

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
}  


// FUNCIONES Y EVENTOS PARA AGREGAR AL CARRITO - INICIO
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


$(".addToCartButton").each(function() {
    $(this).click(addToCart)
})


//Lo mismo que arriba, pero en JS
// const cartButton = document.querySelectorAll(".addToCartButton");
// cartButton.forEach(button => button.addEventListener("click", addToCart)) //la función está definida arriba

// FUNCIONES Y EVENTOS PARA AGREGAR AL CARRITO - FIN


//ARMAR CARRITO
function refreshCartView() {
    let productsInCart = JSON.parse(localStorage.getItem('cart'));
    if (!productsInCart) {
        $(".cart-products").append(`
            <div class="cart-product empty">
                <p>Carrito vacio.</p>
            </div>
        `)
    }
    else {
        productsInCart.forEach(productInCart => $(".cart-products").append(`
            <div>    
                <p>${productInCart.title}</p>
                <p>$${productInCart.price}</p>
                <button type="button" class="remove-item"><img src="images/trash.png"></button>
            </div>
        `))
    }
}

// MOSTRAR / OCULTAR CARRITO
function openCloseCart() {
    const containerCart = document.querySelectorAll(".cart-products")[0];

  containerCart.classList.forEach(item => {
    if (item === "hidden") {
      containerCart.classList.remove("hidden");
      containerCart.classList.add("active");
    }

    if (item === "active") {
      containerCart.classList.remove("active");
      containerCart.classList.add("hidden");
    }
  });
}

  refreshCartView()