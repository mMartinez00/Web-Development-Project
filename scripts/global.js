import { getCartItems } from "./cartStorage.js";

const navbarMenu = document.querySelector(".navbar__menu")

function insertCart() {
    if(!navbarMenu) return;
    
    const cart = getCartItems()

    if(cart.length > 0 && !navbarMenu.querySelector(".navbar__item--cart")) {
        const li = document.createElement("li")
        li.classList.add("navbar__item", "navbar__item--cart")
        li.innerHTML = `
        <a class="navbar__link navbar__link--cart" href="./cart.html">
            <i class="fa-solid fa-cart-arrow-down"></i>
            <span class="navbar__cart-badge"></span>
        </a>`;
        navbarMenu.appendChild(li)
    }

    // Always try to update bade (even if cart is empty)
    updateCartBadge()

}

export function updateCartBadge() {
    const cart = getCartItems()
    const cartLink = navbarMenu?.querySelector(".navbar__link--cart");

    if(!cartLink) return;

    const badge = cartLink.querySelector(".navbar__cart-badge");
    if(!badge) return;

    const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

    if(totalQuantity > 0) {
        badge.textContent = totalQuantity;
        badge.style.display = "inline-block"
    } else {
        badge.textContent = "";
        badge.style.display = "none"
    }


}

insertCart()

window.addEventListener("cartUpdated", insertCart)