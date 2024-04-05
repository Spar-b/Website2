function loadCart() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : {}; // Parse stored JSON data or return an empty object
}

// Function to save cart data to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart)); // Convert cart object to JSON and store it
}

// Load cart data when the page loads
let cart;

document.addEventListener('DOMContentLoaded', () => {
    cart = loadCart();
    updateCartDisplay();
});

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

function addToCart(product, quantity) {
    if (!cart) { // Check if cart is initialized
        cart = {}; // Initialize cart if it's not already initialized
    }
    if (cart[product.id]) {
        cart[product.id].quantity += quantity;
    } else {
        cart[product.id] = {
            product: product,
            quantity: quantity
        };
    }
    saveCart(cart); // Save updated cart data to localStorage
    updateCartDisplay();
}
function removeFromCart(productId) {
    if (cart && cart[productId]) {
        delete cart[productId]; // Remove the product entry from the cart
        saveCart(cart); // Save the updated cart data to localStorage
        updateCartDisplay(); // Update the cart display
    }
}
// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = '';
    for (const productId in cart) {
        const cartItem = cart[productId];
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <img src="${cartItem.product.image}" alt="${cartItem.product.title}" class="cart-item-image">
            <div class="cart-details-container">
                <h3 class="cart-item-title">${cartItem.product.title}</h3>
                <p class="cart-item-price">$${cartItem.product.price}</p>
                <p class="cart-item-quantity">Quantity: ${cartItem.quantity}</p>
            </div>
            <button class="cart-remove-product-button">Remove</button>
        `;
        const removeFromCartBtn = cartItemDiv.querySelector('.cart-remove-product-button');
            removeFromCartBtn.addEventListener('click', (event) => {
                event.preventDefault();
                removeFromCart(product.id) // TODO: Fix product being non-defined
                updateCartDisplay()
            });

        cartContainer.appendChild(cartItemDiv);
    }
}