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

function loadProducts(data) {

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
                    <button class="products__card-btn">Add to Cart</button>
                </div>
            </div>
        </article>
    `
    })

    productsGrid.innerHTML = productsCard.join("")

}

fetchProducts().then((data) => loadProducts(data))