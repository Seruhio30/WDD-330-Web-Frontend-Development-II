import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getLocalStorage } from './utils.mjs';
import { updateCartCount } from './utils.mjs';


const listElement = document.querySelector('.product-list');
const dataSource = new ProductData('tents');

const productList = new ProductList('tents', dataSource, listElement);
productList.init(); 



console.log('Cart:', getLocalStorage('so-cart'));
updateCartCount();

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});


