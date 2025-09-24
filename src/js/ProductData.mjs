function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
  this.path = `/json/${this.category}.json`;

  }
  getData() {
  return fetch(this.path)
    .then(convertToJson)
    .then((data) => {
      console.log("Fetched data:", data); // ← agrega esto
      return data;
    });
}

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.id === id);
  }
}
