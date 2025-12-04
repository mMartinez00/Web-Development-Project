const cartKey = "cart"

// Get cart from localStorage or empty array if nothing
function getCart() {
    const cartJSON = localStorage.getItem(cartKey)

    return cartJSON ? JSON.parse(cartJSON) : [];
}

// Save cart array back to localStorage
export function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart))

    // notify the rest of the app that the cart has changed
    window.dispatchEvent(new CustomEvent("cartUpdated"));
}

// Export cart to different pages
export function getCartItems() {
    return getCart();
}

// Export add items to cart
export function addToCart(product, selectedSize) {
    const size = selectedSize === null ? "One Size" : selectedSize

    const cart = getCart();

    const existingItem = cart.find(
        (item) => item.id === product.id && item.selectedSize === size
    );

    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            selectedSize: size,
            quantity: 1
        })
    }


    saveCart(cart)

    // Notify other scripts that cart has been updated
    window.dispatchEvent(new CustomEvent("cartUpdated"));
}

// Export delete items from cart
export function removeFromCart(index) {
    let storedCart = getCart()
    storedCart.splice(index, 1)
    saveCart(storedCart)
}