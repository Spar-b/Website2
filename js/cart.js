document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cartContainer');
    if (cartContainer) {
        cartContainer.innerHTML = ''; // Clear the contents only if cartContainer is not null or undefined
        cart = loadCart();
        updateCartDisplay();
    } else {
        console.error('cartContainer not found in the DOM.');
    }
});
function loadCart() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : {}; // Parse stored JSON data or return an empty object
}

// Function to save cart data to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart)); // Convert cart object to JSON and store it
}
function addToCart(product, quantity) {
    cart = loadCart();
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
    if(!cartContainer)
    {
        return;
    }
    cartContainer.innerHTML = '';
    for (const productId in cart) {
        const cartItem = cart[productId];
        const cartItemDiv = document.createElement('div');
        cartItemDiv.dataset.productId = productId;
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
                const productId = cartItemDiv.dataset.productId;
                removeFromCart(productId)
                updateCartDisplay()
            });

        cartContainer.appendChild(cartItemDiv);
    }
}