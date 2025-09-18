import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const listElement = document.querySelector('.product-list'); // o el ID que estés usando
const dataSource = new ProductData('tents'); // ya lo tienes

const productList = new ProductList('tents', dataSource, listElement);
productList.init(); // si estás usando un método init() para cargar los datos
