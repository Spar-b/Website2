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
            const description = productDiv.querySelector('.product-description');
            description.style.display = description.style.display === 'none' ? 'block' : 'none';
        });
    });
}
