import ProductDetails from './ProductDetails.mjs';
import ProductData from './ProductData.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';
console.log('productDetail.js cargado');

document.addEventListener('DOMContentLoaded', async () => {
  await loadHeaderFooter();

  const productId = getParam('id');
  const dataSource = new ProductData(); // aunque no se use aquí, se requiere por constructor

  const productPage = new ProductDetails(productId, dataSource);
  productPage.init();
});

