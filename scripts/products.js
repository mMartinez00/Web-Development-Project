const productsGrid = document.querySelector(".products__grid")

async function fetchProducts() {
    try {
        const response = await fetch("../data/products.json");
        
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

function setFilters(data) {
    // const categories = 
    // console.log(data)
}

function loadProducts(data) {
    const filters = document.querySelectorAll

   const productsCard = data.map((product) => {
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
                            <label for="sizes" class="products__card-sizes-label">Sizes:</label>

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

    // setFilters(data)
    

    productsGrid.innerHTML = productsCard.join("")

}

fetchProducts().then((data) => loadProducts(data))
