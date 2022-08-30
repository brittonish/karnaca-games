let carts = document.querySelectorAll('.add-cart'); //cart counter

let products = [
    {
        name: 'Cyberpunk 2077',
        tag: 'cyberpunk',
        price: 25,
        inCart: 0
    },
    {
        name: 'Bioshock: Inifinite',
        tag: 'bioshock-infinite',
        price: 12,
        inCart: 0
    },
    {
        name:'Bioshock',
        tag: 'bioshock',
        price: 17,
        inCart: 0
    },
    {
        name:'Bioshock 2',
        tag: 'bioshock2',
        price: 21,
        inCart:0
    },
    {
        name:'Dishonored: Death of the Outsider',
        tag: 'dishonored-death-of-the-outsider',
        price: 30,
        inCart: 0
    },
    {
        name:'Dishonored',
        tag: 'dishonored1',
        price: 23,
        inCart: 0
    },
    {
        name:'Dishonored 2',
        tag: 'dishonored2',
        price: 27,
        inCart: 0
    },
    {
        name:'Fallout: New Vegas',
        tag: 'fallout-vegas',
        price: 14,
        inCart: 0
    },
    {
        name:'Fallout 3',
        tag: 'fallout3',
        price: 11,
        inCart: 0
    },
    {
        name:'Fallout 4',
        tag: 'fallout4',
        price: 18,
        inCart: 0
    },
    {
        name:'Hellblade',
        tag: 'hellblade',
        price: 20,
        inCart: 0
    },
    {
        name:'Prey',
        tag: 'prey',
        price: 33,
        inCart: 0
    },
    {
        name:'Red Dead Redemption',
        tag: 'red-dead-redemption1',
        price: 10,
        inCart: 0
    },
    {
        name:'Red Dead Redemption 2',
        tag: 'red-dead-redemption2',
        price: 41,
        inCart: 0
    },
    {
        name:'Tomb Raider',
        tag: 'tomb-raider',
        price: 36,
        inCart: 0
    },
    {
        name:'The Witcher 3',
        tag: 'witcher3',
        price: 34,
        inCart: 0
    }
];

for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', ()=> {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers'); //get number as string

    productNumbers = parseInt(productNumbers);  //convert number into int

    if(productNumbers){ //if doesnt exist
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {    //if does
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems)

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is ", cartCost);
    console.log(typeof cartCost);
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
    
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <i class='bx bxs-x-circle' ></i>
                <img src="./images/games-posters${item.tag}.webp">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
                <i class='bx bxs-left-arrow-circle'></i>
                <span>${item.inCart}</span>
                <i class='bx bxs-right-arrow-circle'></i>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            `;
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Basket Total
            </h4>
            <h4 class="basketTotal">
                $${cartCost},00
            </h4>
        `;
    }
}

onLoadCartNumbers();
displayCart()



const toggleButton = document.getElementsByClassName('toggle-button')[0]    //adaptive interface
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

const search = document.querySelector('.search-box input'), //search engine
    images = document.querySelectorAll('.image-box');
search.addEventListener("keyup", e =>{
    if(e.key == "Enter"){
        let searchValue = search.value,
        value = searchValue.toLowerCase();
        images.forEach(image => {
            if (value === image.dataset.name){
                return image.style.display = "block";
            }
            image.style.display = "none"
        })
    }
    
});

search.addEventListener("keyup", ()=>{  //clear searchbar
    if (search.value != "") return;

    images.forEach(image =>{
        image.style.display = "block";
    }) 
})