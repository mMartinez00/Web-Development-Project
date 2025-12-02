import { getCartItems, removeFromCart } from "./cartStorage.js";
const cartContent = document.querySelector(".cart__content")

function displayCart() {
    const cart = getCartItems()

    cartContent.innerHTML = "";

    cart.forEach((item, index) => {

        const productItem = document.createElement("div")
        productItem.className = "cart__item";
        productItem.innerHTML = `
             <div class="cart__item-main">
                        <div class="cart__item-media">
                            <img
                                class="cart__item-image"
                                src="${item.image}"
                                alt="${item.alt}"
                                width="150"
                                height="150"
                            >
                        </div>
    
                        <div class="cart__item-details">
                            <h2 class="cart__item-title">Beige Cap</h2>
                            <p class="cart__item-desc">
                                Classic beige cap featuring The Falcons logo on the front.
                            </p>
    
                            <div class="cart__item-qty">
                                <button class="cart__item-qty-btn" aria-label="Decrease quantity">-</button>
                                <span class="cart__item-qty-value">${item.quantity}</span>
                                <button class="cart__item-qty-btn" aria-label="Increase quantity">+</button>
                            </div>
                        </div>
                    </div>
    
                    <div class="cart__item-side">
                        <button class="cart__item-remove-btn" aria-label="Remove item">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        <p class="cart__item-price">$${item.price}</p>
                    </div>
        `

        cartContent.appendChild(productItem)

        const removeBtn = productItem.querySelector(".cart__item-remove-btn")

        removeBtn.addEventListener("click", () => {
            removeFromCart(index) // update storage
            displayCart() // re-render UI
        })
    })
 
}

displayCart()