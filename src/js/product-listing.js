import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';
import { isDiscounted } from './utils.mjs';


loadHeaderFooter();

const category = getParam('category'); // ← esto permite que la categoría sea dinámica
const dataSource = new ExternalServices(category);
const listElement = document.querySelector('.product-list');
const productList = new ProductList(category, dataSource, listElement);
productList.init();
// Antes se usaba: `Top Products: ${category}` dentro del span, lo que duplicaba el encabezado.
document.querySelector('.title').textContent = category;





