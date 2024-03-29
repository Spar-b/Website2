// Fetch products from different categories
fetch("https://fakestoreapi.com/products/category/men's clothing")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    displayProducts(data); // Call function to display products
    return fetch("https://fakestoreapi.com/products/category/women's clothing");
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    displayProducts(data); // Call function to display products
    return fetch("https://fakestoreapi.com/products/category/jewelery");
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    displayProducts(data); // Call function to display products
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

// Function to display products
function displayProducts(products) {
    // Get reference to the products container
    const productsContainer = document.getElementById('productsContainer');
  
    // Loop through each product and create HTML elements
    products.forEach(product => {
        // Create a div element for each product
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
  
        // Create HTML content for the product
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price}</p>
            <p class="product-description">${product.description}</p>
        `;
  
        // Append the product div to the products container
        productsContainer.appendChild(productDiv);
    });
}
