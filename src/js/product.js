

import { getLocalStorage, setLocalStorage } from './utils.mjs';

import ProductData from './ProductData.mjs';
import { getParam } from './utils.mjs';
import ProductDetails from './ProductDetails.mjs';

const productId = getParam('product');
const dataSource = new ProductData('tents');


//solo para prueba
//dataSource.findProductById(productId).then(product => {
//console.log(product);
//});

function addProductToCart(product) {
  const cartItems = getLocalStorage('so-cart') || [];
  cartItems.push(product);
  setLocalStorage('so-cart', product);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}


const product = new ProductDetails(productId, dataSource);
product.init();