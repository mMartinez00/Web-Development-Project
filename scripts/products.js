import { addToCart } from "./cartStorage.js"
const productsGrid = document.querySelector(".products__grid")
let allProducts;

// Fetch Data
async function fetchProducts() {
    try {
        const response = await fetch("data/products.json");
        
        if(!response.ok) {
            alert("Error fetching data!")
            return;
        }

        const data = await response.json()
        
        return data;
        
    } catch (error) {
        console.log(error)
    }

}

// Listen for filter change
function setFilters() {
    const filter = document.getElementById("category-filter")
    const price = document.getElementById("price")

    filter.addEventListener("change", applyFilters)
    price.addEventListener("change", applyFilters)
}

// Apply filters
function applyFilters() {
    let result = [...allProducts];
    const categoryValue = document.getElementById("category-filter").value
    const priceValue = document.getElementById("price").value

    if(categoryValue !== "all") {
        result = result.filter(product => product.category === categoryValue)
    }

    if(priceValue === "low-to-high") {
        result.sort((a, b) => a.price - b.price);
    }

    if(priceValue === "high-to-low") {
        result.sort((a, b) => b.price - a.price)
    }

    loadProducts(result)
}

// Load products
function loadProducts(allProducts) {

   const productsCard = allProducts.map((product) => {
        return `
        <article class="products__card" id=${product.id}>
             <div class="products__card-image-container">
                    <img src="${product.image}" class="products__card-image" alt="product">
            </div>
            <div class="products__card-info">
                <h2 class="products__card-name">${product.name}</h2>
                <p class="products__card-description">${product.description}</p>
                <div class="products__card-footer">
                    <p class="products__card-price">${product.price}</p>
                    ${["hoodie", "tshirt"].includes(product.category) ? `
                        <div class="products__card-sizes-group">
                            <label for="sizes" class="products__card-sizes-label">Size:</label>

                            <select 
                                name="sizes" 
                                id="sizes" 
                                class="products__card-sizes-select"
                            >
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="xl">XL</option>
                            </select>
                        </div>
` : ""}
                    <button class="products__card-btn">Add to Cart</button>
                </div>
            </div>
        </article>
    `
    })

    productsGrid.innerHTML = productsCard.join("")

    const addToCartBtns = document.getElementsByClassName("products__card-btn")
    
    for(let i = 0; i < addToCartBtns.length; i++) {
        addToCartBtns[i].addEventListener("click", () => {
            const card = addToCartBtns[i].closest(".products__card")
            const productID = addToCartBtns[i].closest(".products__card").id
            const sizeSelectElement = card.querySelector(".products__card-sizes-select");
            const selectedSize = sizeSelectElement ? sizeSelectElement.value : null;

            
            addToCart(productID, selectedSize)

        })
    }

}

fetchProducts().then((data) => {
    allProducts = data;
    loadProducts(allProducts)
    setFilters()
})