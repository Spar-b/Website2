
let cart;

function displayProducts(products) {
    const productsContainer = document.getElementById('productsContainer');
  
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
  
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price}</p>
            <p class="product-description" style="display: none;">${product.description}</p>
        `;
  
        productsContainer.appendChild(productDiv);

        productDiv.addEventListener('click', () => {
            // Create a form element
            const form = document.createElement('form');
            form.classList.add('overlay-form');

            // Create a close button
            const closeButton = document.createElement('button');
            closeButton.classList.add("overlay-button")
            closeButton.textContent = 'Close';
            closeButton.addEventListener('click', () => {
                form.remove(); // Remove the form when the close button is clicked
            });

            const title = document.createElement('h2');
            title.classList.add("title")
            title.textContent = product.title

            const horizontalContainer = document.createElement('article');
            horizontalContainer.classList.add('container-horizontal');
            horizontalContainer.innerHTML= `
                <img src="${product.image}" alt="${product.title}" class="image">
                <section class='container-vertical'>
                    <h3 class='price'>${product.price}$</h3>
                    <p class='desc'>${product.description}</p>
                    <label for="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" value="1" min="1" max="10">
                    <button class='cart-button'>Add to cart</button>
                </section>
            `;

            const addToCartBtn = horizontalContainer.querySelector('.cart-button');
            addToCartBtn.addEventListener('click', (event) => {
                event.preventDefault();
                const quantity = parseInt(horizontalContainer.querySelector('#quantity').value);
                addToCart(product, quantity);
            });

            // Append the close button and text to the form
            form.appendChild(closeButton);
            form.appendChild(title);
            form.appendChild(horizontalContainer);

            // Append the form to the body
            document.body.appendChild(form);
        });
    });
}

