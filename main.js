//let carts = document.querySelectorAll(".add-cart");
let products = [
    {
        name: "Samsung Series 4",
        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
        price: {
            actual: 13999,
            display: 22500
        },
        discount: 37,
        incart:0
    },
    {
        name: "Samsung Super 6",
        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
        price: {
            actual: 35999,
            display: 66900
        },
        discount: 46,
        incart:0
    },
    {
        name: "Samsung The Frame",
        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
        price: {
            actual: 84999,
            display: 133900
        },
        discount: 36,
        incart:0
    },
    {
        name: "Thomson B9 Pro",
        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
        price: {
            actual: 9999,
            display: 16999
        },
        discount: 41,
        incart:0
    },
    {
        name: "LG Ultra HD",
        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
        price: {
            actual: 39990,
            display: 79990
        },
        discount: 50,
        incart:0
    },
    {
        name: "Vu Ready LED TV",
        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
        price: {
            actual: 7999,
            display: 17e3
        },
        discount: 52,
        incart:0
    },
    {
        name: "Koryo Android TV",
        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
        price: {
            actual: 55999,
            display: 199990
        },
        discount: 71,
        incart:0
    },
    {
        name: "Micromax LED Smart",
        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
        price: {
            actual: 9999,
            display: 27990
        },
        discount: 64,
        incart:0
    }
]

function htmlcard(item){
    return `
    <div class="card">
        <div class="tag">${item.discount}%</div>
        <div class="card_img">
            <img src="${item.image}" alt="img" />
        </div>
        <div class="card_footer">
            <div class="card_itemcost">
                <p>${item.name}</p><br/>
                <p><span><del>$${item.price.display}</del></span><span>$${item.price.actual}</span></p>
            </div>
            <div class="card_button">
                <a class="add-cart cart2" href="#">Add to Cart</a>
            </div>
        </div>
    </div>
    `
}

document.getElementById("app").innerHTML = `
${products.map(htmlcard).join('')}`

let carts = document.querySelectorAll('.add-cart');

for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartsNumber(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumber(){
    let productNumber = localStorage.getItem('cartsNumber');

    if(productNumber){
        document.querySelector('.itembutton span').textContent = productNumber;
    }
}

function cartsNumber(product){
    //console.log("the product clicked is",product)
    let productNumber = localStorage.getItem('cartsNumber');
    productNumber = parseInt(productNumber);
    if(productNumber){
        localStorage.setItem('cartsNumber', productNumber + 1);
        document.querySelector('.itembutton span').textContent = productNumber + 1;
    }else{
        localStorage.setItem('cartsNumber', 1);
        document.querySelector('.itembutton span').textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsincart');
    cartItems = JSON.parse(cartItems);
    //console.log("the product clicked is",cartItems)


    if(cartItems != null){

        if(cartItems[product.name] == undefined){
            cartItems = {
                ...cartItems,
                [product.name] : product
            }
        }
        cartItems[product.name].incart += 1;
    }else{
        product.incart = 1;
        cartItems = {
            [product.name] : product
        }
    }

    localStorage.setItem("productsincart", JSON.stringify(cartItems))
    
}

function totalCost(product){
    //console.log("ths cost of", product.price.actual);
    let cartCost = localStorage.getItem("totalCost");

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price.actual);
    }else{
        localStorage.setItem("totalCost", product.price.actual)
    }
    displayCart();
}


function displayCart(){
    
    let cartItems = localStorage.getItem("productsincart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".totalcart");
    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost)
    let totalcal = document.querySelector(".totalcostcard");
    console.log(cartCost);
    if( cartItems && productContainer && totalcal){
        productContainer.innerHTML = "";
        totalcal.innerHTML = "";
        Object.values(cartItems).map( item => {
            productContainer.innerHTML += `
            <div>
                <div class="cartItemQty">
                    <div class="cartCount">
                        <img src="${item.image}" alt="img" />
                        <span>${item.name}</span>
                        <span>*</span>
                    </div>
                    <div class="cartCountincrement">
                        <div class="container">
                        <input type="button" onclick="decrementValue()" value="-" />
                        <input type="text" name="quantity" value="${item.incart}" maxlength="2" max="10" size="1" id="number" />
                        <input type="button" onclick="incrementValue()" value="+" />
                        </div>
                    </div>
                    <div class="cartCountCost">
                        <p>$${item.price.actual * item.incart}</p>
                    </div>
                </div>
            </div>
            `;
        })
        totalcal.innerHTML += `
        <ul>
            <li>Total</li>
            <li> <span>Items4()</span><span>:</span> <span>$1709</span></li>
            <li> <span>Discout</span><span>:</span> <span>$1709</span></li>
            <li> <span>Type Discout</span><span>:</span> <span>$1709</span></li>
            <li> <span>Order Total</span><span>:</span> <span>$${cartCost}</span></li>
        </ul>
        `
    }
}
function incrementValue()
{
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    if(value<10){
        value++;
            document.getElementById('number').value = value;
    }
}
function decrementValue()
{
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    if(value>1){
        value--;
            document.getElementById('number').value = value;
    }

}
onLoadCartNumber();

