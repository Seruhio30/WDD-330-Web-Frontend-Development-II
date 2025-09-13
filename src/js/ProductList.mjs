import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?product=${product.id}">
        <img src="${product.image}" alt="Image of ${product.name}">
        <h2 class="card__brand">${product.brand}</h2>
        <h3 class="card__name">${product.name}</h3>
        <p class="product-card__price">$${product.price}</p>
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
        const list = await this.dataSource.getData();
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

}