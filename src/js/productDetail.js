import ProductDetails from './ProductDetails.mjs';
import ExternalServices from './ExternalServices.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';
import { alertMessage } from '../js/utils.mjs';

console.log('productDetail.js cargado');

document.addEventListener('DOMContentLoaded', async () => {
  await loadHeaderFooter();

  const productId = getParam('id');
  const dataSource = new ExternalServices(); // aunque no se use aquí, se requiere por constructor

  const productPage = new ProductDetails(productId, dataSource);
  productPage.init();
});

