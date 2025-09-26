import { getLocalStorage } from './utils.mjs';
import { updateCartCount } from './utils.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", async () => {
  if (document.querySelector("#main-header") && document.querySelector("#main-footer")) {
    await loadHeaderFooter();
  }
  updateCartCount();

  console.log('Cart:', getLocalStorage('so-cart'));
});