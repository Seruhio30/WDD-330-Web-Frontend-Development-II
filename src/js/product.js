

import ProductData from './ProductData.mjs';
import { getParam, getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductDetails from './ProductDetails.mjs';

import { loadHeaderFooter } from './utils.mjs';
loadHeaderFooter();

const productId = getParam('product');
const dataSource = new ProductData('tents');

//solo para prueba
//dataSource.findProductById(productId).then(product => {
//console.log(product);
//});

function addProductToCart(product) {


  let cartItems = getLocalStorage('so-cart');

  // me seguro de que sea un array
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  cartItems.push(product);
  setLocalStorage('so-cart', cartItems);

}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();
