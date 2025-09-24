import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;

    // cambia aquí la propiedad de la imagen según el paso 2
  const imgSrc = product.PrimaryMedium || (product.Images?.[0]?.PrimaryMedium) || '/images/placeholder.png';

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">

       <img src="${imgSrc}" alt="Image of ${product.Name}">
 
       <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">
          $${product.FinalPrice}
          ${isDiscounted ? `<span class="discount-flag">¡Descuento!</span>` : ''}
        </p>
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
    renderListWithTemplate(productCardTemplate, this.listElement, list, 'beforeend', true);

  }

}