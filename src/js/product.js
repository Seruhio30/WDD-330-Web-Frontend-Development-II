import ProductData from './ProductData.mjs';
import { getParam } from './utils.mjs';
import ProductDetails from './productDetails.mjs';

const productId = getParam('product');
const dataSource = new ProductData('tents');

//solo para prueba
//dataSource.findProductById(productId).then(product => {
//console.log(product);
//});

const product = new ProductDetails(productId, dataSource);
product.init();