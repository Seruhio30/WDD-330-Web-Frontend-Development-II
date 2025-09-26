import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key; // clave para acceder al carrito en localStorage
    this.outputSelector = outputSelector; // selector del contenedor del resumen
    this.list = []; // lista de productos
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  // Se llama al cargar la página
  init() {
    this.list = getLocalStorage(this.key); // obtiene productos del carrito
    this.calculateItemSubTotal(); // calcula y muestra el subtotal
  }

  // Calcula el subtotal usando FinalPrice
  calculateItemSubTotal() {
   this.itemTotal = this.list.reduce((sum, item) => sum + (item.FinalPrice || 0), 0);

    const subtotalEl = document.querySelector(`${this.outputSelector} #subtotal`);
    if (subtotalEl) {
      subtotalEl.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  // Calcula impuestos, envío y total
  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;

    const itemCount = this.list.length; // cada item representa una unidad
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  // Muestra los totales en el resumen
  displayOrderTotals() {
    const summary = document.querySelector(this.outputSelector);
    if (!summary) return;

    const taxEl = summary.querySelector("#tax");
    const shippingEl = summary.querySelector("#shipping");
    const totalEl = summary.querySelector("#total");

    if (taxEl) taxEl.innerText = `$${this.tax.toFixed(2)}`;
    if (shippingEl) shippingEl.innerText = `$${this.shipping.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
}