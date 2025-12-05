import { getCartItems, clearCart } from "./cartStorage.js";
import { updateCartBadge } from "./global.js";
const subtotalElement = document.querySelector(".checkout__summary-subtotal");
const shippingElement = document.querySelector(".checkout__summary-shipping");
const discountElement = document.querySelector(".checkout__summary-discount");
const taxElement = document.querySelector(".checkout__summary-tax");
const totalElement = document.querySelector(".checkout__summary-total-value");
const checkoutBtn = document.querySelector(".checkout__btn");
const modalContainer = document.querySelector(".modal__container");
const modalOverlay = document.querySelector(".modal__overlay");
const selectState = document.querySelector(".checkout__select--state")
let timeoutID;

function displayCartSummary() {
    const cartItems = getCartItems()

    let subtotal = 0;
    let shipping = cartItems.length > 0 ? 6.99 : 0;
    let discount = 0;
    let taxRate = 0.04

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

// Display Modal
function displayModal() {
    // Show modal
    modalContainer.classList.remove("modal__container--hidden");

    // Hide modal after 1.75s
    timeoutID = setTimeout(() => {
      modalContainer.classList.add("modal__container--hidden");
    }, 2000);

}

// Fetch States json data
async function fetchStates() {
    try {
        const response = await fetch("data/state.json")

        if(!response.ok) return;

        const data = await response.json()

        return data;
    } catch (error) {
        console.log("error fetching data:", error)
    }
}

// Render to UI
function renderStates(data) {
    if(!data) return;

    const states = data.map((state) => {
        return `
            <option value="${state.code}">${state.name}</option>
        `
    })

    if(!selectState) return;

    selectState.innerHTML = states.join("")
}

fetchStates().then((data) => renderStates(data))

checkoutBtn.addEventListener("click", () => {
    clearCart()
    displayCartSummary()
    updateCartBadge()
    displayModal()
})

displayCartSummary()