import { getCartItems, removeFromCart, saveCart } from "./cartStorage.js";
const cartContent = document.querySelector(".cart__content");
const subtotalElement = document.querySelector(".cart__summary-subtotal");
const shippingElement = document.querySelector(".cart__summary-shipping");
const discountElement = document.querySelector(".cart__summary-discount");
const taxElement = document.querySelector(".cart__summary-tax");
const totalElement = document.querySelector(".cart__summary-total-value");

function displayCart() {
    const cartItems = getCartItems()

     if(!cartItems.length) {
        cartContent.innerHTML = `
            <div class="cart__empty">
                <h2 class="cart__empty-header">
                    Your Cart is Empty.
                </h2>
            </div>
        `
        updateCartSummary([])
        return;
    }

    cartContent.innerHTML = "";

    cartItems.forEach((item, index) => {

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
                                ${item.description}
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

        // Append cart products to UI 
        cartContent.appendChild(productItem)

        // Remove Item from cart
        const removeBtn = productItem.querySelector(".cart__item-remove-btn");

         removeBtn.addEventListener("click", () => {
            removeFromCart(index) // update storage
            displayCart() // re-render UI
        })
        
        // Update Item Quantity
        const qtyBtn = productItem.querySelectorAll(".cart__item-qty-btn");

        qtyBtn.forEach((btn) => {
            btn.addEventListener("click", (e) => {
            updateQuantity(e.currentTarget, index)
            // saveCart(cartItems);
            console.log(cartItems)
        })  
        })

    })

    updateCartSummary(cartItems)
 
}

// Update Cart Summary
function updateCartSummary(cartItems) {
    let subtotal = 0;
    let shipping = cartItems.length > 0 ? 6.99 : 0;
    let discount = 0;
    let taxRate = 0.04

    // Calculate total price * quantity
    cartItems.forEach((item) => subtotal += item.price * item.quantity)

    // Calculate taxrate * subtotal
    const taxAmount = taxRate * subtotal
    // Calculate total price
    const total = subtotal + shipping + discount + taxAmount

    // Render Cart summary
    subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
    shippingElement.innerText = `$${shipping.toFixed(2)}`;
    discountElement.innerText = `$${discount.toFixed(2)}`;
    taxElement.innerText = `$${taxAmount.toFixed(2)}`;
    totalElement.innerText = `$${total.toFixed(2)}`;
}

// Update Items Quantity
function updateQuantity(btn, index) {
    // Get current cart
    const cart = getCartItems()

    // Get the item we want to update
    const item = cart[index];
    if(!item) return;

    // Current quantity
    let quantity = item.quantity || 1

    const action = btn.getAttribute("aria-label");

    if(action === "Increase quantity") {
        quantity = quantity + 1
    }

    if(action === "Decrease quantity") {
        quantity = quantity === 1 ? 1 : quantity - 1
    }

    // Write new quantity back to item
    item.quantity = quantity
   
    // Save updated cart
    saveCart(cart)

    // Re-render cart UI and summary
    displayCart()
}

displayCart()