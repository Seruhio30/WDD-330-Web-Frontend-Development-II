import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";

const productId = getParam('id');
console.log('Product ID:', productId);

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {

    try {
      const storedProduct = localStorage.getItem('selected-product');
      if (!storedProduct) throw new Error('No hay producto guardado');

      this.product = JSON.parse(storedProduct);
      this.renderProductDetails();

      document
        .getElementById('addToCart')
        .addEventListener('click', this.addProductToCart.bind(this));

      localStorage.removeItem('selected-product');
    } catch (err) {
      console.error('Error al cargar el producto:', err);
      document.querySelector('main').innerHTML = `
      <p class="error-message">Producto no disponible. Intenta desde el listado.</p>
    `;
    }
  }


  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Images?.PrimaryLarge || product.Images?.PrimaryMedium || '/images/placeholder.png';

  productImage.alt = product.NameWithoutBrand || product.Name;

  document.getElementById('productPrice').textContent = `$${product.FinalPrice?.toFixed(2) || 'N/A'}`;
  document.getElementById('productColor').textContent = product.Colors?.[0]?.ColorName || 'Color no disponible';
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple || 'Sin descripción disponible';

  document.getElementById('addToCart').dataset.id = product.Id;
}

