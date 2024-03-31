fetch("https://fakestoreapi.com/products/category/men's clothing")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    displayProducts(data);
    return fetch("https://fakestoreapi.com/products/category/women's clothing");
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    displayProducts(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });