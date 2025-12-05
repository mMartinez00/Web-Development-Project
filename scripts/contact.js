const sendBtn = document.querySelector(".contact__button")
const modalContainer = document.querySelector(".modal__container")
const modalOverlay = document.querySelector(".modal__overlay")
let timeoutID;

function displayModal() {
    if(!modalContainer || !modalOverlay) return;

    modalContainer.classList.remove("modal__container--hidden");

    timeoutID = setTimeout(() => {
      modalContainer.classList.add("modal__container--hidden");
    }, 2000);

}

// Dismiss overlay early
modalOverlay.addEventListener("click", () => {
    
    modalContainer.classList.add("modal__container--hidden")
    clearTimeout(timeoutID);
})

sendBtn.addEventListener("click", displayModal)