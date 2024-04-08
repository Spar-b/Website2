// Function to fetch products from a specific category
function fetchProducts(category, sort) {
  return fetch(`https://fakestoreapi.com/products/category/${category}?sort=${sort}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      });
}
function updateProductsDisplay(sort)
{
    fetchProducts("men's clothing", sort)
  .then(data => {
      displayProducts(data);
      return fetchProducts("women's clothing", sort);
  })
  .then(data => {
      displayProducts(data);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

updateProductsDisplay("asc");
