function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const toggleBtn = document.querySelector('.toggle-btn');
  
    if (sidebar.style.left === '-250px') {
      sidebar.style.left = '0';
      content.style.marginLeft = '250px';
      toggleBtn.textContent = '✖';
    } else {
      sidebar.style.left = '-250px';
      content.style.marginLeft = '0';
      toggleBtn.textContent = '☰';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const sortRadios = document.querySelectorAll('.sort input[type="radio"]');
    sortRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            handleSortChange(radio.value);
        });
    });
});

function handleSortChange(sortingValue) {
    console.log(sortingValue);
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML="";
    updateProductsDisplay(sortingValue);
}
