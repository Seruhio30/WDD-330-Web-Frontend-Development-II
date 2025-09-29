import ExternalServices from './ExternalServices.mjs';
import { getParam, getLocalStorage, setLocalStorage, updateCartCount, loadHeaderFooter,alertMessage } from './utils.mjs';
import ProductDetails from './ProductDetails.mjs';


document.addEventListener("DOMContentLoaded", async () => {
  if (document.querySelector("#main-header") && document.querySelector("#main-footer")) {
    await loadHeaderFooter();
    updateCartCount();
  }

  const productId = getParam('product');
  const dataSource = new ExternalServices('tents');
  const productDetails = new ProductDetails(productId, dataSource);
  await productDetails.init();

  const addToCartBtn = document.querySelector('#addToCart');
  if (addToCartBtn) {
    addToCartBtn.replaceWith(addToCartBtn.cloneNode(true));
    const newBtn = document.querySelector('#addToCart');

    newBtn.addEventListener('click', async (e) => {
      try {
        const product = await dataSource.findProductById(e.target.dataset.id);
        let cartItems = getLocalStorage('so-cart');
        if (!Array.isArray(cartItems)) cartItems = [];

        cartItems.push(product);
        setLocalStorage('so-cart', cartItems);
        updateCartCount();

        // ✅ Mostrar mensaje solo después de agregar
        alertMessage("Producto agregado al carrito 🛒", false);
      } catch (err) {
        console.error("Error al agregar el producto:", err);
        alertMessage("No se pudo agregar el producto 😢");
      }


    });
  }
});
