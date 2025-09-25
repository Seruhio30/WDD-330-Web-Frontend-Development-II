import { renderListWithTemplate } from "./utils.mjs";

//<a href="/product_pages/product_detail.html" class="product-link" data-id="${product.Id}">
// <a href="/product_pages/product_detail.html?id=${product.Id}">
function productCardTemplate(product) {
  return `
    <li class="product-card">
     
      <a href="/product_pages/product_detail.html?id=${product.Id}" class="product-link" data-id="${product.Id}">


        <img src="${product.Images?.PrimaryMedium || '/images/placeholder.png'}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    
  `;
}



export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;

  }
  async init() {
    const list = await this.dataSource.getData(this.category); // ✅ pasamos categoría
    this.renderList(list);
  }
renderList(list) {
  renderListWithTemplate(productCardTemplate, this.listElement, list);

  document.querySelectorAll('.product-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const productId = e.currentTarget.dataset.id;
      const product = list.find(p => p.Id === productId);

      if (product) {
        localStorage.setItem('selected-product', JSON.stringify(product));
        window.location.href = e.currentTarget.href;
      } else {
        console.error('Producto no encontrado en la lista');
      }
    });
  });
}


}