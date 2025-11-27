export function addToCart(productID, selectedSize) {
    const size = selectedSize === null ? "One Size" : selectedSize

    let item = {
        id: productID,
        size,
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || []

    cart.push(item)


    localStorage.setItem("cart", JSON.stringify(cart))

    console.log(localStorage)

    
}