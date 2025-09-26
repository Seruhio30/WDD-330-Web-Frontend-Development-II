import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getLocalStorage,updateCartCount, loadHeaderFooter} from './utils.mjs';

document.addEventListener("DOMContentLoaded", async () => {
  if (document.querySelector("#main-header") && document.querySelector("#main-footer")) {
    await loadHeaderFooter();
  }
  updateCartCount();

const listElement = document.querySelector('.product-list');
const dataSource = new ProductData('tents');

const productList = new ProductList('tents', dataSource, listElement);
productList.init(); 



console.log('Cart:', getLocalStorage('so-cart'));

});


