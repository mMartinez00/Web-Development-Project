const cartKey = "cart"

// Get cart from localStorage or empty array if nothing
function getCart() {
    const cartJSON = localStorage.getItem(cartKey)

    return cartJSON ? JSON.parse(cartJSON) : [];
}

// Save cart array back to localStorage
function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart))
}

// Export cart to different pages
export function getCartItems() {
    return getCart();
}

export function addToCart(productID, selectedSize) {
    const size = selectedSize === null ? "One Size" : selectedSize

    const cart = getCart();

    const existingItem = cart.find(
        (item) => item.id === productID && item.size === size
    );

    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productID,
            size: size,
            quantity: 1
        })
    }

    saveCart(cart)

    console.log(localStorage)

    
}