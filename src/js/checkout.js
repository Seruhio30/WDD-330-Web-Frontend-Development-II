import { updateCartCount, loadHeaderFooter, getLocalStorage } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';


document.addEventListener("DOMContentLoaded", () => {
  // Carga header y footer si existen
  loadHeaderFooter();

  // Actualiza el contador del carrito
  updateCartCount();

  // Inicializa el proceso de checkout con los datos del carrito
  const checkout = new CheckoutProcess("so-cart", "#orderSummary");
  checkout.init(); // Calcula y muestra el subtotal al cargar

  // Calcula impuestos, envío y total cuando el usuario termina de llenar el ZIP
  const zipInput = document.getElementById("zip");
  if (zipInput) {
    zipInput.addEventListener("blur", () => {
      checkout.calculateOrderTotal();
    });
  }

  // Validación del formulario al hacer submit
  const form = document.getElementById("checkoutForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Evita recarga por defecto

      const inputs = this.querySelectorAll("input");
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      });

      if (!valid) {
        alert("Por favor completa todos los campos.");
        return;
      }

      // Si todo está válido, puedes continuar con lógica adicional (ej. envío a servidor)
      checkout.calculateOrderTotal(); // Asegura que los totales estén actualizados
      alert("Formulario válido. ¡Listo para procesar el pedido!");
    });
  }
});