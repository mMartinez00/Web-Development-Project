import { getCartItems, deleteFromCart } from "./cartStorage.js";

function displayCart() {
    const cart = getCartItems()
    console.log(cart)
}

// deleteFromCart()

displayCart()