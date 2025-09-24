import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam, updateCartCount } from './utils.mjs';

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  updateCartCount(); // ✅ Mantenemos esto para que muestre el número del carrito

  // ✅ Obtener categoría de la URL
  const category = getParam('category') || 'tents';
  document.getElementById('category-title').textContent = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  // ✅ Crear DataSource y elemento donde renderizar
  const dataSource = new ProductData();
  const listElement = document.querySelector('.product-list');

  // ✅ Crear ProductList con categoría
  const myList = new ProductList(category, dataSource, listElement);

  // ✅ Inicializar la lista
  await myList.init();

  // ✅ Cambiar título dinámicamente
  document.querySelector('#category-title').textContent = `Top Products: ${category}`;
});
