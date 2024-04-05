// Function to fetch products from a specific category
function fetchProducts(category) {
  return fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      });
}

// Fetch products for "men's clothing" category
fetchProducts("men's clothing")
  .then(data => {
      displayProducts(data);
      // Fetch products for "women's clothing" category
      return fetchProducts("women's clothing");
  })
  .then(data => {
      displayProducts(data);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
