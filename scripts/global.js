import { getCartItems } from "./cartStorage.js";

const navbarMenu = document.querySelector(".navbar__menu")

function insertCart() {
    if(!navbarMenu) return;
    
    const cart = getCartItems()

    if(cart.length > 0 && !navbarMenu.querySelector("navbar__item--cart")) {
        const li = document.createElement("li")
        li.classList.add("navbar__item", "navbar__item--cart")
        li.innerHTML =  `<a class="navbar__link" href="./cart.html"><i class="fa-solid fa-cart-arrow-down"></i></a>`
        

        navbarMenu.appendChild(li)
    }
  

    console.log(cart)
}

insertCart()