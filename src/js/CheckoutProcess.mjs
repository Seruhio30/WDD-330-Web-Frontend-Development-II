import { getLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
    this.calculateOrderTotal();

    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", (e) => this.checkout(e));
    }
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((sum, item) => sum + (item.FinalPrice || 0), 0);

    const subtotalEl = document.querySelector(`${this.outputSelector} #subtotal`);
    if (subtotalEl) {
      subtotalEl.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    this.tax = +(this.itemTotal * 0.06).toFixed(2);
    const itemCount = this.list.length;
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
    this.orderTotal = +(this.itemTotal + this.tax + this.shipping).toFixed(2);

    this.displayOrderTotals();
  }

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

  packageItems(items) {
    return items.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity || 1
    }));
  }

  async checkout(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const order = Object.fromEntries(formData.entries());

    // Corrige el formato de la fecha de expiración
    const [year, month] = order.expDate.split("-");


    const payload = {
      orderDate: new Date().toISOString(),
      fname: order.firstName,
      lname: order.lastName,
      street: order.street,
      city: order.city,
      state: order.state,
      zip: order.zip,
      cardNumber: order.cardNumber.trim().padStart(16, "0"),
      expiration: `${month}/${year}`, // ← corregido
      code: order.securityCode.trim().slice(0, 3),
      items: this.packageItems(this.list),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2)
    };

    console.log("Payload enviado:", payload);

    try {
      const response = await this.services.checkout(payload);
      console.log("Pedido enviado con éxito:", response);

      localStorage.removeItem(this.key); // limpia el carrito

      window.location.href = 'success.html'; // redirige al usuario
    } catch (err) {
      console.error("Error al enviar el pedido:", err);

      if (err.name === 'servicesError') {
        const serverMessage = err.message?.detail || "Hubo un error con tu pedido.";
        alert(`Error del servidor: ${serverMessage}`);
      } else {
        alert("Hubo un problema inesperado al enviar el pedido.");
      }
    }
  }
}
