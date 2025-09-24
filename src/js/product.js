import ProductData from './ProductData.mjs';
import { getParam, getLocalStorage, setLocalStorage,updateCartCount,loadHeaderFooter } from './utils.mjs';
import ProductDetails from './ProductDetails.mjs';



document.addEventListener("DOMContentLoaded", async () => {
  if (document.querySelector("#main-header") && document.querySelector("#main-footer")) {
    await loadHeaderFooter(); // <-- aquí usas await
  }
  updateCartCount();



const productId = getParam('product');

const dataSource = new ProductData();


//solo para prueba
//dataSource.findProductById(productId).then(product => {
//console.log(product);
//});

function addProductToCart(product) {
  const cartItems = getLocalStorage('so-cart') || [];
  cartItems.push(product);

  setLocalStorage('so-cart', cartItems);
  updateCartCount();
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id); // <-- agrega await
  addProductToCart(product);// <-- aquí usas await
}
const productDetails = new ProductDetails(productId, dataSource);
await productDetails.init(); // <-- aquí usas await

  // agregue esto 
  // Conecta el botón "Add to Cart" después de inicializar los detalles Con esto, el contador del carrito se actualizará inmediatamente al hacer clic en "Add to Cart".

const addToCartBtn = document.querySelector('#addToCart');
if (addToCartBtn) {
  addToCartBtn.addEventListener('click', addToCartHandler);
}
});