

import ProductData from './ProductData.mjs';
import { getParam, getLocalStorage, setLocalStorage, updateCartCount } from './utils.mjs';
import ProductDetails from './ProductDetails.mjs';
import { loadHeaderFooter } from './utils.mjs';



document.addEventListener("DOMContentLoaded", async () => {
  if (document.querySelector("#main-header") && document.querySelector("#main-footer")) {
    await loadHeaderFooter(); // <-- aquí usas await
 
   
      updateCartCount();
    }

const productId = getParam('product');
const dataSource = new ProductData('tents');
const productDetails = new ProductDetails(productId, dataSource);
await productDetails.init();


const addToCartBtn = document.querySelector('#addToCart');
  if (addToCartBtn) {
    addToCartBtn.replaceWith(addToCartBtn.cloneNode(true));
    const newBtn = document.querySelector('#addToCart');
    newBtn.addEventListener('click', async (e) => {
      const product = await dataSource.findProductById(e.target.dataset.id);
      let cartItems = getLocalStorage('so-cart');
      if (!Array.isArray(cartItems)) cartItems = [];
      cartItems.push(product);
      setLocalStorage('so-cart', cartItems);
      updateCartCount();
    });
  }
});
